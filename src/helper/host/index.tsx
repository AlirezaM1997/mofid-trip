import { Colors } from "@rneui/themed";
import { MyNgoDetailQuery, ProjectStatusEnum } from "@src/gql/generated";

export const getHostRequestStatusBadgeColor: (
  project: MyNgoDetailQuery["NGODetail"]["projectSet"][0]
) => keyof Colors = project => {
  if (project.statusStep === ProjectStatusEnum.Request) {
    return project.statusActivation ? "warning" : "error";
  } else if (project.statusStep === ProjectStatusEnum.Accept) {
    return project.statusActivation ? "primary" : "error";
  } else if (project.statusStep === ProjectStatusEnum.End) {
    return project.statusActivation ? "success" : "error";
  }
  return "error";
};
