"use client";
import ImageDropzone from "@/components/customs/image-dropzone";
import MacroDonutChart from "@/components/customs/macros";
import { Button } from "@/components/ui/button";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useRef } from "react";

export default function Page() {
  const imageRef = useRef(null);

  useEffect(() => {
    const run = async () => {
      // Load model
      const model = await tf.loadGraphModel("/model/model.json");
      console.log("Model loaded");

      const imageElement = imageRef.current;
      if (!imageElement.complete) {
        await new Promise((resolve) => {
          imageElement.onload = resolve;
        });
      }

      const imgTensor = tf.browser
        .fromPixels(imageElement)
        .resizeBilinear([224, 224])
        .toFloat()
        .div(127.5)
        .sub(1)
        .expandDims();

      // Make prediction
      const predictions = model.predict(imgTensor);
      // predictions.print();
      // const highestIndex = predictions.argMax(-1).arraySync()[0]; // Get top class
      // console.log(imgTensor);
      const labels = await loadLabels();
      // console.log(labels[highestIndex]);

      let topPred = await predictions.data();
      topPred = [...topPred]
        .map((predictions, i) => ({ i, predictions }))
        .sort((a, b) => b.predictions - a.predictions)
        .slice(0, 3);
      console.log(topPred);

      topPred.forEach(({ i, predictions }) => {
        console.log(
          `Label: ${labels[i]}, Confidence score ${(predictions * 100).toFixed(
            2
          )}%`
        );
      });
    };

    run();

    const loadLabels = async function () {
      const res = await fetch("/model/meta/labels.txt");
      const text = await res.text();
      const labels = text
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      return labels;
    };
  }, []);
  return (
    <div className="bg-[url(/bg-img.png)] bg-[#f4fcfc];">
      <main className="mx-auto border border-t-0 bg-white px-10 shadow-2xl py-4 w-fit flex flex-col gap-12 min-h-screen">
        <div className="flex flex-col gap-4">
          <div>
            <img
              ref={imageRef}
              src="/chicken_curry.jpg"
              alt="Test Image"
              crossOrigin="anonymous"
              width={224}
              height={224}
              style={{ display: "none" }}
            />
          </div>

          <h1 className="text-2xl/12 font-bold tracking-wide">
            Instant Food Facts - Just Take a Photo
          </h1>
          <p className="text-sm text-gray-500">See It. Snap It. Know It.</p>
          <div className="pt-2">
            <span>Serving size: </span>
            <input
              type="number"
              name="serving_size"
              className="border rounded p-1"
            />
          </div>
          <div>
            <p className="mb-4">Image: </p>
            <ImageDropzone />
          </div>
          <Button className="bg-blue-500 py-5 text-lg tracking:wider hover:bg-blue-500 hover:shadow-lg text-white cursor-pointer">
            Get nutritional facts
          </Button>
        </div>

        <section className="flex flex-col gap-4">
          <h1 className="font-bold tracking-wide text-2xl">Results: </h1>
          <article className="flex flex-col gap-4">
            <h1>Macros</h1>
            <MacroDonutChart />
            <p>Calorie intake:</p>
          </article>
          <article>
            <h1>Ingredients</h1>
          </article>
        </section>
      </main>
    </div>
  );
}
