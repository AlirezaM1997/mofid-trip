import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@src/store";
import { setNetworkState } from "@src/slice/network-slice";
import { PRIMARY_COLOR } from "@src/theme";
import { StyleSheet, View } from "react-native";

const NetworkState = () => {
  const dispatch = useDispatch();
  const networkState = useSelector(
    (state: RootState) => state.networkSlice.state
  );

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      dispatch(setNetworkState(state));
    });
  }, []);

  if (!networkState.isConnected) {
    return (
      <View style={style.container}>
        <Text style={style.text} variant="caption">
          You are offline
        </Text>
      </View>
    );
  }
};

const style = StyleSheet.create({
  container: {
    backgroundColor: PRIMARY_COLOR,
    padding: 5,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});

export default NetworkState;
