"use client";

import styles from "./paginate.module.css";

import ReactPaginate from "react-paginate";
import { useState } from "react";
import { useRouter } from "next/router";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatedItemsInterface {
    itemsPerPage: number;
    totalCount: number;
    page: number;
}

export const PaginatedItems = ({
    itemsPerPage,
    totalCount,
    page,
}: PaginatedItemsInterface) => {
    const router = useRouter();

    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        router.push({
            query: {
                page: event.selected + 1,
            },
        });
    };

    if (totalCount > 1) {
        return (
            <ReactPaginate
                initialPage={page}
                pageClassName={styles.default}
                activeClassName="grid aspect-square w-8 place-items-center rounded-md bg-[#1e293b] bg-opacity-10 dark:!bg-opacity-100"
                breakClassName={styles["break-me"]}
                breakLabel={"..."}
                containerClassName={styles.pagination}
                disabledClassName={styles["disabled-pages"]}
                marginPagesDisplayed={2}
                nextLabel={<ChevronRight />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalCount}
                previousLabel={<ChevronLeft />}
                renderOnZeroPageCount={null}
            />
        );
    }

    return null;
};
