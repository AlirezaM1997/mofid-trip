const date = (startDate: Date, endDate: Date) => {
  if (!endDate || !startDate) return 1;
  if (endDate === startDate) return 1;

  return (+new Date(endDate) - +new Date(startDate)) / 86400000 + 1;
};

export const totalPrice = ({
  price,
  discount,
  endDate,
  capacity,
  startDate,
}: {
  price: number;
  discount: number;
  endDate?: Date;
  startDate?: Date;
  capacity: number;
}) =>
  (price * (1 - discount / 100) * (capacity * date(startDate as Date, endDate as Date))).toString();
