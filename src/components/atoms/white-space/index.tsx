import React from "react";
import { View } from "react-native";

type WhiteSpacePropsType = {
  size?: number;
};

const WhiteSpace: React.FC<WhiteSpacePropsType> = (props) => <View style={{ height: props.size }} {...props}></View>;
WhiteSpace.defaultProps = {
  size: 10
}
export default WhiteSpace;
