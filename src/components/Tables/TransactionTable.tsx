"use client";

import { useGetQuery } from "@/hooks/queries/useGetQuery";
import { getTransactions } from "@/api/transactions";
import Loader from "../common/Loader";
import DynamicPaginator from "./DynamicPaginator";
import { useState } from "react";
import { PiTrash } from "react-icons/pi";
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

export const pageQueryParams = "page";

const TransactionTable = () => {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search),
  );
  const currentPage = parseInt(searchParams.get(pageQueryParams) || "1", 10);

  const query = `?perPage=5&page=${currentPage}`;
  const { data, isLoading } = useGetQuery({
    queryFn: async () => await getTransactions(query),
    queryKey: ["get-transactions", query],
  });
  const { deleteMutation, deleteIsPending } = useDelete({
    path: "transactions",
    queryKey: [["get-transactions"]],
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
          <div className="grid w-full grid-cols-9 border-t border-stroke px-4 py-4.5  dark:border-strokedark md:px-6 2xl:px-7.5">
            <div className="col-span-1 flex items-center">
              <p className="font-medium">User</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Address</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Products</p>
            </div>
            <div className="col-span-1 items-center sm:flex">
              <p className="font-medium">Payment</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Delivery</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Status</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Action</p>
            </div>
          </div>

          {data?.data.data.map((transaction: Transaction, key: number) => (
            <div
              className="grid grid-cols-9 border-t border-stroke px-4 py-4.5 text-xs dark:border-strokedark md:px-6 2xl:px-7.5"
              key={key}
            >
              <div className="col-span-1 flex items-center">
                <p className="text-xs text-black dark:text-white">
                  {transaction.name}
                </p>
              </div>
              <div className="col-span-2 flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="line-clamp-3 pr-8 text-xs text-black dark:text-white">
                  {transaction.address}
                </p>
              </div>
              <div className="col-span-2 hidden flex-row flex-wrap items-center gap-1 pr-3 sm:flex">
                {transaction.products?.map((product, index, array) => (
                  <p key={index} className="text-xs text-black dark:text-white">
                    {product.name}
                    {index < array.length - 1 ? "," + " " : ""}
                  </p>
                ))}
              </div>

              <div className="col-span-1 flex items-center">
                <p className="w-full text-xs text-black dark:text-white">
                  {transaction.payment_method}
                </p>
              </div>
              <div className="col-span-1 flex items-center text-center">
                <p className="text-xs text-black dark:text-white">
                  {transaction.delivery_method ?? "-"}
                </p>
              </div>
              <div className="col-span-1 flex items-center text-center">
                <p
                  className={`line-clamp-1 w-5/6 rounded-full px-2 py-1 text-[0.7rem] text-black ${(transaction.status == "Completed" && "bg-green-400") || (transaction.status == "Waiting For Payment" && "bg-red text-white") || (transaction.status == "Shipped" && "bg-yellow-400 text-black")}`}
                >
                  {transaction.status}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <div className="flex w-full flex-row gap-2">
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <PiTrash className="text-base text-red" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You will delete this transaction
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-3">
                        <AlertDialogCancel className="bg-green-500 text-black">
                          No
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(transaction.id as number)}
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

export default TransactionTable;
