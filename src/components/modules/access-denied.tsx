import WhiteSpace from "@atoms/white-space";
import { Image, Text, useTheme } from "@rneui/themed";
import { WIDTH } from "@src/constants";
import useTranslation from "@src/hooks/translation";
import { StyleSheet, View } from "react-native";

const AccessDenied = () => {
  const { tr } = useTranslation();
  const { theme } = useTheme();

  return (
    <>
      <View style={[styles.root, styles.imgContainer(theme)]}>
        <Image style={styles.img} source={require("@assets/image/403.png")} />
      </View>
      <WhiteSpace />
      <Text heading1 bold center>
        {tr("Access Denied")}
      </Text>
      <Text center>
        {tr(
          "It appears that you do not have permission to access this page. Access the system administrator for access."
        )}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    alignItems: "center",
  },
  img: { width: 213, height: 198 },
  imgContainer: theme => ({
    borderColor: theme.colors.black,
    borderBottomWidth: 2,
    width: WIDTH
  }),
});

export default AccessDenied;
