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

export const Hamburger = ({ links }: { links: Link[] }) => {
    const { theme, setTheme } = useTheme();
    const router = useRouter();

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="hidden aspect-square w-[40] max-md:flex"
                >
                    <Menu className="scale-[3]" />
                </Button>
            </SheetTrigger>
            <SheetContent
                position="bottom"
                size="lg"
                className="flex flex-col items-center justify-center gap-4 pb-[5rem]"
            >
                {links.map((link, i) => (
                    <Fade key={link.href} bottom delay={100 * i}>
                        <Link
                            href={link.href}
                            className={`transition-all duration-300 hover:text-slate-600 dark:hover:text-slate-400 ${
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
                        className="aspect-square w-[40px]"
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
                </Fade>
            </SheetContent>
        </Sheet>
    );
};
