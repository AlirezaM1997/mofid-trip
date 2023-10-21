import { useTheme } from "@rneui/themed"
import { HEIGHT, WIDTH } from "@src/constants"
import React from "react"
import { View, StyleSheet, Modal as NativeModal, ModalProps, Pressable } from "react-native"

type MyModalProps = {
  onBackdropPress: () => void
} & ModalProps

const Modal: React.FC = ({ onBackdropPress, ...props }: MyModalProps) => {
  const { theme } = useTheme()

  return (
    <NativeModal {...props}>
      <Pressable onPress={() => onBackdropPress()} style={style.mask(theme)}></Pressable>
      <View style={style.centeredView}>
        <View style={style.modalView}>{props.children}</View>
      </View>
    </NativeModal>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "yellow",
  },
  mask: (theme) => ({
    backgroundColor: theme.colors.grey2,
    opacity: 0.5,
    width: WIDTH,
    height: HEIGHT,
    position: "absolute",
  }),
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
})

Modal.defaultProps = {
  onBackdropPress: () => {},
  animationType: "fade",
  transparent: true,
}

export default Modal
