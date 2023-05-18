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
import { Eye } from "lucide-react";
import { Fade } from "react-reveal";

import { getBlogDetails } from "@/redux/actions/blogActions";

export default function PostPage() {
    const dispatch = useDispatch();
    const router = useRouter();

    const blogId = router.query.id;

    useEffect(() => {
        dispatch(getBlogDetails(Number(blogId)) as any);
    }, [dispatch]);
    return <div></div>;
}
