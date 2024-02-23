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
              imageList?.[0]?.large
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

      {imageList?.length ? (
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
              <AntDesign name="closecircle" size={24} color={"white"} />
            </Pressable>
            <Entypo
              size={34}
              name="chevron-left"
              onPress={handlePrevImage}
              style={{
                left: 10,
                position: "absolute",
                borderRadius: "100%",
                backgroundColor: theme.colors.grey0,
              }}
            />
            <Entypo
              size={34}
              name="chevron-right"
              onPress={handleNextImage}
              style={{
                right: 10,
                position: "absolute",
                borderRadius: "100%",
                backgroundColor: theme.colors.grey0,
              }}
            />
          </View>
        </BottomSheet>
      ) : (
        <></>
      )}
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
    width: WIDTH,
    height: HEIGHT,
    margin: "auto",
    alignItems: "center",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0, .5)",
  },
  bottomSheetBackDrop: {
    width: WIDTH,
    height: HEIGHT,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "rgba(0,0,0 , .5)",
  },
  bottomSheetContent: {
    display: "flex",
    width: WIDTH,
    height: HEIGHT,
    alignItems: "center",
    flexDirection: "row",
    margin: "auto",
    justifyContent: "center",
  },
  fullScreenImage: {
    width: WIDTH,
    margin: "auto",
    height: HEIGHT,
    objectFit: "contain",
  },
  sliderThumbnails: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  sliderSlideThumbnail: {
    width: 60,
    height: 60,
    marginRight: 5,
    borderRadius: 16,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  sliderImageSlideThumbnail: {
    borderRadius: 10,
  },
});

export default ImageSlider;
