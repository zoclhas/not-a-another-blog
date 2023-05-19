import { useRouter } from "next/router";
import Head from "next/head";
import type { GetServerSideProps } from "next";

type UserPageProps = {
    user: string;
};

export const getServerSideProps: GetServerSideProps<UserPageProps> = async ({
    params,
}) => {
    if (params && params.username) {
        const username = Array.isArray(params.username)
            ? params.username[0]
            : params.username;
        if (username.at(0) === "@") {
            return { props: { user: username.substring(1) } };
        }
    }
    return { notFound: true };
};

type UserDetail = {
    username: string;
    created_at: string;
    blog_count: number;
    blogs: BlogPostInterface;
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

export default function UserPage({ user }: UserPageProps) {
    return (
        <>
            <Head>
                <title>NAAB {`| @${user}`}</title>
            </Head>
            Hello, {user}
        </>
    );
}
