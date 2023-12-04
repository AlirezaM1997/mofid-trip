import { Colors } from "@rneui/themed";
import { AccommodationProjectStatusStepChoices, MyNgoDetailQuery } from "@src/gql/generated";

export const getHostRequestStatusBadgeColor: (
  tour: MyNgoDetailQuery["NGODetail"]["projectSet"][0]
) => keyof Colors = tour => {
  if (tour.statusStep === AccommodationProjectStatusStepChoices.Accept) {
    return tour.statusActivation ? 'success' : 'error'
  } else if (tour.statusStep === AccommodationProjectStatusStepChoices.Request) {
    return tour.statusActivation ? 'success' : 'error'
  }
  return 'error'
};
