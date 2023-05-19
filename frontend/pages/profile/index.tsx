import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
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
import { Eye, Edit } from "lucide-react";

import { getMyBlogs } from "@/redux/actions/blogActions";

interface BlogInterface {
    id: number;
    images: string[];
    view_count: number;
    username: string;
    title: string;
    draft: boolean;
    published: string;
    cover_image: string;
    content: string;
}

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
    }, [userInfo, router]);

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
    }, [dispatch, currentPage]);

    if (userInfo) {
        return (
            <>
                <Head>
                    <title>NAAB | Profile</title>
                </Head>
                <div className="m-auto my-4 grid max-w-6xl grid-cols-[1.5fr,0.5fr] gap-4 px-4 max-md:flex max-md:flex-col-reverse">
                    <div>
                        {loading ? (
                            <>
                                <div id="posts">
                                    <h1 className="mb-2 text-4xl font-bold">
                                        <Skeleton className="h-11 max-w-[8rem]" />
                                    </h1>
                                    <div className="grid grid-cols-3 gap-1.5 max-md:grid-cols-2 max-sm:grid-cols-1">
                                        {[0, 1, 2].map((index) => (
                                            <Card key={index}>
                                                <CardHeader>
                                                    <Skeleton className="h-5" />
                                                </CardHeader>

                                                <CardContent>
                                                    <Skeleton className="h-[100px]" />
                                                </CardContent>

                                                <CardFooter className="flex gap-1.5">
                                                    <Skeleton className="h-9 w-full" />
                                                    <Skeleton className="h-9 w-full" />
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                                <div id="drafts" className="mt-8">
                                    <h1 className="mb-2 text-4xl font-bold">
                                        <Skeleton className="h-11 max-w-[8rem]" />
                                    </h1>
                                    <div className="grid grid-cols-3 gap-1.5 max-md:grid-cols-2 max-sm:grid-cols-1">
                                        {[0, 1, 2].map((index) => (
                                            <Card key={index}>
                                                <CardHeader>
                                                    <Skeleton className="h-5" />
                                                </CardHeader>

                                                <CardContent>
                                                    <Skeleton className="h-[100px]" />
                                                </CardContent>

                                                <CardFooter className="flex gap-1.5">
                                                    <Skeleton className="h-9 w-full" />
                                                    <Skeleton className="h-9 w-full" />
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {blogs && (
                                    <div id="posts">
                                        <h1 className="mb-2 text-4xl font-bold">
                                            Posts
                                        </h1>
                                        <div className="grid grid-cols-3 gap-1.5 max-md:grid-cols-2 max-sm:grid-cols-1">
                                            {blogs.map(
                                                (blog: BlogInterface) => (
                                                    <Card
                                                        key={String(blog.id)}
                                                        className="flex flex-col justify-between"
                                                    >
                                                        <CardHeader>
                                                            <CardTitle className="flex gap-2 justify-between">
                                                                {blog.title}
                                                                <span className="flex items-center">
                                                                    <Eye className="scale-[0.8]" />
                                                                    &nbsp;
                                                                    {
                                                                        blog.view_count
                                                                    }
                                                                </span>
                                                            </CardTitle>
                                                        </CardHeader>

                                                        <CardContent>
                                                            <Image
                                                                src={`${process.env.NEXT_PUBLIC_API_URL}${blog.cover_image}`}
                                                                alt={blog.title}
                                                                width={260}
                                                                height={140}
                                                                className="h-full w-full rounded-md object-fill"
                                                            />
                                                        </CardContent>

                                                        <CardFooter className="flex gap-1.5">
                                                            <Button
                                                                className="w-full"
                                                                variant="default"
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={`/post/${blog.id}`}
                                                                >
                                                                    <Eye />
                                                                    &nbsp;View
                                                                </Link>
                                                            </Button>

                                                            <Button
                                                                className="w-full"
                                                                variant="secondary"
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={`/post/${blog.id}/edit`}
                                                                >
                                                                    <Edit />
                                                                    &nbsp;Edit
                                                                </Link>
                                                            </Button>
                                                        </CardFooter>
                                                    </Card>
                                                )
                                            )}
                                        </div>
                                        {blogs.length <= 0 && (
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>
                                                        You have no Blogs.
                                                    </CardTitle>
                                                </CardHeader>
                                            </Card>
                                        )}

                                        <PaginatedItems
                                            itemsPerPage={6}
                                            totalCount={pages}
                                            page={page}
                                        />
                                    </div>
                                )}

                                {drafts && (
                                    <div id="drafts" className="mt-8">
                                        <Link
                                            href="/profile/drafts"
                                            className="!underline"
                                        >
                                            <h1 className="mb-2 text-4xl font-bold">
                                                Drafts ({total_drafts})
                                            </h1>
                                        </Link>
                                        <div className="grid grid-cols-3 gap-1.5 max-md:grid-cols-2 max-sm:grid-cols-1">
                                            {drafts
                                                .slice(0, 3)
                                                .map((draft: BlogInterface) => (
                                                    <Card
                                                        key={String(draft.id)}
                                                        className="flex flex-col justify-between"
                                                    >
                                                        <CardHeader>
                                                            <CardTitle className="flex gap-2 justify-between">
                                                                {draft.title}
                                                                <span className="flex items-center">
                                                                    <Eye className="scale-[0.8]" />
                                                                    &nbsp;
                                                                    {
                                                                        draft.view_count
                                                                    }
                                                                </span>
                                                            </CardTitle>
                                                        </CardHeader>

                                                        <CardContent>
                                                            <Image
                                                                src={`${process.env.NEXT_PUBLIC_API_URL}${draft.cover_image}`}
                                                                alt={
                                                                    draft.title
                                                                }
                                                                width={260}
                                                                height={140}
                                                                className="h-full w-full rounded-md object-fill"
                                                            />
                                                        </CardContent>

                                                        <CardFooter className="flex gap-1.5">
                                                            <Button
                                                                className="w-full"
                                                                variant="default"
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={`/post/${draft.id}`}
                                                                >
                                                                    <Eye />
                                                                    &nbsp;View
                                                                </Link>
                                                            </Button>

                                                            <Button
                                                                className="w-full"
                                                                variant="secondary"
                                                                asChild
                                                            >
                                                                <Link
                                                                    href={`/post/${draft.id}/edit`}
                                                                >
                                                                    <Edit />
                                                                    &nbsp;Edit
                                                                </Link>
                                                            </Button>
                                                        </CardFooter>
                                                    </Card>
                                                ))}
                                        </div>
                                        {drafts.length <= 0 && (
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle>
                                                        You have no drafts.
                                                    </CardTitle>
                                                </CardHeader>
                                            </Card>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {!userLoading && !userError ? (
                        <>
                            <Head>
                                <title>
                                    NAAB | Profile{" "}
                                    {`| ${userInfo.user.username}`}
                                </title>
                            </Head>
                            <Card className="h-max w-full">
                                <CardHeader>
                                    <CardTitle>
                                        <Link
                                            href={`/@${userInfo.user.username}`}
                                        >
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
                        </>
                    ) : (
                        <Card className="h-max w-full">
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
            </>
        );
    }

    return (
        <>
            <Head>
                <title>NAAB | Profile</title>
            </Head>
        </>
    );
}
