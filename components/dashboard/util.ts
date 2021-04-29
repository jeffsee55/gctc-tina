export const groupBy = <T extends object>(xs: T[], key: keyof T) => {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {}) as T[][];
};
