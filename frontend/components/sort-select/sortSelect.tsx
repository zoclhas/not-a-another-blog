import { useRouter } from "next/router";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectSeparator,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

interface ItemValues {
    value: string;
    label: string;
}

interface SelectInterface {
    items: ItemValues[];
    currentPage?: string;
    sortType: string;
    className?: string;
}

export const SortSelect = ({
    items,
    currentPage,
    sortType,
    className,
}: SelectInterface) => {
    const router = useRouter();

    const queryParams = { ...router.query };
    if (queryParams.username) delete queryParams.username;

    const valueChangeHandler = (value: string) => {
        queryParams[sortType] = value;
        router.push({
            pathname: currentPage || router.pathname,
            query: {
                ...queryParams,
            },
        });
    };

    return (
        <Select
            onValueChange={(value) => valueChangeHandler(value)}
            value={
                router.query[sortType]
                    ? String(router.query[sortType])
                    : items[0].value
            }
        >
            <SelectTrigger className={cn("w-[200px]", className)}>
                <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Sort by</SelectLabel>
                    <SelectSeparator />
                    {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};
