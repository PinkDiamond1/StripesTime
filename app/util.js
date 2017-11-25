// Remove all quotation marks from a string
export function stripQuotes(str) {
  return str ? str.replace(/"/g, "") : "";
}

export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}