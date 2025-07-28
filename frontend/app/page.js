import GetNFactsButton from "@/components/customs/getNFacts-button";
import ImageDropzone from "@/components/customs/image-dropzone";
import MacroDonutChart from "@/components/customs/macros";
import ServingSizeInput from "@/components/customs/serving-size";

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const urlSearchParams = new URLSearchParams(searchParams);
  const res = await fetch(
    "http://localhost:5000/api/macros" + "?" + urlSearchParams.toString()
  );
  const data = await res.json();

  // console.log(data);

  return (
    <div className="bg-[url(/bg-img.png)] bg-[#f4fcfc]">
      <main className="mx-auto border border-t-0 bg-white px-10 shadow-2xl py-4 w-fit flex flex-col gap-12 min-h-screen">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl/12 font-bold tracking-wide">
            Instant Food Facts - Just Take a Photo
          </h1>
          <p className="text-sm text-gray-500">See It. Snap It. Know It.</p>
          <div className="pt-2">
            <ServingSizeInput />
          </div>
          <div>
            <p className="mb-4">Image: </p>
            <ImageDropzone />
          </div>
          <GetNFactsButton />
        </div>

        <section className="flex flex-col gap-4">
          <h1 className="font-bold tracking-wide text-2xl">Results: </h1>
          <article className="flex flex-col gap-4">
            <h1>
              Macros for{" "}
              {`${searchParams.size || 1} plate of ${
                searchParams.fClass || "Pizza"
              }`}
            </h1>
            <MacroDonutChart data={data} servingSize={searchParams.size} />
            <p>
              Calorie intake:{" "}
              <span className="font-bold">
                {data.macros["calories"].value} calories
              </span>
            </p>
          </article>
          <article>
            <h1>Ingredients</h1>
          </article>
        </section>
      </main>
    </div>
  );
}
