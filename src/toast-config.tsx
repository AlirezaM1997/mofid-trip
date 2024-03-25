import { ErrorToast, InfoToast, SuccessToast } from "react-native-toast-message";

export const toastConfig = {
  success: props => (
    <SuccessToast
      {...props}
      text1Style={{ fontFamily: "DanaNoEn" }}
      text2Style={{ fontFamily: "DanaNoEn" }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1Style={{ fontFamily: "DanaNoEn" }}
      text2Style={{ fontFamily: "DanaNoEn" }}
    />
  ),
  info: props => (
    <InfoToast
      {...props}
      text1Style={{ fontFamily: "DanaNoEn" }}
      text2Style={{ fontFamily: "DanaNoEn" }}
    />
  ),
};
