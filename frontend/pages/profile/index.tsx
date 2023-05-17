import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { PaginatedItems } from "@/components/paginate/paginate";

import { getMyBlogs } from "@/redux/actions/blogActions";

export default function Profile() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { toast } = useToast();

    const userLogin = useSelector((state: any) => state.userLogin);
    const { loading: userLoading, userInfo, error: userError } = userLogin;
    const myBlogs = useSelector((state: any) => state.myBlogs);
    const {
        loading,
        error,
        blogs,
        total_blogs,
        drafts,
        total_drafts,
        page,
        pages,
    } = myBlogs;

    useEffect(() => {
        if (!userInfo || !userInfo.user.username) router.push("/login");
    }, [userInfo]);

    useEffect(() => {
        if (userError || error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: String(userError || error),
            });
        }
    }, [userError, toast, error]);

    let currentPage = Number(router.query["page"]);

    useEffect(() => {
        dispatch(getMyBlogs(currentPage ? currentPage : 1) as any);
    }, [dispatch, getMyBlogs]);

    if (userInfo) {
        return (
            <div className="m-auto my-4 grid max-w-6xl grid-cols-[1.5fr,0.5fr] px-4">
                <div>
                    <b>hi</b>
                    <PaginatedItems
                        itemsPerPage={6}
                        totalCount={pages}
                        page={page}
                    />
                </div>

                {!userLoading && !userError ? (
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>
                                <Link href={`/@${userInfo.user.username}`}>
                                    <Button
                                        variant="secondary"
                                        className="flex h-full w-full justify-start gap-1.5 px-2 text-lg font-bold"
                                    >
                                        <div className="flex aspect-square w-[30px] items-center justify-center rounded-md bg-slate-400 dark:bg-slate-700">
                                            <span className="text-sm">
                                                {userInfo.user.username
                                                    .slice(0, 1)
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                        @{userInfo.user.username}
                                    </Button>
                                </Link>
                            </CardTitle>
                        </CardHeader>

                        {loading ? (
                            <CardFooter className="flex gap-1.5">
                                <Button
                                    disabled
                                    variant="outline"
                                    className="w-full"
                                >
                                    <Skeleton className="h-4 w-full max-w-[250px]" />
                                </Button>
                                <Button
                                    disabled
                                    variant="outline"
                                    className="w-full"
                                >
                                    <Skeleton className="h-4 w-full max-w-[250px]" />
                                </Button>
                            </CardFooter>
                        ) : (
                            <CardFooter className="flex gap-1.5">
                                <Button
                                    disabled
                                    variant="outline"
                                    className="w-full"
                                >
                                    Blogs: {total_blogs}
                                </Button>
                                <Button
                                    disabled
                                    variant="outline"
                                    className="w-full"
                                >
                                    Drafts: {total_drafts}
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                ) : (
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>
                                <Button
                                    variant="ghost"
                                    className=" w-fullpx-2 h-full text-lg font-bold"
                                >
                                    <div className="flex items-center space-x-4">
                                        <Skeleton className="h-12 w-12 rounded-full" />
                                        <div className="space-y-2">
                                            <Skeleton className="h-4 max-w-[250px]" />
                                            <Skeleton className="h-4 max-w-[200px]" />
                                        </div>
                                    </div>
                                </Button>
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <Skeleton className="h-4 max-w-[250px]" />
                        </CardContent>
                    </Card>
                )}
            </div>
        );
    }
}
