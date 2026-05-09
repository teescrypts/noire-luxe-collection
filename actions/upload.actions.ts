"use server";

import cloudinary from "@/lib/cloudinary";
import { getCurrentUser } from "@/lib/auth";

interface UploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

export async function uploadImage(formData: FormData): Promise<UploadResult> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  const file = formData.get("file") as File;
  if (!file) throw new Error("No file provided");

  // Validate file type — include HEIC for iPhone photos
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/heic",
    "image/heif",
  ];
  if (!validTypes.includes(file.type.toLowerCase())) {
    throw new Error("Invalid file type. Please upload JPG, PNG, WebP or HEIC.");
  }

  // Validate file size — 15MB to accommodate iPhone photos
  const maxSize = 15 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("File too large. Maximum size is 15MB.");
  }

  // Convert file to base64
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

  // Upload to Cloudinary with transformation
  // - Convert to WebP
  // - Resize to max 1200px wide
  // - Compress quality to 85
  // - Auto format and quality optimization
  const result = await cloudinary.uploader.upload(base64, {
    folder: "noire-luxe/products",
    transformation: [
      {
        width: 1200,
        height: 1200,
        crop: "limit", // never upscale
        quality: "auto", // Cloudinary picks optimal quality
        fetch_format: "webp", // convert everything to WebP
      },
    ],
    resource_type: "image",
    timeout: 120000, // 2 min timeout for large iPhone photos
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
  };
}

export async function deleteImage(publicId: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }

  await cloudinary.uploader.destroy(publicId);
}
