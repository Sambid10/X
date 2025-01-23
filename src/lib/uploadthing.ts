import {
    generateReactHelpers,
    generateUploadButton,
    generateUploadDropzone,
  } from "@uploadthing/react";
  
  import type { fileRouter,AppFileRouter } from "@/app/api/uploadthing/core";
  
 export const {useUploadThing,uploadFiles}=generateReactHelpers<AppFileRouter>()