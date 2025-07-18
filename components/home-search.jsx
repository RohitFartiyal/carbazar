"use client"

import { useEffect, useState } from "react"
import { Input } from "./ui/input"
import { Camera, Search, Upload } from "lucide-react"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"
import { toast } from "sonner"
import useFetch from "@/hooks/use-fetch"
import { processImageSearch } from "@/actions/home"

const HomeSearch = () => {

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchImage, setSearchImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isImageSearchActive, setIsImageSearchActive] = useState(false);

  const {
    loading: isProcessing,
    fn: processImageFn,
    data: processResult,
    error:processError,
  } = useFetch(processImageSearch);



  const handleTextSearch = (e)=>{
    e.preventDefault();
    if(!searchTerm){
      toast.error("Please enter the search term");
      return;
    };
    router.push(`/cars?search=${encodeURIComponent(searchTerm)}`)
  }
  const handleImageSearch = async(e) => {
    e.preventDefault();
    if(!searchImage){
      toast.error("Please upload an image first");
      return;
    }

    await processImageFn(searchImage);
  };

  useEffect(()=>{
    if(processResult?.success){
      const params = new URLSearchParams();

      if(processResult.data.make) params.set("make", processResult.data.make);
      if(processResult.data.bodyType) params.set("bodyType", processResult.data.bodyType);
      if(processResult.data.color) params.set("color", processResult.data.color);

      router.push(`/cars?${params.toString()}`)

    }
  },[processResult])

  useEffect(()=>{
    if(processError){
      toast.error("Failed to analyze image: " + (processError.message || "Unknown error"))
    }
  },[processError])

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if(file) {
      if(file.size > 5 * 1024 * 1024){
        toast.error("Image size must be less than 5MB");
        return;
      }

      setIsUploading(true);
      setSearchImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsUploading(false);
        toast.success("Image uploaded successfully")
      };

      reader.onerror = () => {
        setIsUploading(false);
        toast.error("Failed to read the image")
      };

      reader.readAsDataURL(file)
    }
  }


  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png"],
      },
      maxFiles: 1,
    });

  
  return (
    <div className="mx-5">
      <form onSubmit={handleTextSearch}>
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Enter name, or use our AI Image Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="xs psm sm:text-sm pl-10 pr-12 py-6 w-full rounded-full border-gray-300 bg-white/95 backdrop-blur-sm"
          />

          {/* Image Search Button */}

          <Search className="absolute left-3 w-5 h-5 bg-black-100 text-black" />
          
          <div className="absolute right-[100px]">
            <Camera
              size={35}
              onClick={() => setIsImageSearchActive(!isImageSearchActive)}
              className="cursor-pointer rounded-xl p-1.5"
              style={{
                background: isImageSearchActive ? "black" : "",
                color: isImageSearchActive ? "white" : "",
              }}
            />
          </div>

          <Button type="submit" className="absolute right-2 rounded-full">
            Search
          </Button>
        </div>
      </form>

      {isImageSearchActive && (
        <div className="mt-4">
          <form onSubmit={handleImageSearch} className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-6 text-center">
              {imagePreview ? (
                <div className="flex flex-col items-center">
                  <img
                    src={imagePreview}
                    alt="Car preview"
                    className="h-40 object-contain mb-4"
                  />
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchImage(null);
                      setImagePreview("");
                      toast.info("Image removed");
                    }}
                  >
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div {...getRootProps()} className="cursor-pointer">
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center">
                    <Upload className="h-12 w-12 text-gray-400 mb-2" />
                    <p className="text-gray-500 mb-2">
                      {isDragActive && !isDragReject
                        ? "Leave the file here to upload"
                        : "Drag & drop a car image or click to select"}
                    </p>
                    {isDragReject && (
                      <p className="text-red-500 mb-2">Invalid image type</p>
                    )}
                    <p className="text-gray-400 text-sm">
                      Supports: JPG, PNG (max 5MB)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {imagePreview && (
              <Button
                type="submit"
                className="w-full"
                disabled={isUploading || isProcessing}
              >
                {isUploading
                  ? "Uploading..."
                  : isProcessing
                  ? "Analyzing image..."
                  : "Search with this Image"}
              </Button>
            )}
          </form>
        </div>
      )}

    </div>
  )
}
export default HomeSearch