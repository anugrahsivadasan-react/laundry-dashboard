export const getImage = (image: string) => {
  if (!image) return

  // if already full url → return directly
  if (image.startsWith("http")) return image

  return `${import.meta.env.VITE_BACKEND_URL}/${image.replace(/^\/+/, "")}`
}
