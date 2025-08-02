"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function GetNFactsButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleClick = function () {
    if (!searchParams || !searchParams.get("fClass")) {
      //throw error
      toast(
        "Please upload a single image, and select a food from the list of predictions that appears."
      );
      return;
    }
    console.log(searchParams);
    router.replace(`${pathname}?${searchParams.toString()}`, {scroll: false});
  };

  return (
    <Button
      onClick={handleClick}
      className="bg-blue-500 py-5 text-lg tracking:wider hover:bg-blue-500 hover:shadow-lg text-white cursor-pointer"
    >
      Get nutritional facts
    </Button>
  );
}
