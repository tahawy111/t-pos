export const imgurUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
  
      const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Client-ID ${process.env.NEXT_PUBLIC_IMGUR_CLIENT_ID}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Imgur upload failed: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (data.success) {
        return { url: data.data.link }; // Ensure correct path to the URL
      } else {
        throw new Error(`Imgur API error: ${data.data.error}`);
      }
    } catch (error) {
      console.error('Image upload failed:', error);
      throw error; // Re-throw error after logging it
    }
  };
  