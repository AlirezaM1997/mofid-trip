const convertImageURIToFile = async (uri: string) => {
    try {
      // Fetch image data
      const response = await fetch(uri);
      const blob = await response.blob();

      // Create File object
      const file = new File([blob], "image" + Date.now().toString(36) + ".jpg", {
        type: blob.type,
      });

      return file;
    } catch (error) {
      console.error("Error converting image URI to file:", error);
      return null;
    }
  };
export default convertImageURIToFile