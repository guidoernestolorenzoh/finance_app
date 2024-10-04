import Image from "next/image"
import Link from "next/link"

export const HeaderLogo = () => {
  return (
    <Link href="/">
        <div className="items-center hidden lg:flex">
            <Image src="/finance_app.svg" height={28} width={28} alt="logo"/>
            <p className="font-semibold text-lg ml-2.5">
                Finance App
            </p>
        </div>
    </Link>
  )
}
