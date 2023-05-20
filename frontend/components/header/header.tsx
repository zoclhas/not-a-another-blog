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

    useEffect(() => {
        const controlNavbar = () => {
            if (window.scrollY > lastScrollY) {
                setIsNavbarVisible(true);
            } else {
                setIsNavbarVisible(false);
            }

            setLastScrollY(window.scrollY);
        };

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
                "ease sticky z-[1000]  flex h-[76px] items-center justify-between gap-4 border-b bg-[#fff] bg-opacity-80 dark:bg-[#030711] dark:bg-opacity-80 px-4 backdrop-blur-[10px] transition-all duration-300 max-md:fixed max-md:bottom-0 max-md:w-full max-md:border-b-0 max-md:border-t md:top-0",
                className
            )} ${!isNavbarVisible ? "md:top-0" : "md:top-[-76px]"}`}
            {...props}
        >
            <Link href="/">
                <strong className="text-xl transition-all duration-300 hover:text-slate-400 dark:text-white">
                    NAAB
                </strong>
            </Link>

            <div className="flex gap-10 max-md:hidden">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`transition-all duration-300 hover:text-slate-600 dark:hover:text-slate-400 ${
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
                    className="aspect-square w-[40px] max-md:hidden"
                    onClick={() =>
                        setTheme(theme === "light" ? "dark" : "light")
                    }
                >
                    {theme === "light" ? (
                        <Sun className="scale-[3]" />
                    ) : (
                        <MoonStar className="scale-[3]" />
                    )}
                </Button>
                <Profile />
                <Hamburger links={links} />
            </div>
        </nav>
    );
};
