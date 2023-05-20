import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
    currentPage?: string;
    neglect?: string;
}

export const Search = ({ currentPage, neglect }: SearchProps) => {
    const router = useRouter();
    const [query, setQuery] = useState<string>("");

    useEffect(() => {
        if (router.query["q"]) setQuery(String(router.query["q"]));
    }, [router]);

    const queryParams = { ...router.query };
    if (neglect) delete queryParams[neglect];

    const queryHandler = () => {
        router.push({
            pathname: currentPage || router.pathname,
            query: {
                ...queryParams,
                q: query,
            },
        });
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                queryHandler();
            }}
            className="grow w-full flex gap-1.5"
        >
            <Input
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button type="submit" className="aspect-square" variant="secondary">
                <SearchIcon className="scale-[2]" />
            </Button>
        </form>
    );
};
