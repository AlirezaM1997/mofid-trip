import { View, StyleSheet } from "react-native";
import React from "react";
import { Avatar, Divider, Text } from "@rneui/themed";
import useTranslation from "@src/hooks/translation";
import { useNgoDetailQuery } from "@src/gql/generated";
import { useSelector } from "react-redux";
import { RootState } from "@src/store";

const RequestToMyToursScreen = () => {
  const { tr } = useTranslation();
  const data = useSelector((state: RootState)=> state.userSlice)
  // const  {data,loading,error}= useNgoDetailQuery({variables:{pk:}})
console.log('====================================');
console.log(data);
console.log('====================================');
  return (
    <View style={style.container}>
      <View style={style.header}>
        <Text heading2>{tr("requests received for tours")}</Text>
        <Text caption type="grey2">
          {tr("all requests received from travelers who plan to travel with your tours")}
        </Text>
      </View>
      <View style={style.cardList}>
        <View style={style.card}>
          <View style={style.avatarNameBox}>
            <Avatar rounded size={48} source={require("@assets/image/Dambiz.jpg")} />
            <View style={style.nameBox}>
              <Text subtitle2>سید محمدحسین میرشفیعی</Text>
              <Text caption type="grey3">
                تور ماسوله / در انتظار بررسی
              </Text>
            </View>
          </View>
          <Text caption style={style.moreDetail}>
            {tr("more details")}
          </Text>
        </View>
        <Divider />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 24,
    gap: 30,
  },
  header: {
    gap: 4,
  },
  cardList: {
    gap: 24,
  },
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avatarNameBox: {
    display: "flex",
    flexDirection: "row",
    gap: 12,
  },
  nameBox: {
    gap: 4,
    marginVertical: "auto",
  },
  moreDetail: {
    marginVertical: "auto",
    textDecorationLine: "underline",
  },
});

export default RequestToMyToursScreen;
