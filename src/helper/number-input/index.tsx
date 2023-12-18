const convertPersianNumToLatin = value => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  for (let i = 0; i < 10; i++) {
    const persianDigit = persianDigits[i];
    const latinDigit = i.toString();
    value = value?.replace(new RegExp(persianDigit, "g"), latinDigit);
  }

  // Remove non-numeric characters
  value = value?.replace(/[^\d]/g, "");

  return value;
};

// TODO: change function name to something more meaningful
const parseText = value => {
  const parsedValue = convertPersianNumToLatin(value);

  return parsedValue;
};

export default parseText;
