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

export function round2(number){
  var factor = Math.pow(10, 2);
  var tempNumber = number * factor;
  var roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}