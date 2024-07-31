export const imageUpload = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_CLIENT_ID}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Imgur upload failed: ${response.statusText}`);
    }

    const { data, success } = await response.json();

    if (success) {
      return { url: data.display_url, delete_url: data.delete_url }; // Ensure correct path to the URL
    } else {
      throw new Error(`Imgur API error: ${data.data.error}`);
    }
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error; // Re-throw error after logging it
  }
};
