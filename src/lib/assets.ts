const baseUrl = import.meta.env.BASE_URL;

export const withBase = (path: string) => {
  return `${baseUrl}${path.replace(/^\//, "")}`;
};
