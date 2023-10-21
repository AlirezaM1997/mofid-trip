import { Text } from "@rneui/themed";
import { RootState } from "@src/store";
import React, { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

function Slider(props: { title?: string }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const avatarS3 = useSelector(
    (state: RootState) => state.tourSlice?.tourDetail?.avatarS3 || []
  );

  return (
    <View>
      <ImageBackground
        style={style.sliderActiveSlide}
        imageStyle={style.sliderImageActiveSlide}
        source={{
          uri: avatarS3[activeSlide]?.large ?? "",
        }}
      />

      <ScrollView horizontal>
        <View style={style.sliderThumbnails}>
          {avatarS3.map((i, index) => (
            <Pressable
              key={index}
              onPress={() => setActiveSlide(index)}
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <ImageBackground
                style={style.sliderSlideThumbnail}
                imageStyle={style.sliderImageSlideThumbnail}
                source={{
                  uri: i.small,
                }}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  sliderActiveSlide: {
    height: 200,
  },
  sliderImageActiveSlide: {
    borderRadius: 10,
  },
  sliderThumbnails: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  sliderSlideThumbnail: {
    marginRight: 5,
    width: 60,
    height: 60,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    borderRadius: 16,
  },
  sliderImageSlideThumbnail: {
    borderRadius: 10,
  },
});

export default Slider;
