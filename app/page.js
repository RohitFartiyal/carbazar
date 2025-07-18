export const dynamic = 'force-dynamic';

import HomeSearch from "@/components/home-search";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Car, ChevronRight, Shield } from "lucide-react";
import { bodyTypes, carMakes, faqItems, featuredCars } from "@/lib/data";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SignedOut } from "@clerk/nextjs";
import { getFeaturedCars } from "@/actions/home";
import ImgSlider from "@/components/slider";
import { CarCard } from "@/components/car-card";

export default async function Home() {
  const featuredCars = await getFeaturedCars()
  return (
    <>
      <style>
        {`

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s ease-out;
        }
        `}
      </style>

      <div className=" md:mx-15 sm:mx-10 mx-3 md:pt-40 pt-30">


        {/* Hero Content */}
        <section className=" text-center md:px-8 py-4 md:py-12 backdrop-blur-md bg-gray-100 rounded-xl border border-white/20 shadow-lg">
          <h1 className="text-3xl xl:text-7xl lg:text-6xl md:text-5xl md:mb-4  gradient-title animate-fadeIn drop-shadow-md">
          Tailored Deals. Trusted AI.
          </h1>
          <h1 className="text-3xl xl:text-7xl lg:text-6xl md:text-5xl mb-4 gradient-title animate-fadeIn drop-shadow-md">
            with CarBazar
          </h1>
          <p className="animate-fadeIn delay-200 text-md md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Intelligent car buying powered by AI. Simple, smart, seamless.
          </p>

          {/* search */}
          <HomeSearch />

        </section>

        <ImgSlider/>

        {/* <section class="hero">
        <div class="animated-bg"></div>
        <div class="container">
        <h1 className="text-5xl md:text-8xl mb-4 gradient-title animate-fadeIn drop-shadow-md">
            Find your Dream Car
          </h1>
          <h1 className="text-5xl md:text-8xl mb-4 gradient-title animate-fadeIn drop-shadow-md">
            with Vehiql AI
          </h1>
          <p className="animate-fadeIn delay-200 text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
            Advanced AI Car Search and test drive from thousands of vehicles.
          </p>
        </div>
    </section> */}

        {/* slidder section */}
        {/* <section className=" relative container mx-auto py-20 text-center">
          <div className="w-full h-screen flex items-center justify-center">
            <div className="w-full max-w-6xl">

              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
                className="rounded-2xl shadow-lg overflow-hidden"
              >
                <SwiperSlide>
                  <img src={'/slider/slider1.webp'} alt={`slider image`} className="w-full h-[600px] object-cover" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={'/slider/slider1.webp'} alt={`slider image`} className="w-full h-[600px] object-cover" />
                </SwiperSlide>


              </Swiper>
            </div>
          </div>

        </section> */}

          {/* Recommended cars */}
          <section>
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-5">
                <h2 className="sm:text-2xl text-xl font-bold">Recommended Cars</h2>
                <Button  variant="ghost" className="flex items-center" asChild>
                  <Link href='/cars'>
                  View All <ChevronRight/>
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCars.data.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
            </div>
          </section>

          {/* Our dealers */}
          <section className="py-12 bg-gray-100 mt-10">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-5">
                <h2 className="sm:text-2xl text-xl font-bold">Our Collection</h2>
                <Button  variant="ghost" className="flex items-center" asChild>
                  <Link href='/cars'>
                  View All <ChevronRight/>
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {carMakes.map((make) => (
               <Link
               key={make.name}
               href={`/cars?make=${make.name}`}
               className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition cursor-pointer"
             >
               <div className="h-16 w-auto mx-auto mb-2 relative">
                 <Image
                   src={
                     make.image || `/make/${make.name.toLowerCase()}.jpg`
                   }
                   alt={make.name}
                   fill
                   style={{ objectFit: "contain" }}
                 />
               </div>
               <h3 className="font-medium">{make.name}</h3>
             </Link>
            ))}
          </div>
            </div>
          </section>

           {/* Browse by Body Type */}
      <section className="py-12 bg-gray-100 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="sm:text-2xl text-xl font-bold">Browse by Body Type</h2>
            <Button variant="ghost" className="flex items-center" asChild>
              <Link href="/cars">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bodyTypes.map((type) => (
              <Link
                key={type.name}
                href={`/cars?bodyType=${type.name}`}
                className="relative group cursor-pointer"
              >
                <div className="overflow-hidden rounded-lg flex justify-end h-35 mb-4 relative">
                  <Image
                    src={
                      type.image
                    }
                    alt={type.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-end">
                  <h3 className="text-white text-xl font-bold pl-4 pb-2 ">
                    {type.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

          {/* Why Choose Us */}
      <section className="py-12 bg-gray-100 mt-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">
            Why Choose Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Thousands of verified vehicles from trusted dealerships and
                private sellers.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Test Drive</h3>
              <p className="text-gray-600">
                Book a test drive online in minutes, with flexible scheduling
                options.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Process</h3>
              <p className="text-gray-600">
                Verified listings and secure booking process for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

       {/* FAQ Section with Accordion */}
       <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 dotted-background text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="sm:text-3xl text-xxl font-bold sm:mb-4 mb-2">
            Ready to Find Your Dream Car?
          </h2>
          <p className="sm:text-xl text-sm text-black mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect
            vehicle through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" >
              <Link href="/cars">View All Cars</Link>
            </Button>
            <SignedOut
            >
              <Button size="lg" asChild>
                <Link href="/sign-up">Sign Up Now</Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </section>



      </div>
    </>
  )
}
