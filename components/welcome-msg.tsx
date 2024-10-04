"use client";

import { useUser } from "@clerk/nextjs";

export const WelcomeMsg = () => {
    const {user, isLoaded} = useUser();

    return (
        <div className="space-y-2 mb-4">
            <h1 className="text-2xl font-bold lg:text-4xl">Welcome { isLoaded && user?.firstName ? `${user?.firstName}` : ""}</h1>
            <p className="text-sm text-gray-400 lg:text-base">This is you Financial App</p>
        </div>
  )
}
