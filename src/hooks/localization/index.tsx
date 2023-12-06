import React from "react";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import { AccountSettingLanguageChoices, LanguageChoiceEnum } from "@src/gql/generated";
import useTranslation from "../translation";

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
