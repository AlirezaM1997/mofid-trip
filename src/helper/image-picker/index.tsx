import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

const handleUploadImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    const compressedImage = await compressImage(result, 1024);

    return compressedImage;
  }
};

const compressImage = async (uri: ImagePicker.ImagePickerSuccessResult, maxFileSizeKB: number) => {
  const maxSizeBytes = maxFileSizeKB * 1024;
  let compressRatio = 1;
  let targetWidth = 800;
  let compressedImage = uri.assets[0].uri;

  while (true) {
    const manipResult = await ImageManipulator.manipulateAsync(
      compressedImage,
      [{ resize: { width: targetWidth } }],
      { compress: compressRatio, format: ImageManipulator.SaveFormat.JPEG }
    );

    const newUri = manipResult.uri;

    const response = await fetch(newUri);
    const blob = await response.blob();
    const size = blob.size;

    if (size <= maxSizeBytes || compressRatio <= 0) {
      return (compressedImage = newUri);
    }

    compressRatio -= 0.1;
    targetWidth -= 50;
  }
};

export default handleUploadImage;
