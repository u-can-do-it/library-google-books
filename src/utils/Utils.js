// trim string to defined length
export const stringShorter = (str, maxLength, separator = " ") => {
  if (typeof str === "string") {
    if (str.length <= maxLength) return str;
    return str.substr(0, str.lastIndexOf(separator, maxLength));
  }
};
