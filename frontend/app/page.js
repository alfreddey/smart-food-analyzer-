import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <main className="mx-auto py-4 w-fit flex flex-col gap-12 min-h-screen">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl/12 font-black tracking-wide">
          Instant Food Facts - Just Take a Photo
        </h1>
        <p className="text-sm text-gray-500">See It. Snap It. Know It.</p>
        <div className="pt-4">
          <span>Serving size: </span>
          <input
            type="number"
            name="serving_size"
            className="border rounded p-1"
          />
        </div>
        <div>
          <span>Image: </span>
          <input type="file" name="image" />
        </div>
        <Button className="bg-blue-500 py-5 text-lg tracking:wider hover:bg-blue-500 hover:shadow-lg text-white cursor-pointer">
          Get nutritional facts
        </Button>
      </div>

      <section className="flex flex-col gap-4">
        <h1>Results:</h1>
        <article>
          <h1>Macros</h1>
        </article>
        <article>
          <h1>Ingredients</h1>
        </article>
      </section>
    </main>
  );
}
