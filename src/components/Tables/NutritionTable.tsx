"use client";

import Image from "next/image";
import { useGetQuery } from "@/hooks/queries/useGetQuery";
import { getTransactions } from "@/api/transactions";
import Loader from "../common/Loader";
import DynamicPaginator from "./DynamicPaginator";
import { formatToIDR } from "@/lib/formatToIDR";
import { useState } from "react";
import { PiPencil, PiTrash } from "react-icons/pi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useDelete } from "@/hooks/queries/useDeleteQuery";
import LoadingPage from "../common/LoadingPage";
import { Transaction } from "@/types/transaction";
import { getNutritionTypes } from "@/api/nutritionTypes";
import { NutritionType } from "@/types/product";

export const pageQueryParams = "page";

const NutritionTable = () => {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search),
  );
  const currentPage = parseInt(searchParams.get(pageQueryParams) || "1", 10);

  const query = `?perPage=5&page=${currentPage}`;
  const { data, isLoading } = useGetQuery({
    queryFn: async () => await getNutritionTypes(query),
    queryKey: ["get-nutrition-types", query],
  });
  const { deleteMutation, deleteIsPending } = useDelete({
    path: "nutrition-types",
    queryKey: [["get-nutrition-types"]],
  });

  const onPageChange = (page: number) => {
    const newQueryParameters = new URLSearchParams(window.location.search);
    newQueryParameters.set(pageQueryParams, page.toString());
    setSearchParams(newQueryParameters);
    window.history.pushState(null, "", `?${newQueryParameters.toString()}`);
  };

  const handleDelete = async (id: number) => {
    await deleteMutation(id);
  };
  return (
    <div className="flex w-full flex-col gap-2 rounded-sm border border-stroke bg-white pb-8 shadow-default dark:border-strokedark dark:bg-boxdark">
      <h1 className="px-3 py-2 pt-5 text-2xl font-bold dark:text-white">
        Nutrition Types
      </h1>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {isLoading && <Loader />}
        {deleteIsPending && <LoadingPage />}
      </div>
      {!isLoading && (
        <>
          <div className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 dark:border-strokedark  md:px-6 2xl:px-7.5">
            <div className="col-span-8 flex items-center">
              <p className="font-medium">Name</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Actions</p>
            </div>
          </div>

          {data?.data.data.map((nutrition: NutritionType, key: number) => (
            <div
              className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 text-xs dark:border-strokedark md:px-6 2xl:px-7.5"
              key={key}
            >
              <div className="col-span-8 flex items-center">
                <p className="text-xs text-black dark:text-white">
                  {nutrition.name}
                </p>
              </div>

              <div className="col-span-1 flex items-center">
                <div className="flex flex-row gap-2">
                  <PiPencil className="text-base text-blue-500" />
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <PiTrash className="text-base text-red" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You will delete {nutrition.name}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-3">
                        <AlertDialogCancel className="bg-green-500 text-black">
                          No
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(nutrition.id as number)}
                          className="border border-primary bg-transparent text-primary"
                        >
                          Yes
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          ))}
          <DynamicPaginator
            totalPages={data?.data.last_page}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

export default NutritionTable;
