export const formatDate = (dateWOFormat: string): Date => {
  const splittedDate = dateWOFormat.split('/')
  return new Date(Number(splittedDate[2]), Number(splittedDate[0]) - 1, Number(splittedDate[1]))
}







