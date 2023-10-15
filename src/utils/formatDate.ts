const formattedDate = (createdDate) => {
  const date = new Date(createdDate)
  return date.toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\//g, ".")
}
export default formattedDate
