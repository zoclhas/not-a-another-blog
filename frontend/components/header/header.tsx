import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Sun, MoonStar } from "lucide-react";
import { Hamburger } from "./hamburger";

const Profile = dynamic(() => import("./profile"), {
    ssr: false,
});

export const Header = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    const links = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Explore",
            href: "/explore",
        },
        {
            label: "Random",
            href: "/random",
        },
    ];

    // Navbar hide on scroll
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const controlNavbar = () => {
        if (window.scrollY > lastScrollY) {
            setIsNavbarVisible(true);
        } else {
            setIsNavbarVisible(false);
        }

        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", controlNavbar, {
                passive: true,
            });

            return () => {
                window.removeEventListener("scroll", controlNavbar);
            };
        }
    }, [lastScrollY]);

    return (
        <nav
            className={`${cn(
                "z-[1000] sticky md:top-0  px-4 flex justify-between items-center gap-4 h-[76px] bg-inherit bg-opacity-80 backdrop-blur-[10px] border-b max-md:fixed max-md:bottom-0 max-md:border-b-0 max-md:border-t max-md:w-full transition-all duration-300 ease",
                className
            )} ${!isNavbarVisible ? "md:top-0" : "md:top-[-76px]"}`}
            {...props}
        >
            <Link href="/">
                <strong className="text-xl dark:text-white hover:text-slate-400 transition-all duration-300">
                    NAAB
                </strong>
            </Link>

            <div className="flex gap-10 max-md:hidden">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`hover:text-slate-600 dark:hover:text-slate-400 transition-all duration-300 ${
                            router.pathname === link.href ? "font-bold" : null
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            <div className="flex gap-2">
                <Button
                    variant="ghost"
                    className="max-md:hidden"
                    onClick={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                    }
                >
                    {theme === "light" ? <Sun /> : <MoonStar />}
                </Button>
                <Profile />
                <Hamburger links={links} className="hidden max-md:block" />
            </div>
        </nav>
    );
};
