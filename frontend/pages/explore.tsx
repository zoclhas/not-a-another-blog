import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";

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
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Eye, ChevronLeft } from "lucide-react";
import { Markdown } from "@/components/markdown/markdown";
import { PaginatedItems } from "@/components/paginate/paginate";

import { queryBlogs, getTags } from "@/redux/actions/blogActions";
import { Search } from "@/components/search/search";
import { SortSelect } from "@/components/sort-select/sortSelect";
import { BlogCard } from "@/components/blog-card/blogCard";
import { TagSelect } from "@/components/tag-select/tagSelect";

interface ExploreBlogProps {
    loading: boolean;
    error: string | any;
    blogs: BlogPostInterface[];
    page: number;
    pages: number;
}

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

export default function Explore() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();

    const [tagQuery, setTagQuery] = useState<string>("");
    useEffect(() => {
        if (router.query["tag"]) setTagQuery(String(router.query["tag"]));
    }, [router]);

    const exploreBlogs = useSelector((state: any) => state.exploreBlogs);
    const { loading, error, blogs, page, pages }: ExploreBlogProps =
        exploreBlogs;
    const allTags = useSelector((state: any) => state.getTags);
    const { tags, error: tagsError }: { tags: string[]; error: string | any } =
        allTags;

    const query = router.query["q"] || "";
    const tagOption = router.query["tag"] || "";
    const sortOption = router.query["sort"] || "latest";
    const timePeriod = router.query["t"] || "";
    const currentPage = Number(router.query["page"]) || 1;

    useEffect(() => {
        dispatch(
            queryBlogs(
                String(query),
                String(tagOption),
                String(sortOption),
                String(timePeriod),
                Number(currentPage)
            ) as any
        );
        dispatch(getTags() as any);
    }, [dispatch, query, tagOption, sortOption, timePeriod, currentPage]);

    useEffect(() => {
        if (error || tagsError) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: String(error) || String(tagsError),
            });
        }
    }, [error, toast, tagsError]);

    if (error || tagsError) {
        return (
            <div className="mt-4 flex justify-center px-4">
                <Card className="max-w-[400px] grow">
                    <CardHeader>
                        <CardTitle>Uh oh!</CardTitle>
                        <CardDescription>{error || tagsError}</CardDescription>
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
            <div className="mx-auto mt-4 max-w-6xl px-4 max-h-[calc(100vh-76px-1rem)] overflow-hidden">
                <div>
                    <div className="flex-col gap-2">
                        <Search />
                        <div className="flex gap-2 mt-2 max-[500px]:flex-col">
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
                                className="max-[500px]:grow max-[500px]:w-full"
                            />
                            <SortSelect
                                sortType="t"
                                items={[
                                    { value: "all_time", label: "All Time" },
                                    { value: "today", label: "Today" },
                                    { value: "past_week", label: "Week" },
                                    {
                                        value: "past_month",
                                        label: "Month",
                                    },
                                    {
                                        value: "past_year",
                                        label: "Year",
                                    },
                                ]}
                                className="max-[500px]:grow max-[500px]:w-full"
                            />
                            <TagSelect
                                frameworks={[
                                    {
                                        label: "hi",
                                        value: "nice",
                                    },
                                ]}
                                className="max-[500px]:grow max-[500px]:w-full"
                            />
                        </div>
                    </div>
                    <div id="posts" className="mt-4">
                        <div className="grid grid-cols-3 gap-1.5 max-md:grid-cols-2 max-sm:grid-cols-1">
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

                <div>
                    <Skeleton className="grow h-10 w-full" />
                    <div className="mt-4 flex flex-wrap gap-2">
                        {Array.from({ length: 20 }, (_, index) => {
                            const length = Math.floor(Math.random() * 3) + 3; // Generate random length between 3 and 5
                            let result = "";
                            const characters =
                                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                            for (let i = 0; i < length; i++) {
                                result += characters.charAt(
                                    Math.floor(
                                        Math.random() * characters.length
                                    )
                                );
                            }

                            return (
                                <Skeleton
                                    className="grow h-8 rounded-full"
                                    key={index}
                                >
                                    <span className="text-3xl invisible">
                                        {result}
                                    </span>
                                </Skeleton>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>NAAB | Explore</title>
                <meta name="title" content="NAAB - Explore" />
                <meta
                    name="description"
                    content="Explore NAAB's collection of wonderful posts!"
                />
            </Head>
            <div className="mx-auto mt-4 max-w-6xl px-4">
                <div className="flex-col gap-2">
                    <Search />
                    <div className="flex gap-2 mt-2 max-[500px]:flex-col">
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
                            className="max-[500px]:grow max-[500px]:w-full"
                        />
                        <SortSelect
                            sortType="t"
                            items={[
                                { value: "all_time", label: "All Time" },
                                { value: "today", label: "Today" },
                                { value: "past_week", label: "Week" },
                                {
                                    value: "past_month",
                                    label: "Month",
                                },
                                {
                                    value: "past_year",
                                    label: "Year",
                                },
                            ]}
                            className="max-[500px]:grow max-[500px]:w-full"
                        />
                        {tags && (
                            <TagSelect
                                frameworks={tags.map((tag) => {
                                    return {
                                        value: tag.toLowerCase(),
                                        label: tag,
                                    };
                                })}
                                className="max-[500px]:grow max-[500px]:w-full"
                            />
                        )}
                    </div>
                </div>
                <div id="posts" className="mt-4">
                    {blogs && (
                        <div className="grid grid-cols-3 gap-1.5 max-md:grid-cols-2 max-sm:grid-cols-1">
                            {blogs.map((blog) => (
                                <BlogCard key={blog.id} isUser blog={blog} />
                            ))}
                        </div>
                    )}
                </div>

                <PaginatedItems page={page} totalCount={pages} />
            </div>
        </>
    );
}
