import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/router";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sun, MoonStar } from "lucide-react";

import { Fade } from "react-reveal";

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
            <SheetContent
                position="bottom"
                size="lg"
                className="flex flex-col justify-center items-center gap-4 pb-[5rem]"
            >
                {links.map((link, i) => (
                    <Fade key={link.href} bottom delay={100 * i}>
                        <Link
                            href={link.href}
                            className={`hover:text-slate-600 dark:hover:text-slate-400 transition-all duration-300 ${
                                router.pathname === link.href
                                    ? "font-bold"
                                    : null
                            }`}
                        >
                            {link.label}
                        </Link>
                    </Fade>
                ))}
                <Fade bottom delay={400}>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            setTheme(theme === "light" ? "dark" : "light")
                        }
                    >
                        {theme === "light" ? <Sun /> : <MoonStar />}
                    </Button>
                </Fade>
            </SheetContent>
        </Sheet>
    );
};
