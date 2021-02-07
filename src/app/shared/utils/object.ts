export const deepClone = (obj: any) => {
  if (!obj) {
    return null;
  }
  return JSON.parse(JSON.stringify(obj));
};
