"use client";
import { Upload, Ban } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import * as tf from "@tensorflow/tfjs";
import { img } from "@/lib/lib";

export default function ImageDropzone() {
  const modelRef = useRef({});
  const [image, setImage] = useState({});
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: false,
    maxFiles: 1,
    onDrop: async function (acceptedFiles) {
      if (!acceptedFiles.length || !acceptedFiles[0].type.startsWith('image/')) {
        setImage({
          message: "Please select a food image(JPEG, PNG).",
        });
      } else {
        const image = acceptedFiles[0];
        const newImage = Object.assign(image, {
          preview: URL.createObjectURL(image),
          message: image.name,
        });

        // Used new Image() instead of imgRef
        // because it returned a high-res photo
        // and increased the model's accuracy.
        // you can test by using this code:
        // const imgElement = imgRef.current;
        // await imgElement.decode();

        const IMG_SHAPE = [224, 224];
        const md = modelRef.current.model;  
        const labels = modelRef.current.labels;

        const imgElement = new Image();
        imgElement.src = image.preview;
        await imgElement.decode(); // Very essential, affects model's performance

        const processedImg = img.prepare(imgElement, IMG_SHAPE);
        const pred = img.classify(md, processedImg);
        const topK = await img.topKPred(pred, 3);

        topK.forEach(({ i, prediction }) =>
          console.log(
            `Label: ${labels[i]}, Confidence score: ${(
              prediction * 100
            ).toFixed(2)}%`
          )
        );

        console.log('onDrop')

        setImage(newImage)
      }
    },
  });

  let isImageUploaded = !!Object.keys(image).length;

  useEffect(() => {
    const loadModel = async function () {
      const modelUrl = "/model/model.json";
      const model = await tf.loadGraphModel(modelUrl);

      modelRef.current.model = model;
    };

    const loadLabels = async function () {
      const path = "/model/meta/labels.txt";
      const res = await fetch(path);
      const content = await res.text();
      const labels = content
        .split("\n")
        .map((str) => str.trim())
        .filter(Boolean);

      modelRef.current.labels = labels;
    };

    loadModel();
    loadLabels();
    console.log('effect')
  }, []);

  return (
    <div
      {...getRootProps()}
      className="duration-150 ease-in text-[#999] flex flex-col gap-4 text-sm items-center border-2 border-dashed border-[#eeeeee] bg-[#fafafa] rounded-xl p-8 text-center hover:border-blue-500 transition cursor-pointer shadow-sm"
    >
      <input {...getInputProps()} />
      {isImageUploaded ? (
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
      ) : (
        <>
          <Upload size={48} />
          <p>Drag a single food image here, or click to browse</p>
        </>
      )}
    </div>
  );
}
