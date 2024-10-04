import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="justify-center h-full flex-col items-center px-4 lg:flex">
        <div className="text-center space-y-4 pt-16">
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome 👋</h1>
          <p className="text-base text-[#7E8CA0]">
            Log in or Create an account to go the dashboard.
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 size={32} className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full object-cover max-w-[80%] justify-center hidden lg:flex items-center">
        <Image src="/finance_app.svg" height={600} width={600} alt="logo"/>
      </div>
    </div>
  )
}