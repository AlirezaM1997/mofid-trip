import { Colors } from "@rneui/themed";
import { MyNgoDetailQuery } from "@src/gql/generated";

export const getHostRequestStatusBadgeColor: (
  project: MyNgoDetailQuery["NGODetail"]["projectSet"][0]
) => keyof Colors = project => {
  if (project.statusStep.name === "REQUEST") {
    return project.statusActivation ? "warning" : "error";
  } else if (project.statusStep.name === "ACCEPT") {
    return project.statusActivation ? "primary" : "error";
  } else if (project.statusStep.name === "END") {
    return project.statusActivation ? "success" : "error";
  }
  return "error";
};
