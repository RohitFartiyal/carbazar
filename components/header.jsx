import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "./ui/button"
import { ArrowLeft, CarFront, Heart, Layout } from "lucide-react"
import { checkUser } from "@/lib/checkUser"
import Image from "next/image"

export default async function header({isAdminPage=false}) {

  const user = await checkUser()
  const isAdmin = user?.role === "ADMIN";
  return (
    <header className={`fixed top-0 w-full ${isAdminPage?`bg-white`:`bg-white/10`} backdrop-blur-md z-50 border-b`}>
       <nav className=" mx-auto px-4 py-4 flex items-center justify-between">
        <Link href='/'>
        <Image
            src={"/logo.png"}
            alt="Vehiql Logo"
            width={200}
            height={80}
            className="md:h-12 sm:h-10 h-9 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center space-x-4">
          {isAdminPage ? (
            <>
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft size={18} />
                  <span>Back to App</span>
                </Button>
              </Link>
            </>
          ) : (
            <SignedIn>
              {!isAdmin && (
                <Link
                  href="/reservations"
                  className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                >
                  <Button variant="outline">
                    <CarFront size={18} />
                    <span className="hidden md:inline">My Reservations</span>
                  </Button>
                </Link>
              )}
              <a href="/saved-cars">
                <Button className="flex items-center gap-2">
                  <Heart size={18} />
                  <span className="hidden md:inline">Saved Cars</span>
                </Button>
              </a>
              {isAdmin && (
                <Link href="/admin">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Layout size={18} />
                    <span className="hidden md:inline">Admin Portal</span>
                  </Button>
                </Link>
              )}
            </SignedIn>
          )}

          <SignedOut>
            {!isAdminPage && (
              <SignInButton forceRedirectUrl="/">
                <Button variant="outline">Login</Button>
              </SignInButton>
            )}
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
       </nav>
    </header>
  )
}
