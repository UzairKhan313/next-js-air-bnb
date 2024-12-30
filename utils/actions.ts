"use server";
import db from "@/utils/db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profileSchema, validateWithZodSchema } from "./schemas";

const getAuthUser = async () => {
  const user = await currentUser();
  if (!user) throw new Error("You must be logged in to access this route.");
  if (!user.privateMetadata.hasProfile) redirect("/profile/create");
  return user;
};

const renderError = (error: unknown): { message: string } => {
  console.log(error);
  return {
    message: error instanceof Error ? error.message : "An error occurred",
  };
};

export const createProfileAction = async (
  _prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a profile");
    const rowData = Object.fromEntries(formData);
    const validateFields = validateWithZodSchema(profileSchema, rowData);

    await db.profile.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        profileImage: user.imageUrl ?? "",
        ...validateFields,
      },
    });
    // await clerkClient.users.updateUserMetadata(user.id, {
    //   privateMetadata: {
    //     hasProfile: true,
    //   },
    // });
    const client = await clerkClient(); // Await the resolved ClerkClient
    await client.users.updateUserMetadata(user.id, {
      privateMetadata: {
        hasProfile: true,
      },
    });
    // return { message: "Profile created" };
  } catch (error: any) {
    renderError(error);
  }
  redirect("/");
};

// GET Request to get user image
export const fetchProfileImage = async () => {
  const user = await currentUser();
  if (!user) return null;

  const profile = await db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
    select: {
      profileImage: true,
    },
  });
  return profile?.profileImage;
};
// GET Request to get user profile
export const fetchProfile = async () => {
  const user = await getAuthUser();
  const profile = db.profile.findUnique({
    where: {
      clerkId: user.id,
    },
  });
  if (!profile) redirect("/profile/create");
  return profile;
};

export const updateProfileAction = async (
  prevState: any,
  formData: FormData
): Promise<{ message: string }> => {
  const user = await getAuthUser();
  try {
    const rowData = Object.fromEntries(formData);
    const validatedFields = validateWithZodSchema(profileSchema, rowData);
    await db.profile.update({
      where: {
        clerkId: user.id,
      },
      data: validatedFields,
    });

    revalidatePath("/profile");
    return { message: "Profile updated successfully." };
  } catch (error: any) {
    return renderError(error);
  }
};
