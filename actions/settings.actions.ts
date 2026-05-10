"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import Settings from "@/models/Settings";
import { getCurrentUser } from "@/lib/auth";
import {
  IShippingRate,
  IPickupSettings,
  IStoreInfo,
  INotificationSettings,
} from "@/models/Settings";

function serialize(data: any) {
  return JSON.parse(JSON.stringify(data));
}

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") throw new Error("Unauthorized");
  return user;
}

// Always returns settings — creates defaults if none exist
export async function getSettings() {
  await connectDB();

  let settings = await Settings.findOne().lean();

  if (!settings) {
    settings = await Settings.create({});
    return serialize(await Settings.findOne().lean());
  }

  return serialize(settings);
}

// Public — only returns shipping rates and pickup info
export async function getPublicSettings() {
  await connectDB();

  let settings = await Settings.findOne()
    .select("shippingRates pickup freeShipping storeInfo")
    .lean();

  if (!settings) {
    await Settings.create({});
    settings = await Settings.findOne()
      .select("shippingRates pickup freeShipping storeInfo")
      .lean();
  }

  return serialize(settings);
}

export async function updateStoreInfo(data: IStoreInfo) {
  await requireAdmin();
  await connectDB();

  const settings = await Settings.findOneAndUpdate(
    {},
    { $set: { storeInfo: data } },
    { new: true, upsert: true },
  ).lean();

  revalidatePath("/dashboard/settings");
  return serialize(settings);
}

export async function updateShippingRates(data: {
  rates: IShippingRate[];
  freeShipping: { enabled: boolean; threshold: number };
}) {
  await requireAdmin();
  await connectDB();

  const settings = await Settings.findOneAndUpdate(
    {},
    {
      $set: {
        shippingRates: data.rates,
        freeShipping: data.freeShipping,
      },
    },
    { new: true, upsert: true },
  ).lean();

  revalidatePath("/dashboard/settings");
  revalidatePath("/checkout");

  return serialize(settings);
}

export async function updatePickupSettings(data: IPickupSettings) {
  await requireAdmin();
  await connectDB();

  const settings = await Settings.findOneAndUpdate(
    {},
    { $set: { pickup: data } },
    { new: true, upsert: true },
  ).lean();

  revalidatePath("/dashboard/settings");
  revalidatePath("/checkout");

  return serialize(settings);
}

export async function updateNotificationSettings(data: INotificationSettings) {
  await requireAdmin();
  await connectDB();

  const settings = await Settings.findOneAndUpdate(
    {},
    { $set: { notifications: data } },
    { new: true, upsert: true },
  ).lean();

  revalidatePath("/dashboard/settings");
  return serialize(settings);
}

export async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
}) {
  const user = await requireAdmin();
  await connectDB();

  const bcrypt = await import("bcryptjs");
  const User = (await import("@/models/User")).default;

  const dbUser = await User.findById(user.userId);
  if (!dbUser) throw new Error("User not found");

  const isMatch = await bcrypt.compare(data.currentPassword, dbUser.password);
  if (!isMatch) throw new Error("Current password is incorrect");

  const hashed = await bcrypt.hash(data.newPassword, 12);
  await User.findByIdAndUpdate(user.userId, { password: hashed });

  return { success: true };
}
