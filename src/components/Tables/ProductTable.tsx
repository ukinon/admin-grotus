"use client";

import Image from "next/image";
import { Product } from "@/types/product";
import { useGetQuery } from "@/hooks/queries/useGetQuery";
import { getProducts } from "@/api/products";
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

export const pageQueryParams = "page";

const ProductTable = () => {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search),
  );
  const currentPage = parseInt(searchParams.get(pageQueryParams) || "1", 10);

  const query = `?perPage=5&page=${currentPage}`;
  const { data, isLoading } = useGetQuery({
    queryFn: async () => await getProducts(query),
    queryKey: ["get-products", query],
  });
  const { deleteMutation, deleteIsPending } = useDelete({
    path: "products",
    queryKey: [["get-products"]],
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
    <div className="w-full rounded-sm border border-stroke bg-white pb-8 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {isLoading && <Loader />}
        {deleteIsPending && <LoadingPage />}
      </div>
      {!isLoading && (
        <>
          <div className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark  md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Product Name</p>
            </div>
            <div className="col-span-3 flex items-center">
              <p className="font-medium">Description</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Price</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Stock</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Action</p>
            </div>
          </div>

          {data?.data.data.map((product: Product, key: number) => (
            <div
              className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
              key={key}
            >
              <div className="col-span-2 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12.5 w-15 rounded-md">
                    <Image
                      src={
                        (product.photo as string) ||
                        "https://via.placeholder.com/150"
                      }
                      width={60}
                      height={50}
                      alt="Product"
                    />
                  </div>
                  <p className="text-sm text-black dark:text-white">
                    {product.name}
                  </p>
                </div>
              </div>
              <div className="col-span-3 hidden items-center sm:flex">
                <p className="text-sm text-black dark:text-white">
                  {product.description}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm text-black dark:text-white">
                  {formatToIDR(product.price as number)}
                </p>
              </div>
              <div className="col-span-1 flex items-center text-center">
                <p className="text-sm text-black dark:text-white">
                  {product.stock}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <div className="flex flex-row gap-2">
                  <PiPencil className="text-blue-500" />
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <PiTrash className="text-red" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You will delete {product.name}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-3">
                        <AlertDialogCancel className="bg-green-500 text-white">
                          No
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(product.id as number)}
                          className="text-primary-500 border-primary-500 border"
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

export default ProductTable;
