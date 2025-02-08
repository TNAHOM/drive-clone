import { generateUploadButton } from "@uploadthing/react";

import type { OurFileRouter } from "~/app/api/uploadthing/core";
console.log(generateUploadButton);
export const UploadButton = generateUploadButton<OurFileRouter>();
