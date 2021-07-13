export const PAGINATION_COUNTER = 3;

export const paginationPagesArray = (num: number): number[] => {
  const array = [];
  for (let i = 0; i < Math.ceil(num / PAGINATION_COUNTER); i++) {
    array.push(i);
  }
  return array;
};
