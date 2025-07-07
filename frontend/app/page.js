import ImageDropzone from "@/components/customs/image-dropzone";
import MacroDonutChart from "@/components/customs/macros";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="bg-[url(/bg-img.png)] bg-[#f4fcfc]">
      <main className="mx-auto border border-t-0 bg-white px-10 shadow-2xl py-4 w-fit flex flex-col gap-12 min-h-screen">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl/12 font-black tracking-wide">
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
