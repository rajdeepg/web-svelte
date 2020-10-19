function number(num) {
  if (num === null || num === undefined) {
    return 'unknown';
  }

  return num.toLocaleString();
}

function string(str) {
  if (str === null || str === undefined) {
    return "";
  }
  return str;
}

export default {
  number,
  string
};
