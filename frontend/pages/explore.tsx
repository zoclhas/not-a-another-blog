import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";

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
import { Eye, ChevronLeft } from "lucide-react";
import { Markdown } from "@/components/markdown/markdown";
import { PaginatedItems } from "@/components/paginate/paginate";

import { queryBlogs } from "@/redux/actions/blogActions";

export default function Explore() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();

    const exploreBlogs = useSelector((state: any) => state.exploreBlogs);
    const { loading, error, blogs, page, pages } = exploreBlogs;

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
    }, [dispatch, query, tagOption, sortOption, timePeriod, currentPage]);

    return <div></div>;
}
