"use client";
import { Upload, Ban } from "lucide-react";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as tf from "@tensorflow/tfjs";
import { flushSync } from "react-dom";
import { img } from "@/lib/lib";

export default function ImageDropzone({ model }) {
  const [image, setImage] = useState({});
  const imgRef = useRef(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maximages: 1,
    onDrop: async function (acceptedFiles) {
      if (!acceptedFiles.length) {
        setImage({
          message: "Please select a single food image.",
        });
      } else {
        const image = acceptedFiles[0];
        const newImage = Object.assign(image, {
          preview: URL.createObjectURL(image),
          message: image.name,
        });

        flushSync(setImage(newImage));

        const IMG_SHAPE = [224, 224];
        
        const processedImg = img.prepare(imgRef.current, IMG_SHAPE);
        const result = img.classify(model.current.model, processedImg);
        const k = img.topKPred(result, 3)

        console.log(processedImg, result, k)
      }
    },
  });

  const isImageUploaded = !Object.keys(image).length ? true : false;

  return (
    <div
      {...getRootProps()}
      className="duration-150 ease-in text-[#999] flex flex-col gap-4 text-sm items-center border-2 border-dashed border-[#eeeeee] bg-[#fafafa] rounded-xl p-8 text-center hover:border-blue-500 transition cursor-pointer shadow-sm"
    >
      <input {...getInputProps()} />
      {isImageUploaded ? (
        <>
          <Upload size={48} />
          <p>Drag a single food image here, or click to browse</p>
        </>
      ) : (
        <>
          {!image.preview ? (
            <Ban size={48} />
          ) : (
            <img
              ref={imgRef}
              src={image.preview}
              width={48}
              height={48}
              onLoad={() => URL.revokeObjectURL(image.preview)}
            />
          )}
          <p className="truncate w-2xs">{image.message}</p>
        </>
      )}
    </div>
  );
}
