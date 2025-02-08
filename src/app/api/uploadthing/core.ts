import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";
import { getFolderId, MUTATIONS } from "~/server/db/queries";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({
        image: {
            /**
             * For full list of options and defaults, see the File Route API reference
             * @see https://docs.uploadthing.com/file-routes#route-config
             */
            maxFileSize: "4MB",
            maxFileCount: 1,
        },
    })
        .input(
            z.object({
                folderId: z.number(),
            })
        )
        // Set permissions and file types for this FileRoute
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .middleware(async ({ input }) => {
            // This code runs on your server before upload
            const user = await auth();
            // console.log("user", user);
            // If you throw, the user will not be able to upload
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            if (!user.userId) throw new UploadThingError("Unauthorized");

            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const folder = await getFolderId(input.folderId);

            if (!folder) {
                // eslint-disable-next-line @typescript-eslint/only-throw-error
                throw new UploadThingError("Folder not found");
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            if (folder.ownerId !== user.userId) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/only-throw-error
                throw new UploadThingError("Unauthorized");
            }

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.userId, parentId: input.folderId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.url);

            await MUTATIONS.createFiles({
                file: {
                    name: file.name,
                    size: file.size,
                    url: file.url,
                    parent: metadata.parentId,
                },
                userId: metadata.userId,
            })

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
