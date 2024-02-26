const isYoutubeUrl = (url: string) => /youtube|youtu.be/.test(url);

export const createYtEmbedUrl = (url: string) => {
  if (!isYoutubeUrl(url)) return url;
  let id;
  if (url.includes("watch?v=")) id = url.split("watch?v=")[1];
  if (url.includes("youtu.be")) id = url.split("youtu.be/")[1];
  return `https://www.youtube.com/embed/${id ?? ""}`;
};
