const convertImageURIToFile = async (uri: string) => {
  try {
    // Fetch image data
    const response = await fetch(uri, {
      headers: {
        accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "accept-language": "en,fa;q=0.9,en-US;q=0.8,ar;q=0.7",
        "sec-fetch-dest": "image",
        "sec-fetch-mode": "no-cors",
        "sec-fetch-site": "cross-site",
        "Cache-Control": "no-cache", // Disable caching
        Pragma: "no-cache", // Additional header for older HTTP/1.0 caches
      },
      referrer: "http://localhost:8081/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    });
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
export default convertImageURIToFile;
