import GetNFactsButton from "@/components/customs/getNFacts-button";
import ImageDropzone from "@/components/customs/image-dropzone";
import MacroDonutChart from "@/components/customs/macros";
import ServingSizeInput from "@/components/customs/serving-size";
import { notFound } from "next/navigation";
import { Info } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

async function getData(url) {
  const res = await fetch(url);

  if (!res.ok) {
    const err = new Error(
      `API returned status code ${res.status}: Please check the food name well.`
    );
    err.status = res.status;
    throw err;
  }

  return res.json();
}

export default async function Page(props) {
  const searchParams = await props.searchParams;
  const { fClass, size } = searchParams;

  let macros, ingredients;
  try {
    if (fClass) {
      const params = new URLSearchParams({ ...searchParams }).toString();
      const ingredientsUrl =
        "http://localhost:5000/api/ingredients/" + "?" + params;
      const macrosUrl = "http://localhost:5000/api/macros/" + "?" + params;
      [macros, { ingredients }] = await Promise.all([
        getData(macrosUrl),
        getData(ingredientsUrl),
      ]);
    }
  } catch (err) {
    if (err.status === 404) {
      return notFound();
    }
    throw err;
  }
  // const searchParams = await props.searchParams;
  // const urlSearchParams = new URLSearchParams(searchParams);
  // const macrosRes = await fetch(
  //   "http://localhost:5000/api/macros" + "?" + urlSearchParams.toString()
  // );
  // const ingredientRes = await fetch(
  //   "http://localhost:5000/api/ingredients" + "?" + urlSearchParams.toString()
  // );
  // const [macros, { ingredients }] = await Promise.all([
  //   macrosRes.json(),
  //   ingredientRes.json(),
  // ]);

  console.log("from page", macros);

  return (
    <div className="bg-[url(/bg-img.png)] bg-[#f4fcfc]">
      <main className="mx-auto border border-t-0 bg-white px-10 shadow-2xl py-4 w-fit flex flex-col gap-12 min-h-screen">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl/12 font-bold tracking-wide">
            Instant Food Facts - Just Upload a Photo
          </h1>
          <p className="text-sm text-gray-500">Snap It. Upload It. Know It.</p>
          <div className="pt-2">
            <ServingSizeInput />
          </div>
          <div>
            <p className="mb-4">Image: </p>
            <ImageDropzone />
          </div>
          <GetNFactsButton />
        </div>

        {macros ? (
          <section className="flex flex-col gap-4">
            <h1 id="result" className="font-bold tracking-wide text-2xl">
              Results:{" "}
            </h1>
            <article className="flex flex-col gap-4">
              <h1>
                Macros for{" "}
                {`${searchParams?.size || 1} plate of ${
                  searchParams?.fClass || "%food_name%"
                }`}
              </h1>
              <MacroDonutChart data={macros} servingSize={searchParams.size} />
              <p>
                Calorie intake:{" "}
                <span className="font-bold">
                  {macros?.macros["calories"]?.value *
                    (searchParams.size || 1) || 0}{" "}
                  calories
                </span>
              </p>
            </article>
            <article>
              {/* <h1 className=" leading-10">Ingredients</h1> */}
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className={"text-md"}>
                    Ingredients
                  </AccordionTrigger>
                  <AccordionContent>
                    {ingredients ? (
                      <ol className="list-decimal list-inside">
                        {ingredients.map((ingredient, i) => {
                          let capitalizedStr = ingredient
                            .split(" ")
                            .map(
                              (str) =>
                                str.charAt(0).toUpperCase() + str.substring(1)
                            )
                            .join(" ");

                          return (
                            <li key={i} className="text-md leading-loose">
                              {capitalizedStr}
                            </li>
                          );
                        })}
                      </ol>
                    ) : (
                      <span className="text-red-500">
                        No ingredients found.Try uploading an image, and <br />{" "}
                        Selecting a food from the list that appears.
                      </span>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {/* {ingredients ? (
                <ol className="list-decimal list-inside">
                  {ingredients.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ol>
              ) : (
                <span className="text-red-500">
                  No food found. Upload an image, and <br /> Select a food from
                  the list that appears.
                </span>
              )} */}
            </article>
          </section>
        ) : (
          <article>
            <div className="flex gap-4 border rounded-3xl p-4 items-center">
              <Info size={52} color="#34b4eb" />
              <div>
                <h1 className="text-md font-bold leading-loose w-[400px]">
                  Discover Your Meal’s Macronutrient Profile
                </h1>
                <p className="text-sm text-gray-600 leading-relaxed w-[400px]">
                  <b>Upload</b> a meal photo, <b>select</b> the best AI
                  prediction, then <b>click </b>
                  Get Nutritional Facts. In seconds, receive a detailed
                  breakdown of macros and calories to optimize your diet!
                </p>
              </div>
            </div>
          </article>
        )}
      </main>
    </div>
  );
}
