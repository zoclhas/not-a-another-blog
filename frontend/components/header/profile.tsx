"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { UserCircle2, LogOut, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

import { logout } from "@/redux/actions/userActions";

export default function Profile() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { toast } = useToast();

    const userLogin = useSelector((state: any) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout() as any);
        setIsOpen(false);

        if (router.pathname === "/profile") {
            router.push("/login");
        }

        toast({
            title: `Logged out!`,
        });
    };

    const [isOpen, setIsOpen] = useState(false);

    const setZIndex = () => {
        setTimeout(() => {
            const modal = document.querySelector(
                "[class='fixed inset-0 z-50 flex items-start justify-center sm:items-center']"
            )!;
            modal.classList.add("!z-[9999]");
        }, 1);
    };

    if (userInfo) {
        return (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <strong>@{userInfo.user.username}</strong>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 z-[1001] mr-2">
                        <DropdownMenuGroup>
                            <Link href="/profile">
                                <Button variant="default" className="w-full">
                                    <User2 />
                                    &nbsp;Profile
                                </Button>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DialogTrigger
                                asChild
                                onClick={() => {
                                    setZIndex();
                                    setIsOpen(true);
                                }}
                            >
                                <Button variant="secondary" className="w-full">
                                    <LogOut />
                                    &nbsp;Logout
                                </Button>
                            </DialogTrigger>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DialogContent className="max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Logout</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to logout?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={logoutHandler}>
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

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
}
