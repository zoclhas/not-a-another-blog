import Image from "next/image";
import Link from "next/link";

import { Badge, badgeVariants } from "@/components/ui/badge";
import {
    Card,
    CardDescription,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

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
    error?: string | any;
    loading?: boolean;
}

export const BlogCard = (props: {
    blog: BlogPostInterface;
    isUser?: boolean;
}) => {
    const { blog, isUser } = props;

    return (
        <Card
            key={blog.id}
            className="flex flex-col justify-between overflow-hidden"
        >
            <div className="relative after:w-full after:h-full rounded-md overflow-hidden after:bg-gradient-to-t after:from-black dark:after:from-[#030711] after:to-20% dark:after:to-40% after:absolute after:z-[2] after:top-0 after:left-0">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${blog.cover_image}`}
                    alt={blog.title + " image"}
                    width={429}
                    height={241}
                    className="aspect-video object-cover w-full rounded-b-md"
                />

                {blog.tags && (
                    <div className="flex gap-1.5 absolute bottom-4 left-4 z-10 overflow-hidden max-w-full">
                        {blog.tags.map((tag: string) => (
                            <Link
                                key={tag}
                                href={`/explore?tag=${tag}`}
                                className={`${badgeVariants({
                                    variant: "default",
                                })} text-md bg-[rgb(15,23,42,0.1)] dark:bg-white dark:bg-opacity-5 dark:text-white backdrop-blur-md select-none`}
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                )}

                <div className="flex absolute bottom-4 right-4 z-10 text-white">
                    <Eye className="scale-[0.8]" />
                    &nbsp;{blog.view_count}
                </div>
            </div>

            <CardHeader>
                <CardTitle>{blog.title}</CardTitle>
                {!isUser ? (
                    <CardDescription>{blog.published}</CardDescription>
                ) : (
                    <CardDescription className="flex justify-between gap-2">
                        <Link
                            href={`/@${blog.username}`}
                            className="opacity-80 hover:opacity-100 transition-opacity"
                        >
                            @{blog.username}
                        </Link>
                        <span>{blog.published}</span>
                    </CardDescription>
                )}
            </CardHeader>

            <CardFooter>
                <Button asChild className="w-full font-bold">
                    <Link href={`/post/${blog.id}`}>Read</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};
