"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import GlobalApi from "@/app/_utils/GlobalApi";
import { usePathname } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

function CategoryList() {
  const [categoryList, setCategoryList] = useState([]);
  const params = usePathname();
  const category = params.split("/")[2];

  useEffect(() => {
    getCategoryList();
    console.log(params);
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory()
      .then((resp) => {
        console.log(resp.data.data);
        setCategoryList(resp.data.data);
      })
      .catch((error) => {
        console.error("Error fetching category list:", error);
      });
  };

  return (
    <div className="h-screen  mt-5 flex flex-col">
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-hidden">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categoryList &&
              categoryList.map((item, index) => (
                <CommandItem key={index}>
                  <Link
                    href={`/search/${item.Name}`}
                    className={`p-2 flex gap-2 text-[14px] text-red-600 items-center rounded-md cursor-pointer w-full
                  ${category && category == item.Name && "bg-red-600 text-white"}`}
                  >
                    <Image
                      src={item.Icon[0].url}
                      alt="logo"
                      width={25}
                      height={25}
                    />
                    <label>{item.Name}</label>
                  </Link>
                </CommandItem>
              ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

export default CategoryList;
