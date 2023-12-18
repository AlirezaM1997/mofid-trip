const date = (startDate: Date, endDate: Date) =>
  (+new Date(endDate) - +new Date(startDate)) / 86400000;

export const totalPrice = ({
  price,
  endDate,
  capacity,
  startDate,
}: {
  price: number;
  endDate: Date;
  startDate: Date;
  capacity: number;
}) => (price * (capacity * date(startDate, endDate))).toString();
