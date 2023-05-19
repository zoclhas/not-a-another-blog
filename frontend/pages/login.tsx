import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AtSign, Eye, EyeOff, Loader2 } from "lucide-react";
import { Fade } from "react-reveal";

import { login } from "@/redux/actions/userActions";

export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [viewPassword, setViewPassword] = useState<Boolean>(false);

    // Checking whether user is logged in
    const userLogin = useSelector((state: any) => state.userLogin);
    const { loading, userInfo, success, error } = userLogin;
    useEffect(() => {
        if (userInfo || success) {
            router.push("/profile");
        }

        if (success) {
            toast({
                title: `Logged in as @${userInfo.user.username}!`,
            });
        }
    }, [router, userInfo, success, toast]);

    // Error handling
    useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: String(error),
            });
        }
    }, [error, toast]);

    const loginHandler = () => dispatch(login(username, password) as any);
    return (
        <>
            <Head>
                <title>NAAB | Login</title>
            </Head>
            <div className="grid h-[calc(100vh-76px)] place-items-center">
                <div>
                    <Card className="mx-4">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Your session key will be stored for 30 days
                                unless signed out.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    loginHandler();
                                }}
                            >
                                <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="username">Username</Label>
                                    <div className="flex gap-1.5">
                                        <div className="inline-flex aspect-square h-10 w-[40px] items-center justify-center rounded-md border border-input px-4 py-2">
                                            <AtSign className="scale-[3]" />
                                        </div>
                                        <Input
                                            type="text"
                                            id="username"
                                            placeholder="Username"
                                            required
                                            onChange={(e) =>
                                                setUsername(e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="my-4 grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="flex gap-1.5">
                                        <Input
                                            type={
                                                !viewPassword
                                                    ? "password"
                                                    : "text"
                                            }
                                            id="password"
                                            placeholder="Password"
                                            required
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                        />
                                        <Button
                                            className="aspect-square"
                                            type="button"
                                            variant="outline"
                                            onClick={() =>
                                                setViewPassword(!viewPassword)
                                            }
                                        >
                                            {viewPassword ? (
                                                <Eye className="scale-[3]" />
                                            ) : (
                                                <EyeOff className="scale-[3]" />
                                            )}
                                        </Button>
                                    </div>
                                </div>

                                <Button
                                    className="w-full"
                                    variant="secondary"
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading && (
                                        <Fade bottom duration={100}>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        </Fade>
                                    )}
                                    Login
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="mx-4 mt-1.5 grid grid-cols-2 gap-1.5">
                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/register">Register</Link>
                        </Button>

                        <Button variant="outline" className="w-full" asChild>
                            <Link href="/forgot-password">
                                Forgot Password?
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
