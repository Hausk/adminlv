"use server";

import { prisma } from "@/lib/primsa";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET as string,
});

export const uploadImageToCloudinary = async (file: any) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: "librevivant", // Remplacez par votre preset Cloudinary
    });
    return uploadResponse;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Error uploading to Cloudinary");
  }
};

export const modalCategory = async (files: string[], categoryName: string) => {
  const createdCategory = await prisma.category.create({
    data: {
      title: categoryName,
    },
  });

  const categoryId = createdCategory.id;

  const uploadPromises = files.map(async (file) => {
    const uploadResponse = await uploadImageToCloudinary(file);
    return {
      url: uploadResponse.secure_url,
      categoryId,
    };
  });

  const savedImages = await Promise.all(uploadPromises);

  await prisma.image.createMany({
    data: savedImages,
  });

  return savedImages;
};

export const saveImages = async (files: string[], categoryId: number = 1) => {
  const uploadPromises = files.map(async (file) => {
    const uploadResponse = await uploadImageToCloudinary(file);
    return {
      url: uploadResponse.secure_url,
      categoryId,
    };
  });

  const savedImages = await Promise.all(uploadPromises);

  await prisma.image.createMany({
    data: savedImages,
  });

  return savedImages;
};
