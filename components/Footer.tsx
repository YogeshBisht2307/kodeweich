import Link from "next/link";
import { FooterProps } from "@/interfaces";

const Footer: React.FC<FooterProps> = () => {
    return (
        <footer className={`max-w-4xl mx-auto px-4 mt-12 py-4 border-t border-gray-600`}>
            <div className={"pb-4 pt-2 text-xl font-bold"}>Kodweich</div>
            <div className={`flex flex-col sm:flex-row items-center justify-between`}>
                <div className="flex flex-col self-start w-full">
                    <Link href="/about" className={`max-w-xl text-sm md:text-base text-muted-foreground hover:text-foreground transition py-1`}>About</Link>
                    <Link href="/connect" className={`max-w-xl text-sm md:text-base text-muted-foreground hover:text-foreground transition py-1`}>Connect</Link>
                    <Link href="/blogs" className={`max-w-xl text-sm md:text-base text-muted-foreground hover:text-foreground transition py-1`}>Blog</Link>
                </div>
                <div className="flex flex-col self-start w-full">
                    <Link href="https://www.linkedin.com/in/yogesh-bisht-83167a201/" target={"_blank"} className={`max-w-xl text-sm md:text-base text-muted-foreground hover:text-foreground transition py-1`}>Linkedin</Link>
                    <Link href="https://github.com/YogeshBisht2307" target={"_blank"} className={`max-w-xl text-sm md:text-base text-muted-foreground hover:text-foreground transition py-1`}>Github</Link>
                    <Link href="https://www.instagram.com/yogesh.bisht.99/" target={"_blank"} className={`max-w-xl text-sm md:text-base text-muted-foreground hover:text-foreground transition py-1`}>Instagram</Link>
                </div>
                <div className="flex flex-col self-start w-full">
                    <Link href={`/privacy-policy`} target={"_blank"} className={`max-w-xl text-sm md:text-base lg:text-base text-muted-foreground hover:text-foreground transition py-1`}>Privacy Policy</Link>
                    <Link href={`/admin/sign-in`} target={"_blank"} className={`max-w-xl text-sm md:text-base lg:text-base text-muted-foreground hover:text-foreground transition md:flex hidden py-1`}>Manage Blog</Link>
                </div>
            </div>
            <div className={"pt-16 pb-2 text-sm text-muted-foreground font-semibold"}>Copyright © 2023 Kodeweich</div>
        </footer>
    )
}

export default Footer

