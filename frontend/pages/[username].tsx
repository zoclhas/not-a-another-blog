import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import axios from "axios";

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
import { ChevronLeft, Copy } from "lucide-react";

import { getUserDetail } from "@/redux/actions/userActions";
import { PaginatedItems } from "@/components/paginate/paginate";

type UserDetail = {
    loading: boolean;
    username: string;
    created_at: string;
    blog_count: number;
    blogs: BlogPostInterface[];
    total_views: number;
    page: number;
    pages: number;
    error: string;
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
    error: string | any;
    loading: boolean;
}

export default function UserPage({ user, total_posts }: UserPageProps) {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();

    const userDetail = useSelector((state: any) => state.userDetail);
    const {
        loading,
        error,
        username,
        created_at,
        blog_count,
        total_views,
        blogs,
        page,
        pages,
    }: UserDetail = userDetail;

    useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: String(error),
            });
        }
    }, [error, toast]);

    const currentPage = Number(router.query["page"]) || 1;
    const sortOption = router.query["sort"] || "latest";
    const query = router.query["q"] || "";
    useEffect(() => {
        dispatch(
            getUserDetail(
                user,
                currentPage,
                String(sortOption),
                String(query)
            ) as any
        );
    }, [dispatch, currentPage, sortOption, user, query]);

    const copyUsernameHandler = () => {
        navigator.clipboard.writeText(`https://naab.zocs.space/@${username}`);
        toast({
            title: "Copied user link to clipboard",
        });
    };

    if (error) {
        return (
            <>
                <Head>
                    <title>NAAB | @{username}</title>
                    <meta name="title" content={`NAAB | ${username}`} />
                    <meta
                        name="description"
                        content={`@${user} doesn't exist :(`}
                    />
                </Head>
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
            </>
        );
    }

    if (loading) {
        return (
            <div className="mx-auto mt-4 max-h-[calc(100vh-76px-1rem)] max-w-4xl overflow-hidden px-4">
                <div className="flex gap-4 items-center">
                    <Skeleton className="h-[100px] w-[100px] aspect-square rounded-md" />
                    <Skeleton className="h-11 w-full max-w-[300px]" />
                </div>

                <div className="mt-4">
                    <Skeleton className="h-4 w-[200px]" />
                </div>

                <div className="mt-12 flex gap-4">
                    <Skeleton className="h-9 w-[100px]" />
                    <Skeleton className="h-9 w-[400px]" />
                </div>
                <div id="posts" className="mt-4">
                    <div className="grid grid-cols-2 gap-1.5 max-sm:grid-cols-1">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
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
                <title>NAAB | @{user}</title>
                <meta name="title" content={`NAAB - @${user}`} />
                <meta
                    name="description"
                    content={`Checkout @${user}'s profile! Total posts: ${total_posts}`}
                />
            </Head>

            <div className="mx-auto mt-4 max-w-4xl px-4 md:mb-4">
                <div className="flex gap-4 items-center">
                    <div className="flex aspect-square w-[100px] items-center justify-center rounded-md bg-slate-400 dark:bg-slate-700">
                        <span className="text-6xl">
                            {username ? username.slice(0, 1).toUpperCase() : ""}
                        </span>
                    </div>

                    <div>
                        <h1 className="font-bold text-4xl flex gap-4 items-center">
                            @{username}
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Copy
                                            className="relative top-1 opacity-60 hover:opacity-80 transition-opacity"
                                            onClick={copyUsernameHandler}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Copy link to clipboard
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </h1>
                        <p className="opacity-40 text-sm">
                            Member since: {created_at}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex gap-2 flex-wrap">
                    <Badge variant="outline" className="rounded-md">
                        <h3 className="font-bold text-lg">
                            Total Posts: {blog_count}
                        </h3>
                    </Badge>
                    <Badge variant="outline" className="rounded-md">
                        <h3 className="font-bold text-lg">
                            Total Views: {total_views}
                        </h3>
                    </Badge>
                </div>

                <div className="mt-12 flex gap-4">
                    <h1 className="font-bold text-3xl">Posts</h1>
                    <PaginatedItems
                        itemsPerPage={6}
                        page={page}
                        totalCount={pages}
                        className="!p-0"
                        currentPage={`@${username}`}
                    />
                </div>
                <div className="my-4 flex gap-4 max-md:flex-col max-md:gap-2">
                    <Search currentPage={`@${username}`} neglect="username" />
                    <SortSelect
                        sortType="sort"
                        items={[
                            { value: "latest", label: "Latest" },
                            { value: "oldest", label: "Oldest" },
                            {
                                value: "views-asd",
                                label: "Views: Ascending",
                            },
                            {
                                value: "views-dsd",
                                label: "Views: Descending",
                            },
                        ]}
                        currentPage={`@${username}`}
                    />
                </div>
                {blogs && blogs.length > 0 ? (
                    <div id="posts" className="mt-4">
                        <div className="grid grid-cols-2 gap-1.5 max-sm:grid-cols-1">
                            {blogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    </div>
                ) : (
                    <Alert className="mt-8">
                        <AlertTitle className="font-bold mb-4 text-xl">
                            @{user} has no posts :(
                        </AlertTitle>
                        <AlertDescription>
                            Maybe come back later?
                        </AlertDescription>
                    </Alert>
                )}
            </div>
        </>
    );
}

type UserPageProps = {
    user: string;
    total_posts: any;
};

export const getServerSideProps: GetServerSideProps<
    UserPageProps | any
> = async ({ params }) => {
    if (params && params.username) {
        const username = Array.isArray(params.username)
            ? params.username[0]
            : params.username;
        if (username.at(0) === "@") {
            try {
                const { data }: any = await axios.get(
                    `${
                        process.env.NEXT_PUBLIC_API_URL
                    }/api/u/${username.substring(1)}`
                );
                return {
                    props: {
                        user: String(data.username),
                        total_posts: data.blog_count,
                    },
                };
            } catch {
                return { props: { user: username.substring(1) } };
            }
        }
    }
    return { notFound: true };
};
