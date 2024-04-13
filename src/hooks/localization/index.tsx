import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import { AccountSettingLanguageChoices, LanguageChoiceEnum } from "@src/gql/generated";
import useTranslation from "../translation";
import { convertToArabicNumbers, convertToPersianNumbers } from "@src/helper/extra";

const useIsRtl = () => {
  const { language } = useSelector((state: RootState) => state.settingDetailSlice.settingDetail);
  return language.toUpperCase() !== LanguageChoiceEnum.EnUs;
};
export default useIsRtl;

export const useFormatPrice = () => {
  const { language } = useSelector((state: RootState) => state.settingDetailSlice.settingDetail);
  const { tr } = useTranslation();

  const formatPrice = (price: number) => {
    if (language === AccountSettingLanguageChoices.FaIr) {
      return (
        price?.toLocaleString("fa-IR", {
          style: "decimal",
          useGrouping: true,
        }) +
        " " +
        tr("tooman")
      );
    } else if (language === AccountSettingLanguageChoices.EnUs) {
      return (
        price?.toLocaleString("en-US", {
          style: "decimal",
          useGrouping: true,
        }) +
        " " +
        tr("tooman")
      );
    } else if (language === AccountSettingLanguageChoices.Ar) {
      return (
        price?.toLocaleString("ar-SA", {
          style: "decimal",
          useGrouping: true,
        }) +
        " " +
        tr("tooman")
      );
    }
  };
  return { formatPrice };
};

export const useFormatNumberInText = () => {
  const { language } = useSelector((state: RootState) => state.settingDetailSlice.settingDetail);

  const formatText = (txt: string) => {
    if (language === AccountSettingLanguageChoices.FaIr) {
      return convertToPersianNumbers(txt);
    } else if (language === AccountSettingLanguageChoices.Ar) {
      return convertToArabicNumbers(txt);
    } else return txt;
  };
  return { formatText };
};
