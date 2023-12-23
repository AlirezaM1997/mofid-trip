import { Colors } from "@rneui/themed";
import {
  CapacityQueryType,
  MyNgoDetailQuery,
  TourCapacityType,
  TourTourStatusStepChoices,
} from "@src/gql/generated";

export const getGender = (capacity: TourCapacityType | CapacityQueryType) => {
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

export const getCapacity = (capacity: TourCapacityType | CapacityQueryType) =>
  capacity?.male ?? 0 + capacity?.female ?? 0 + capacity?.child ?? 0;

export const getTourRequestStatusBadgeColor: (
  tour: MyNgoDetailQuery["NGODetail"]["tourSet"][0]
) => keyof Colors = tour => {
  if (tour.statusStep === TourTourStatusStepChoices.Accept) {
    return tour.statusActivation ? "success" : "error";
  } else if (tour.statusStep === TourTourStatusStepChoices.Request) {
    return tour.statusActivation ? "success" : "error";
  }
  return "error";
};
