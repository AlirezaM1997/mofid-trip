import React from "react";
import { Text } from "@rneui/themed";
import { ImageBackground, StyleSheet, View } from "react-native";
import WhiteSpace from "@src/components/atoms/white-space";
import useTranslation from "@src/hooks/translation";

const Page: React.FC = () => {
  const { tr } = useTranslation();
  return (
    <View style={style.container}>
      <ImageBackground
        style={{
          width: 120,
          height: 200,
        }}
        imageStyle={{ resizeMode: "contain" }}
        source={require("@assets/image/bottle.jpg")}
      />
      <WhiteSpace size={10} />
      <Text heading1>{tr("Coming Soon")}</Text>
      <WhiteSpace size={10} />
      <Text body1 style={style.description}>
        {tr("This section is under development and will be available in the next update.")}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 20,
  },
  description: {
    textAlign: "center",
    color: "#ADAFAE",
  },
});

export default Page;
