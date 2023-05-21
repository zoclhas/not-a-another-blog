"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/router";

type FrameworkProps = {
    value: string;
    label: string;
};

export const TagSelect = ({
    frameworks,
    className,
}: {
    frameworks: FrameworkProps[];
    className?: string;
}) => {
    const router = useRouter();

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const tagChangeHandler = (currValue: string) => {
        router.push({
            query: {
                tag: currValue,
            },
        });
    };

    React.useEffect(() => {
        if (router.query["tag"]) setValue(String(router.query["tag"]));
    }, [router]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", className)}
                >
                    {value
                        ? frameworks.find(
                              (framework) => framework.value === value
                          )?.label
                        : "Select tag..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search tags..." />
                    <CommandEmpty>No tag found.</CommandEmpty>
                    <CommandGroup>
                        {frameworks.map((framework) => (
                            <CommandItem
                                key={framework.value}
                                onSelect={(currentValue) => {
                                    console.log(currentValue);
                                    setValue(
                                        currentValue === value
                                            ? ""
                                            : currentValue
                                    );
                                    setOpen(false);
                                    tagChangeHandler(
                                        currentValue === value
                                            ? ""
                                            : currentValue
                                    );
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === framework.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                    )}
                                />
                                {framework.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};
