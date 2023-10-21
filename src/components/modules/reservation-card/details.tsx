import React, { useEffect } from "react"
import { useTheme } from "@rneui/themed"
import { useDispatch } from "react-redux"
import Text from "@src/components/atoms/text"
import { View, Image, StyleSheet, Pressable } from "react-native"
import { AntDesign, Entypo } from "@expo/vector-icons"
import { setData } from "@src/slice/transaction-slice"
import TruncatedText from "@src/components/atoms/text/truncatedText"
import { dateConverter } from "@src/helper/date"
import { useNavigation } from "@react-navigation/native"
import { UserTransactionQueryType } from "@src/gql/generated"
import useTranslation from "@src/hooks/translation"

type TransactionDetailPropsType = {
  transaction: UserTransactionQueryType
}

const TransactionDetail = ({ transaction }: TransactionDetailPropsType) => {

  const { tr } = useTranslation()
  const theme = useTheme()
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleNavigate = () => {
    navigation.navigate({
      name: "ProjectScreen",
      params: {
        id: transaction?.project.id,
        name: transaction?.project.name,
      },
    })
  }

  useEffect(() => {
    dispatch(setData({ id: transaction.id }))
  }, [])

  return (
    <Pressable style={styles.container} onPress={handleNavigate}>
      <Image
        style={styles.image}
        source={{
          uri: transaction?.project?.accommodation?.avatarS3[0].small || "",
        }}
        resizeMode="cover"
      />

      <View style={styles.infoContainer}>
        <TruncatedText variant="subtitle1" title={transaction?.project?.name} />

        <View style={styles.content}>
          <View style={styles.infoRow}>
            <Entypo name="location-pin" color={theme.theme.colors.secondary} size={14} />
            <TruncatedText variant="caption" title={transaction?.project?.accommodation?.address} />
          </View>

          <View style={styles.infoRow}>
            <AntDesign name="calendar" color={theme.theme.colors.secondary} size={14} />
            <Text variant="caption">
              {dateConverter(transaction?.dateStart)} To {dateConverter(transaction?.dateEnd)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <AntDesign name="user" color={theme.theme.colors.secondary} size={14} />
            <Text variant="caption">
              {transaction?.guestSet?.length} {tr("Person")}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 144,
    height: 88,
    borderRadius: 8,
  },
  infoContainer: {
    gap: 8,
  },
  content: {
    gap: 4,
  },
  infoRow: {
    gap: 8,
    color: "grey",
    alignItems: "center",
    flexDirection: "row",
  },
})

export default TransactionDetail
