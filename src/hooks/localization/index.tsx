import React from "react";
import { RootState } from "@src/store";
import { useSelector } from "react-redux";
import { AccountSettingLanguageChoices, LanguageChoiceEnum } from "@src/gql/generated";

const useIsRtl = () => {
  const { language } = useSelector((state: RootState) => state.settingDetailSlice.settingDetail);
  return language.toUpperCase() !== LanguageChoiceEnum.EnUs;
};
export default useIsRtl;

export const formatPrice = (price: number) => {
  const { language } = useSelector((state: RootState) => state.settingDetailSlice.settingDetail);
  if (language === AccountSettingLanguageChoices.FaIr) {
    return (
      price.toLocaleString("fa-IR", {
        style: "decimal",
        useGrouping: true,
      }) + " تومان"
    );
  } else if (language === AccountSettingLanguageChoices.EnUs) {
    const currencyFormatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    return currencyFormatter.format(price);
  } else if (language === AccountSettingLanguageChoices.Ar) {
    const currencyFormatter = new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "SAR",
    });
    return currencyFormatter.format(price);
  }
};
