import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import {
    Card,
    CardDescription,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SortSelect } from "@/components/sort-select/sortSelect";
import { Search } from "@/components/search/search";
import { BlogCard } from "@/components/blog-card/blogCard";
import { ChevronLeft, ChevronRight, Copy } from "lucide-react";

import { getBlogs } from "@/redux/actions/blogActions";
import { getUserDetail } from "@/redux/actions/userActions";

type BlogsProps = {
    loading: boolean;
    latest_posts: BlogPostInterface[];
    trending_posts: BlogPostInterface[];
    error: string | any;
};

interface BlogPostInterface {
    id: number;
    images: string[];
    view_count: number;
    username: string;
    title: string;
    draft: boolean;
    published: string;
    cover_image: string;
    content: string;
    tags: string[];
}

type UserDetail = {
    username: string;
    blog_count: number;
    blogs: BlogPostInterface[];
    error: string;
};

export default function Home() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();

    const blogs = useSelector((state: any) => state.blogs);
    const { loading, error, latest_posts, trending_posts }: BlogsProps = blogs;
    const userLogin = useSelector((state: any) => state.userLogin);
    const { userInfo } = userLogin;
    const userDetail = useSelector((state: any) => state.userDetail);
    const {
        error: userError,
        username,
        blog_count,
        blogs: userBlogs,
    }: UserDetail = userDetail;

    useEffect(() => {
        dispatch(getBlogs() as any);
    }, [dispatch]);

    useEffect(() => {
        if (userInfo) {
            dispatch(
                getUserDetail(userInfo.user.username, 1, "latest", "") as any
            );
        }
    }, [userInfo, dispatch]);

    useEffect(() => {
        if (error || userError) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: String(error) || String(userError),
            });
        }
    }, [error, toast]);

    if (error) {
        return (
            <div className="mt-4 flex justify-center px-4">
                <Card className="max-w-[400px] grow">
                    <CardHeader>
                        <CardTitle>Uh oh!</CardTitle>
                        <CardDescription>{error}</CardDescription>
                    </CardHeader>

                    <CardFooter>
                        <Button asChild>
                            <Link href="/">
                                <ChevronLeft />
                                &nbsp;Go Back
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="mx-auto mt-4 max-h-[calc(100vh-76px-1rem)] max-w-6xl overflow-hidden px-4">
                {userInfo && (
                    <div className="flex gap-4 max-sm:flex-col">
                        <Skeleton className="h-96 w-full max-w-[300px] max-sm:max-w-full" />
                        <div className="grow flex flex-col">
                            <Skeleton className="h-9 w-[300px]" />
                            <div className="w-full gap-2 h-full flex mt-2 max-[550px]:flex-col">
                                <Skeleton className="h-full max-sm:h-80 w-full grow" />
                                <Skeleton className="h-full max-sm:h-80 w-full grow" />
                            </div>
                        </div>
                    </div>
                )}

                <div id="latest" className={userInfo ? "mt-8" : null}>
                    <Skeleton className="h-9 w-[300px]" />
                    <div className="grid grid-cols-3 mt-4 gap-1.5 max-sm:grid-cols-1">
                        {[0, 1, 2].map((index) => (
                            <Card key={index}>
                                <Skeleton className="h-[200px]" />

                                <CardHeader>
                                    <Skeleton className="h-5" />
                                </CardHeader>

                                <CardContent className="flex gap-1.5">
                                    <Skeleton className="h-5 w-full max-w-[50px] rounded-full" />
                                    <Skeleton className="h-5 w-full max-w-[50px] rounded-full" />
                                    <Skeleton className="h-5 w-full max-w-[50px] rounded-full" />
                                </CardContent>

                                <CardFooter>
                                    <Skeleton className="h-10 w-full" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>

                <div id="trending" className="mt-8">
                    <Skeleton className="h-9 w-[300px]" />
                    <div className="grid grid-cols-3 mt-4 gap-1.5 max-sm:grid-cols-1">
                        {[0, 1, 2].map((index) => (
                            <Card key={index}>
                                <Skeleton className="h-[200px]" />

                                <CardHeader>
                                    <Skeleton className="h-5" />
                                </CardHeader>

                                <CardContent className="flex gap-1.5">
                                    <Skeleton className="h-5 w-full max-w-[50px] rounded-full" />
                                    <Skeleton className="h-5 w-full max-w-[50px] rounded-full" />
                                    <Skeleton className="h-5 w-full max-w-[50px] rounded-full" />
                                </CardContent>

                                <CardFooter>
                                    <Skeleton className="h-10 w-full" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>Not A Another Blog</title>
            </Head>
            <div className="mx-auto mt-4 max-w-6xl px-4">
                {userInfo && userDetail && userBlogs && (
                    <div className="flex gap-4 max-sm:flex-col">
                        <Card className="w-full max-w-[300px] flex flex-col justify-center max-sm:max-w-full">
                            <CardHeader className="flex gap-2 flex-col items-center">
                                <div className="flex aspect-square w-[100px] items-center justify-center rounded-md bg-slate-400 dark:bg-slate-700">
                                    <span className="text-6xl">
                                        {username
                                            ? username.slice(0, 1).toUpperCase()
                                            : ""}
                                    </span>
                                </div>
                                <CardTitle>
                                    <Link
                                        href="/profile"
                                        className="opacity-50 hover:opacity-80 transition-opacity duration-300"
                                    >
                                        @{username}
                                    </Link>
                                </CardTitle>
                            </CardHeader>

                            <CardFooter className="justify-center">
                                <Badge variant="outline" className="rounded-md">
                                    <h3 className="font-bold text-lg">
                                        Total Posts: {blog_count}
                                    </h3>
                                </Badge>
                            </CardFooter>
                        </Card>

                        <div className="grow flex flex-col">
                            <h1 className="text-4xl font-bold">
                                Your latest posts:
                            </h1>
                            <div className="w-full gap-2 h-full flex mt-2 max-[550px]:flex-col">
                                {userBlogs.slice(0, 2).map((blog) => (
                                    <BlogCard key={blog.id} blog={blog} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {trending_posts && (
                    <div id="latest" className={userInfo ? "mt-8" : null}>
                        <h1 className="text-4xl font-bold">
                            <Link
                                href="/explore?sort=views-dsd&t=week"
                                className="opacity-80 hover:opacity-100 transition-opacity duration-300 flex gap-4 items-center"
                            >
                                Trending Posts
                                <ChevronRight className="relative top-1 scale-[1.2]" />
                            </Link>
                        </h1>
                        <div className="grid grid-cols-3 mt-4 gap-1.5 max-sm:grid-cols-1">
                            {trending_posts.slice(0, 3).map((blog) => (
                                <BlogCard
                                    key={blog.id}
                                    blog={blog}
                                    isUser={true}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {latest_posts && (
                    <div id="latest" className="mt-8 mb-4">
                        <h1 className="text-4xl font-bold">
                            <Link
                                href="/explore?sort=latest"
                                className="opacity-80 hover:opacity-100 transition-opacity duration-300 flex gap-4 items-center"
                            >
                                Latest Posts
                                <ChevronRight className="relative top-1 scale-[1.2]" />
                            </Link>
                        </h1>
                        <div className="grid grid-cols-3 mt-4 gap-1.5 max-sm:grid-cols-1">
                            {latest_posts.slice(0, 3).map((blog) => (
                                <BlogCard
                                    key={blog.id}
                                    blog={blog}
                                    isUser={true}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
