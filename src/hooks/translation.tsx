import { LanguageChoiceEnum } from "@src/gql/generated";
import { convertToArabicNumbers, convertToPersianNumbers } from "@src/helper/extra";
import { messages } from "@src/messages";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";

const useTranslation = () => {
  const language = useSelector(
    (state: RootState) =>
      state.settingDetailSlice?.settingDetail?.language || LanguageChoiceEnum.EnUs
  );

  const tr = lang => {
    try {
      return messages[lang.toLowerCase()][language.toLowerCase()];
    } catch (error) {
      return messages[LanguageChoiceEnum.EnUs.toLowerCase()][language.toLowerCase()];
    }
  };

  return { tr };
};
export default useTranslation;

export const useLocalizedNumberFormat = () => {
  const language = useSelector(
    (state: RootState) =>
      state.settingDetailSlice?.settingDetail?.language || LanguageChoiceEnum.EnUs
  );

  const localizeNumber = (number: string | number) => {
    const n = number.toString()
    if ((language as string) === LanguageChoiceEnum.FaIr) {
      return convertToPersianNumbers(n);
    } else if ((language as string) === LanguageChoiceEnum.Ar) {
      return convertToArabicNumbers(n);
    }
    return n;
  };
  return { localizeNumber };
};
