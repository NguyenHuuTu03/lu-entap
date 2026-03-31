module.exports = (pagination, query, countProduct) => {
  if (query.page) {
    pagination.currentPage = parseInt(query.page);
  }
  const countPage = Math.ceil((countProduct / pagination.limitItem));
  pagination.countPage = countPage;
  pagination.skip = (pagination.currentPage - 1) * pagination.limitItem;
  return pagination;
}