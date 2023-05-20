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

interface ItemValues {
    value: string;
    label: string;
}

interface SelectInterface {
    items: ItemValues[];
    currentPage?: string;
}

export const SortSelect = ({ items, currentPage }: SelectInterface) => {
    const router = useRouter();

    const queryParams = { ...router.query };
    if (queryParams.username) delete queryParams.username;

    const valueChangeHandler = (value: string) => {
        router.push({
            pathname: currentPage || router.pathname,
            query: {
                ...queryParams,
                sort: value,
            },
        });
    };

    return (
        <Select
            onValueChange={(value) => valueChangeHandler(value)}
            value={
                router.query["sort"]
                    ? String(router.query["sort"])
                    : items[0].value
            }
        >
            <SelectTrigger className="w-[180px]">
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