import { Language_Choice } from "@src/gql/generated"
import { messages } from "@src/messages"
import { RootState } from "@src/store"
import { useSelector } from "react-redux"

const useTranslation = () => {
  const language = useSelector((state: RootState) => state.settingDetailSlice?.settingDetail?.language || Language_Choice.EnUs)

  const tr = (lang) => {
    try {
      return messages[lang.toLowerCase()][language.toLowerCase()]
    } catch (error) {
      return messages[Language_Choice.EnUs.toLowerCase()][language.toLowerCase()]
    }
  }

  return { tr }
}
export default useTranslation
