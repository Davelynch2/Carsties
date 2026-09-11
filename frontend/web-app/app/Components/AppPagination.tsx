'use client';

import { Pagination } from "flowbite-react";

interface PaginationProps {
    currentPage: number;
    pageCount: number;
    pageChanged: (page: number) => void;
}

export default function AppPagination({ currentPage, pageCount, pageChanged }: PaginationProps) {
  const totalPages =
    Number.isInteger(pageCount) && pageCount > 0
        ? pageCount
        : 1;
  return (
    <Pagination
        currentPage={currentPage}
        onPageChange={(e: number) => pageChanged(e)}
        totalPages={totalPages}
        layout="pagination"
        showIcons={true}
        className="text-blue-500 mb-5"
    />
  )
}
