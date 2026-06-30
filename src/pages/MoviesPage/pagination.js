export const getPaginationItems = (currentPage, totalPages) => {
  const pageSet = new Set([1, 2, 3, totalPages]);

  if (currentPage > 4) {
    pageSet.add(currentPage - 1);
  }

  pageSet.add(currentPage);

  if (currentPage < totalPages - 1) {
    pageSet.add(currentPage + 1);
  }

  const pages = [...pageSet]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  return pages.flatMap((page, index) => {
    const previousPage = pages[index - 1];
    return previousPage && page - previousPage > 1 ? [`gap-${page}`, page] : [page];
  });
};
