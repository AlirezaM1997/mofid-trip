import { TourImageType } from "@src/gql/generated";
import React, { useState } from "react";
import { ImageBackground, Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type ImageSlider = {
  imageList?: TourImageType[];
};

function ImageSlider({ imageList }: ImageSlider) {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <View>
      <ImageBackground
        style={style.sliderActiveSlide}
        imageStyle={style.sliderImageActiveSlide}
        source={{
          uri: imageList?.[activeSlide]?.medium ?? "",
        }}
      />

      <ScrollView horizontal style={{ overflow: "scroll" }}>
        <View style={style.sliderThumbnails}>
          {imageList?.map((img, index) => (
            <Pressable
              key={index}
              onPress={() => setActiveSlide(index)}
              style={{
                display: "flex",
                flexDirection: "row",
              }}>
              <ImageBackground
                style={style.sliderSlideThumbnail}
                imageStyle={style.sliderImageSlideThumbnail}
                source={{
                  uri: img.medium,
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

export default ImageSlider;
