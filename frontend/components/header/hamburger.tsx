import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sun, MoonStar } from "lucide-react";

import { Fade } from "react-awesome-reveal";

interface Link {
    label: string;
    href: string;
}

export const Hamburger = ({
    links,
    className,
}: {
    links: Link[];
    className?: string;
}) => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className={className}>
                    <Menu />
                </Button>
            </SheetTrigger>
            <Fade bottom cascade>
                <SheetContent
                    position="bottom"
                    size="lg"
                    className="flex flex-col justify-center items-center gap-4 pb-[5rem]"
                >
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`hover:text-slate-600 dark:hover:text-slate-400 transition-all duration-300 ${
                                router.pathname === link.href
                                    ? "font-bold"
                                    : null
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Button
                        variant="ghost"
                        onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                        }
                    >
                        {theme === "light" ? <Sun /> : <MoonStar />}
                    </Button>
                </SheetContent>
            </Fade>
        </Sheet>
    );
};
