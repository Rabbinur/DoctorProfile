export const buildQueryParams = (params) => {
  const query = Object.entries(params)
    .filter(([_, value]) => value)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
  return query;
};
