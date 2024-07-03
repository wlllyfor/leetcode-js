import { ReactElement } from "react";

const Pagination = ({
  currentPage,
  pageCount,
  goToPage,
  getStartNumber,
  getEndNumber,
}: {
  currentPage: number;
  pageCount: number;
  goToPage: (page: number) => void;
  getStartNumber: () => number;
  getEndNumber: () => number;
}): ReactElement[] => {
  const prevButton: ReactElement[] = currentPage > 0
    ? [
      <button
        key="prev"
        onClick={() => goToPage(currentPage - 1)}
        className="mx-1 px-2 py-1 border rounded cursor-pointer"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>,
    ]
    : [];

  const firstPageButton: ReactElement[] = [
    <button
      key={0}
      onClick={() => goToPage(0)}
      className={`mx-1 px-2 py-1 border rounded cursor-pointer ${currentPage === 0 ? "bg-blue-500 text-white" : ""}`}
    >
      {1}
    </button>,
  ];

  const leftEllipsis: ReactElement[] = currentPage > 2 ? [ <span key="left-ellipsis">...</span> ] : [];

  const start: number = getStartNumber();
  const end: number = getEndNumber();

  const middlePages: ReactElement[] = Array.from({ length: end - start + 1 }, (_, i) => {
    const page: number = start + i;
    return (
      <button
        key={page}
        onClick={() => goToPage(page)}
        className={`mx-1 px-2 py-1 border rounded cursor-pointer ${currentPage === page ? "bg-blue-500 text-white" : ""}`}
      >
        {page + 1}
      </button>
    );
  });

  const rightEllipsis: ReactElement[] = currentPage < pageCount - 4 ? [ <span key="right-ellipsis">...</span> ] : [];

  const lastPageButton: ReactElement[] = currentPage < pageCount - 3
    ? [
      <button
        key={pageCount - 1}
        onClick={() => goToPage(pageCount - 1)}
        className={`mx-1 px-2 py-1 border rounded cursor-pointer ${currentPage === pageCount - 1 ? "bg-blue-500 text-white" : ""}`}
      >
        {pageCount}
      </button>,
    ]
    : [];

  const nextButton: ReactElement[] = currentPage < pageCount - 1
    ? [
      <button
        key="next"
        onClick={() => goToPage(currentPage + 1)}
        className="mx-1 px-2 py-1 border rounded cursor-pointer"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>,
    ]
    : [];

  return [
    ...prevButton,
    ...firstPageButton,
    ...leftEllipsis,
    ...middlePages,
    ...rightEllipsis,
    ...lastPageButton,
    ...nextButton,
  ];
};

export { Pagination };
