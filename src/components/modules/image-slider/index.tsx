import { BottomSheet, Image, Text, useTheme } from "@rneui/themed";
import { HEIGHT, WIDTH } from "@src/constants";
import { AccommodationImageType, TourImageType } from "@src/gql/generated";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { ImageBackground, Platform, Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type ImageSlider = {
  imageList?: (AccommodationImageType | TourImageType)[];
};

function ImageSlider({ imageList }: ImageSlider) {
  const { theme } = useTheme();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const openImage = (index: number) => {
    console.log(index);
    setActiveSlide(index);
    setIsVisible(true);
  };

  const handlePrevImage = () => {
    if (activeSlide === 0) {
      return setActiveSlide((imageList?.length as number) - 1);
    }
    setActiveSlide(a => a - 1);
  };
  const handleNextImage = () => {
    if (activeSlide === (imageList?.length as number) - 1) {
      return setActiveSlide(0);
    }

    setActiveSlide(a => a + 1);
  };

  return (
    <>
      <View>
        <Pressable onPress={() => openImage(0)}>
          <ImageBackground
            style={style.sliderActiveSlide}
            imageStyle={style.sliderImageActiveSlide}
            source={
              imageList?.[0]?.medium
                ? {
                    uri: imageList?.[0]?.large,
                  }
                : require("@assets/image/defaultHost.svg")
            }
          />
        </Pressable>

        <ScrollView horizontal style={{ overflow: "scroll" }}>
          <View style={style.sliderThumbnails}>
            {imageList?.map((img, index) => (
              <Pressable
                key={index}
                onPress={() => openImage(index)}
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

      <BottomSheet
        isVisible={isVisible}
        onBackdropPress={() => setIsVisible(false)}
        backdropStyle={style.bottomSheetBackDrop}
        containerStyle={style.bottomSheetContainer}>
        <View style={style.bottomSheetContent}>
          {Platform.OS === "web" ? (
            <img style={style.fullScreenImage} src={imageList?.[activeSlide].large as string} />
          ) : (
            <Image
              style={style.fullScreenImage}
              source={{
                uri: imageList?.[activeSlide].large as string,
              }}
            />
          )}
          <Pressable
            style={{
              top: 20,
              right: 20,
              width: 30,
              height: 30,
              position: "absolute",
            }}
            onPress={() => setIsVisible(false)}>
            <AntDesign name="closecircle" size={24} />
          </Pressable>
          <Entypo
            size={34}
            name="chevron-left"
            onPress={handlePrevImage}
            style={{
              position: "absolute",
              left: 10,
              backgroundColor: theme.colors.grey0,
              borderRadius: "100%",
            }}
          />
          <Entypo
            size={34}
            name="chevron-right"
            onPress={handleNextImage}
            style={{
              position: "absolute",
              right: 10,
              backgroundColor: theme.colors.grey0,
              borderRadius: "100%",
            }}
          />
        </View>
      </BottomSheet>
    </>
  );
}

const style = StyleSheet.create({
  sliderActiveSlide: {
    height: 200,
    width: "100%",
  },
  sliderImageActiveSlide: {
    borderRadius: 10,
  },
  bottomSheetContainer: {
    height: "100%",
    width: WIDTH,
    justifyContent: "center",
  },
  bottomSheetBackDrop: {
    width: WIDTH,
    backgroundColor: "white",
  },
  bottomSheetContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fullScreenImage: {
    objectFit: "scale-down",
    height: HEIGHT,
    width: WIDTH,
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
