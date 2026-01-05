"use server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadMedia(formData: FormData) {
  try {
    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          // Professional Tip: Video ke liye 'video' resource_type zaroori hai
          resource_type: file.type.startsWith("video") ? "video" : "image",
          folder: "news-media-portal",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result?.secure_url);
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Upload Error:", error);
    return { error: "Upload failed" };
  }
}