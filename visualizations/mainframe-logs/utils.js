export const stringifyResults = (results) => results.map((result) => {
  return Object.entries(result)
    .filter(([key]) => !['x', 'y'].includes(key))
    .map(([key, value]) => `${key}: ${value}`)
    .join(' / ');
});
