import { CapacityQueryType, TourCapacityType } from "@src/gql/generated";

export const getGender = (capacity: TourCapacityType) => {
  const res = [];
  if (capacity?.male > 0) {
    res.push("Male");
  }
  if (capacity?.child > 0) {
    res.push("Children");
  }
  if (capacity?.female > 0) {
    res.push("Female");
  }
  return res.join(", ");
};

export const getCapacity = (capacity: TourCapacityType) =>
  capacity?.male ?? 0 + capacity?.female ?? 0 + capacity?.child ?? 0;
