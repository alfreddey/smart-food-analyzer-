"use client";
import { Upload, Ban } from "lucide-react";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as tf from "@tensorflow/tfjs";
import { flushSync } from "react-dom";
import { img } from "@/lib/lib";

export default function ImageDropzone({ modelRef }) {
  const [image, setImage] = useState({});
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

        // Used new Image() instead of imgRef
        // because this returned a high-res photo
        // and increased the model's accuracy.
        // you can test by using this code:
        // const imgElement = imgRef.current;
        // await imgElement.decode();

        const md = modelRef.current.model;
        const imgElement = new Image();
        imgElement.src = image.preview;
        await imgElement.decode();  // Very essential, the model's performance relies on this

        const IMG_SHAPE = [224, 224];
        const labels = modelRef.current.labels;

        const processedImg = img.prepare(imgElement, IMG_SHAPE);
        const pred = img.classify(md, processedImg);
        const topK = await img.topKPred(pred, 3);

        topK.forEach(({ i, prediction }) => console.log(`Label: ${labels[i]}, Confidence score: ${(prediction*100).toFixed(2)}%`));
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
      {/* <img ref={imgRef} src="apple_pie.jpg" /> */}
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
              src={image.preview}
              width={224}
              height={224}
              onLoad={() => URL.revokeObjectURL(image.preview)}
            />
          )}
          <p className="truncate w-2xs">{image.message}</p>
        </>
      )}
    </div>
  );
}
