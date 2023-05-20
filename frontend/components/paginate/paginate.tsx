"use client";

import styles from "./paginate.module.css";

import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginatedItemsInterface {
    itemsPerPage?: number;
    totalCount: number;
    page: number;
    className?: string;
    currentPage?: string;
}

export const PaginatedItems = ({
    itemsPerPage,
    totalCount,
    page,
    className,
    currentPage,
}: PaginatedItemsInterface) => {
    const router = useRouter();

    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        router.push({
            pathname: currentPage || router.pathname,
            query: {
                page: event.nextSelectedPage + 1,
            },
        });
    };

    if (totalCount > 1) {
        return (
            <ReactPaginate
                onClick={handlePageClick}
                initialPage={page - 1}
                pageClassName={styles.default}
                activeClassName="grid aspect-square w-8 place-items-center rounded-md bg-[#1e293b] bg-opacity-10 dark:!bg-opacity-100"
                breakClassName={styles["break-me"]}
                breakLabel={"..."}
                containerClassName={`${className} ${styles.pagination}`}
                disabledClassName={styles["disabled-pages"]}
                marginPagesDisplayed={2}
                nextLabel={<ChevronRight />}
                // onPageChange={handlePageClick}
                pageRangeDisplayed={10}
                pageCount={totalCount}
                previousLabel={<ChevronLeft />}
                renderOnZeroPageCount={null}
            />
        );
    }

    return null;
};
