import Link from "next/link";
import { UserCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Profile = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <UserCircle2 />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 z-[1001] mr-2">
                <DropdownMenuGroup>
                    <Link href="/register">
                        <Button variant="default" className="w-full">
                            Sign Up
                        </Button>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href="/login">
                        <Button variant="secondary" className="w-full">
                            Login
                        </Button>
                    </Link>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
