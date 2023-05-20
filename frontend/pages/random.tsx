import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Markdown } from "@/components/markdown/markdown";

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, ChevronLeft, RefreshCcw, Copy } from "lucide-react";

import { getRandomBlog, addBlogViews } from "@/redux/actions/blogActions";

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

export default function Random() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();

    const blogDetails = useSelector((state: any) => state.blogRandom);
    const {
        loading,
        id,
        images,
        view_count,
        username,
        title,
        draft,
        published,
        cover_image,
        tags,
        content,
        error,
    }: BlogPostInterface = blogDetails;

    useEffect(() => {
        dispatch(getRandomBlog() as any);
    }, [dispatch]);

    useEffect(() => {
        if (title) {
            dispatch(addBlogViews(id) as any);
        }
    }, [title, id, dispatch]);

    const refreshHandler = () => {
        dispatch(getRandomBlog() as any);
    };

    const copyLinkHandler = () => {
        navigator.clipboard.writeText(`https://naab.zocs.space/post/${id}`);
        toast({
            title: "Copied post link to clipboard",
        });
    };

    if (error) {
        return (
            <>
                <Head>
                    <title>NAAB | {error}</title>
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
            <>
                <Head>
                    <title>NAAB | Random</title>
                </Head>
                <div className="mx-auto mt-4 max-h-[calc(100vh-76px-1rem)] max-w-2xl overflow-hidden px-4">
                    <div className="flex gap-2 justify-end">
                        <Skeleton className="h-10 w-10" />
                        <Skeleton className="h-10 w-10" />
                    </div>

                    <Skeleton className="h-8 mt-8" />
                    <Skeleton className="mt-1.5 h-8 max-w-[50%]" />

                    <Skeleton className="mt-4 aspect-video h-full" />

                    <div className="mt-2 flex items-center gap-1.5 ">
                        <Skeleton className="h-[40px] w-[40px] rounded-full" />
                        <Skeleton className="h-5 max-w-[240px] grow" />
                    </div>

                    <div className="mt-8">
                        <Skeleton className="h-5" />
                        <Skeleton className="mt-1.5 h-5" />
                        <Skeleton className="mt-1.5 h-5" />
                        <Skeleton className="mt-1.5 h-5 w-[20%]" />
                        <Skeleton className="mt-3 h-5" />
                        <Skeleton className="mt-1.5 h-5" />
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>NAAB | Random</title>
                <meta name="title" content="NAAB - Random" />
                <meta
                    name="description"
                    content="Bored? Try finding random blog posts."
                />
            </Head>
            {content && (
                <article className="mx-auto mt-4 max-w-2xl px-4">
                    <div className="flex gap-2 justify-end">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        className="aspect-square"
                                        onClick={refreshHandler}
                                    >
                                        <RefreshCcw className="scale-[2]" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="z-[1500]">
                                    Randomise
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        className="aspect-square"
                                        onClick={copyLinkHandler}
                                    >
                                        <Copy className="scale-[2]" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="z-[1500]">
                                    Randomise
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <h1 className="text-6xl max-sm:text-4xl font-bold mt-8">
                        {title}
                    </h1>
                    <h3 className="mt-4 opacity-40 flex gap-4 items-center">
                        {published}{" "}
                        <Separator
                            orientation="vertical"
                            className="grow h-full"
                        />
                        <span className="flex items-center font-bold tabular-nums">
                            <Eye className="scale-[0.8]" />
                            <span className="relative bottom-[1px]">
                                &nbsp;{view_count}
                            </span>
                        </span>
                    </h3>

                    <div>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}${
                                cover_image ? cover_image : ""
                            }`}
                            height={672}
                            width={378}
                            alt={`${title}s cover image`}
                            className="w-full aspect-video object-cover rounded-lg mt-4"
                        />
                        <div className="mt-2 flex gap-2">
                            {tags.map((tag: string) => (
                                <Link
                                    key={tag}
                                    className={`${badgeVariants({
                                        variant: "secondary",
                                    })} select-none`}
                                    href={`/explore?tag=${tag}`}
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                        <div className="mt-2 flex items-center gap-4">
                            <Button
                                variant="secondary"
                                asChild
                                className="px-1.5"
                            >
                                <Link
                                    href={`/@${username}`}
                                    className="flex items-center gap-1.5"
                                >
                                    <div className="flex aspect-square w-[30px] items-center justify-center rounded-md bg-slate-400 dark:bg-slate-700">
                                        <span className="text-sm">
                                            {username
                                                ? username
                                                      .slice(0, 1)
                                                      .toUpperCase()
                                                : ""}
                                        </span>
                                    </div>
                                    <span className="opacity-50">
                                        @{username}
                                    </span>
                                </Link>
                            </Button>
                            {draft && <Badge>Draft</Badge>}
                        </div>
                    </div>

                    <div className="prose mt-8 dark:prose-invert prose-img:rounded-sm">
                        <Markdown>{content}</Markdown>
                    </div>
                </article>
            )}
        </>
    );
}
