import { useRouter } from "next/router";
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

export default function UserPage({ user }: UserPageProps) {
    return <>Hello, {user}</>;
}
