import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

function DynamicPaginator({ totalPages, currentPage, onPageChange }: Props) {
  const numAdjacentPages = 2;
  const pages: (number | string)[] = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      Math.abs(currentPage - i) <= numAdjacentPages
    ) {
      pages.push(i);
    } else if (i < currentPage && pages[pages.length - 1] !== "...") {
      pages.push("...");
    } else if (i > currentPage) {
      if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
      break;
    }
  }

  // Always add first and last page
  if (!pages.includes(1)) {
    pages.unshift(1);
  }
  if (!pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  return (
    <Pagination>
      <PaginationContent>
        {pages.map((page, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href=""
              isActive={page === currentPage}
              onClick={(e: React.FormEvent) => {
                e.preventDefault();
                if (typeof page === "number") {
                  onPageChange(page);
                }
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}

export default DynamicPaginator;
