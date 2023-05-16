import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

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

import { register, login } from "@/redux/actions/userActions";

export default function Register() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [viewPassword, setViewPassword] = useState<Boolean>(false);

    const userRegister = useSelector((state: any) => state.userRegister);
    const { loading, userInfo, success, error } = userRegister;
    const userLogin = useSelector((state: any) => state.userLogin);
    const {
        loading: loginLoading,
        userInfo: userLoginInfo,
        success: loginSuccess,
        error: loginError,
    } = userLogin;

    useEffect(() => {
        if (userLoginInfo) {
            router.push("/profile");
        }

        if (success) {
            dispatch(login(username, password) as any);
            if (loginSuccess) {
                toast({
                    title: `Logged in as @${userLoginInfo.user.username}!`,
                });
            } else if (loginError) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: String(loginError),
                });
            }
        }
    }, [
        router,
        userInfo,
        success,
        loginSuccess,
        loginError,
        userLoginInfo,
        toast,
    ]);

    useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: String(error),
            });
        }
    }, [error, toast]);

    const isDisabled =
        username.length >= 3 &&
        email.length > 0 &&
        email
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            ) &&
        password.length >= 8 &&
        confirmPassword.length >= 8 &&
        password === confirmPassword;

    const registerHandler = () => {
        dispatch(register(username, email, password, confirmPassword) as any);
    };
    return (
        <div className="grid h-[calc(100vh-76px)] place-items-center max-md:my-4 max-md:h-full max-md:pb-10">
            <div>
                <Card className="mx-4">
                    <CardHeader>
                        <CardTitle>Register</CardTitle>
                        <CardDescription>
                            Your session key will be stored for 30 days unless
                            signed out.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (isDisabled) registerHandler();
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
                                <p className="text-sm text-muted-foreground">
                                    Atleast 3 characters long.
                                </p>
                            </div>

                            <div className="mb-4 grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    id="email"
                                    placeholder="john@example.com"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <p className="text-sm text-muted-foreground">
                                    You can&apos;t change your email address
                                    ever after this.
                                </p>
                            </div>

                            <div className="my-4 grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="username">Password</Label>
                                <div className="flex gap-1.5">
                                    <Input
                                        type={
                                            !viewPassword ? "password" : "text"
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
                            <div className="my-4 grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor="confirm-password">
                                    Confirm Password
                                </Label>
                                <div className="flex gap-1.5">
                                    <Input
                                        type={
                                            !viewPassword ? "password" : "text"
                                        }
                                        id="confirm-password"
                                        placeholder="Confirm Password"
                                        required
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
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
                                disabled={
                                    loading || !isDisabled || loginLoading
                                }
                            >
                                {loading && (
                                    <Fade bottom duration={100}>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    </Fade>
                                )}
                                Register
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <div className="mx-4 mt-1.5 grid gap-1.5">
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/login">
                            Already have an account? Login
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
