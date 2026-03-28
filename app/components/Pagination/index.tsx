import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

  // Show a window of pages around the current page
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const delta = 2;
    const left = currentPage - delta;
    const right = currentPage + delta;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="Property pagination"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {/* Previous */}
      {hasPrev ? (
        <Link
          href={`/?page=${currentPage - 1}`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white dark:bg-white/5 border border-nordic-dark/10 dark:border-white/10 text-sm font-medium text-nordic-dark dark:text-white hover:border-mosque hover:text-mosque transition-all"
        >
          <span className="material-icons text-sm">arrow_back</span>
          Prev
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/50 dark:bg-white/[0.02] border border-nordic-dark/5 dark:border-white/5 text-sm font-medium text-nordic-muted cursor-not-allowed select-none">
          <span className="material-icons text-sm">arrow_back</span>
          Prev
        </span>
      )}

      {/* Page numbers */}
      <div className="hidden sm:flex items-center gap-1">
        {pages.map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="w-10 h-10 flex items-center justify-center text-nordic-muted text-sm select-none"
            >
              …
            </span>
          ) : (
            <Link
              key={page}
              href={`/?page=${page}`}
              className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                page === currentPage
                  ? "bg-mosque text-white shadow-sm"
                  : "bg-white dark:bg-white/5 border border-nordic-dark/10 dark:border-white/10 text-nordic-dark dark:text-white hover:border-mosque hover:text-mosque"
              }`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          )
        )}
      </div>

      {/* Mobile page indicator */}
      <span className="sm:hidden px-4 py-2 text-sm text-nordic-muted">
        {currentPage} / {totalPages}
      </span>

      {/* Next */}
      {hasNext ? (
        <Link
          href={`/?page=${currentPage + 1}`}
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white dark:bg-white/5 border border-nordic-dark/10 dark:border-white/10 text-sm font-medium text-nordic-dark dark:text-white hover:border-mosque hover:text-mosque transition-all"
        >
          Next
          <span className="material-icons text-sm">arrow_forward</span>
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/50 dark:bg-white/[0.02] border border-nordic-dark/5 dark:border-white/5 text-sm font-medium text-nordic-muted cursor-not-allowed select-none">
          Next
          <span className="material-icons text-sm">arrow_forward</span>
        </span>
      )}
    </nav>
  );
}
