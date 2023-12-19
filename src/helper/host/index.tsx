import { Colors } from "@rneui/themed";
import { MyNgoDetailQuery, ProjectStatusEnum } from "@src/gql/generated";

export const getHostRequestStatusBadgeColor: (
  tour: MyNgoDetailQuery["NGODetail"]["projectSet"][0]
) => keyof Colors = tour => {
  if (tour.statusStep === ProjectStatusEnum.Active) {
    return tour.statusActivation ? "success" : "error";
  } else if (tour.statusStep === ProjectStatusEnum.Completed) {
    return tour.statusActivation ? "success" : "error";
  } else if (tour.statusStep === ProjectStatusEnum.End) {
    return tour.statusActivation ? "success" : "error";
  } else if (tour.statusStep === ProjectStatusEnum.Initial) {
    return tour.statusActivation ? "success" : "error";
  } else if (tour.statusStep === ProjectStatusEnum.Pending) {
    return tour.statusActivation ? "success" : "error";
  } else if (tour.statusStep === ProjectStatusEnum.Rejected) {
    return tour.statusActivation ? "success" : "error";
  }
  return "error";
};
