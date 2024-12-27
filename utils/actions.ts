"use server";
import db from "@/utils/db";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { profileSchema } from "./schemas";

export const createProfileAction = async (
  _prevState: any,
  formData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("Please login to create a profile");
    const rowData = Object.fromEntries(formData);
    const validateFields = profileSchema.parse(rowData);

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
    return {
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
  redirect("/");
};

// GET method to get user image
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
