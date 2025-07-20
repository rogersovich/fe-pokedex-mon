"use client";

import CustomImage from "@/components/CustomImage";
import { formatName } from "@/lib/string-formatter";
import type { ItemList } from "@/types/item";
import Link from "next/link";
import React from "react";
import { SimpleTable, HeaderObject, Theme, type Row } from "simple-table-core";
import "simple-table-core/styles.css";

interface Props {
  items: ItemList[];
  onTriggerLoadMore: () => void;
}

const generateImageItem = (name: string) => {
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${name}.png`;
  return image;
};

const headers: HeaderObject[] = [
  {
    accessor: "id",
    label: "ID",
    width: 80,
    isSortable: true,
    type: "number",
    align: "center",
  },
  {
    accessor: "name",
    label: "Name",
    width: 250,
    isSortable: true,
    type: "string",
    cellRenderer: ({ row, accessor }) => {
      const itemName = row[accessor] as string;
      const image = generateImageItem(itemName);
      return (
        <div className="flex items-center gap-2">
          <div className="w-[30px] h-[30px] relative">
            <CustomImage
              src={image}
              width={30}
              height={30}
              fill
              alt={itemName}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <Link
            href={`/item/${itemName}`}
            className="text-blue-500 font-bold hover:underline"
          >
            {formatName(itemName)}
          </Link>
        </div>
      );
    },
  },
  {
    accessor: "category",
    label: "Category",
    width: 150,
    isSortable: false,
    type: "string",
    cellRenderer: ({ row, accessor }) => {
      return <div>Category</div>;
    },
  },
  {
    accessor: "effect",
    label: "Effect",
    width: "1fr",
    isSortable: false,
    type: "string",
    cellRenderer: ({ row, accessor }) => {
      return <div>Effect</div>;
    },
  },
];

export default function ItemTable({ items, onTriggerLoadMore }: Props) {
  return (
    <SimpleTable
      defaultHeaders={headers}
      height={"500px"}
      rowIdAccessor="id"
      rows={items as unknown as Row[]}
      rowHeight={32}
      onLoadMore={() => {
        onTriggerLoadMore();
      }}
    />
  );
}
