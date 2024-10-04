import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

  
type Props = {
    label: string;
    href: string;
    isActive?: boolean;
}

export const NavButton = ({
    label,
    href,
    isActive
}: Props) => {
  return (
    <Button asChild className={cn(
        "w-full lg:w-auto justify-between font-normal hover:bg-gray-300 hover:text-white/100 border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none focus:bg-gray-400 focus:text-white/100 transition", isActive ? "bg-gray-300 text-white/100" : "bg-trasparent",
        )} size="sm" variant="outline">
        <Link href={href}>
            {label}
        </Link>
    </Button>
  )
}