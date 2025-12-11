export const buildQueryString = (params) => {
  const queryParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (value !== null && value !== undefined && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          queryParams.append(key, item);
        });
      } else {
        queryParams.append(key, value);
      }
    }
  });

  return queryParams.toString();
};
