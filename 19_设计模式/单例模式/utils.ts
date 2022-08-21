export const api = async (url: string) => {
  return await fetch(url)
    .then((res) => res.text())
    .then((res) => res.replace(/\n|\s{2,5}/g, "").slice(0, 500));
};
