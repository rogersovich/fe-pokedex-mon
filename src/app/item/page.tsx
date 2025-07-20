import { getItemList } from "@/lib/api/item";
import Image from "next/image";
import type { BaseResponse } from "@/types/base";
import type { BaseItemList } from "@/types/item";
import type { Metadata } from "next";
import Link from "next/link";
import ClientPageWrapper from "./components/ClientPageWrapper";

export const metadata: Metadata = {
  title: "Home",
  description: "...",
};

// Define a default limit for your API calls
const LIMIT = 50;
const OFFSET = 0;

export default async function ItemPage() {
  let itemRes: BaseResponse<BaseItemList> | null = null;
  let itemErr: string | null = null;

  try {
    const [data] = await Promise.all([
      getItemList({ offset: OFFSET, limit: LIMIT }),
    ]);

    itemRes = data;
  } catch (err) {
    if (err instanceof Error) {
      itemErr = err.message;
    } else {
      itemErr = "An unknown error occurred while fetching items.";
    }
  }

  return (
    <>
      {itemErr ? (
        <div className="col-span-12">
          <div className="base-card flex flex-col items-center justify-center gap-2">
            <Image
              src="/images/error-icon.png"
              alt="error"
              width={50}
              height={50}
              quality={100}
            />
            <div className="text-center text-red-500 text-4xl font-bold mb-2">
              Opps!
            </div>
            <div className="text-center text-xl">Something went wrong</div>
          </div>
        </div>
      ) : (
        <>
          <div className="base-card">
            <div className="text-4xl font-bold text-center mt-3 mb-6">
              Pokémon item list
            </div>
            <div className="bg-slate-100 p-4 rounded mb-4">
              <div>
                This is a full list of every Pokémon item from all 9 generations
                of the game series. Items from the Key pocket of the bag (such
                as the Bike or Super Rod) are listed on the separate
                <Link href={"/"} className="text-blue-500 hover:underline">
                  {" "}
                  key items page.
                </Link>
              </div>
              <br />
              <div>
                Click an item name to see even more detailed information. You
                can click a column heading to instantly sort by that column, or
                type in the box to filter the items.
              </div>
            </div>
            <ClientPageWrapper
              itemDataSSR={itemRes}
              itemError={itemErr}
            ></ClientPageWrapper>
          </div>
        </>
      )}
    </>
  );
}
