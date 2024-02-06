export function aricleValidate(data: any) {
  const verify = ["title", "article"];
  for (let key of verify) {
    if (!data[key]) {
      return `${key} not found`;
    }
  }
}
