import { Colors } from "@rneui/themed";
import { MyNgoDetailQuery, ProjectQueryType, ProjectStatusEnum } from "@src/gql/generated";

export const getHostRequestStatusBadgeColor: (
  project: ProjectQueryType
) => keyof Colors = project => {
  if (project?.statusStep?.name === ProjectStatusEnum.Request) {
    return project.statusActivation ? "warning" : "error";
  } else if (
    [ProjectStatusEnum.End, ProjectStatusEnum.Accept].includes(
      project?.statusStep?.name as ProjectStatusEnum
    )
  ) {
    return project.statusActivation ? "primary" : "error";
  }
  return "error";
};
