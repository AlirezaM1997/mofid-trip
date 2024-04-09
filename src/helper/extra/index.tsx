export const getFullName = user => {
  if (user) {
    if (user.firstname && user.lastname) return user.firstname + " " + user.lastname;
    if (user.lastname) return user.lastname;
    if (user.firstname) return user.firstname;
    if (user.id) return "User " + user.id;
  }
};

export const convertToPersianNumbers = (text: string | number) => {
  const t = text?.toString();
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return t?.replace(/\d/g, match => persianDigits[parseInt(match)]);
};

export const convertToArabicNumbers = (text: string | number) => {
  const t = text.toString();
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return t.replace(/\d/g, match => arabicDigits[parseInt(match)]);
};
