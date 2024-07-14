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
import { getUsers } from "@/api/users";
import { User } from "@/types/user";
import UserForm from "../Forms/UserForm";
import FormButton from "../ui/form-button";

export const pageQueryParams = "page";

const UserTable = () => {
  const [searchParams, setSearchParams] = useState(
    new URLSearchParams(window.location.search),
  );
  const currentPage = parseInt(searchParams.get(pageQueryParams) || "1", 10);

  const query = `?perPage=5&page=${currentPage}`;
  const { data, isLoading } = useGetQuery({
    queryFn: async () => await getUsers(query),
    queryKey: ["get-users", query],
  });
  const { deleteMutation, deleteIsPending } = useDelete({
    path: "users",
    queryKey: [["get-users"]],
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
              <p className="font-medium">User Name</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Email</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Address</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Role</p>
            </div>
            <div className="col-span-1 hidden items-center sm:flex">
              <p className="font-medium">Action</p>
            </div>
          </div>

          {data?.data.data.map((user: User, key: number) => (
            <div
              className="grid grid-cols-8 border-t border-stroke px-4 py-4.5 dark:border-strokedark md:px-6 2xl:px-7.5"
              key={key}
            >
              <div className="col-span-2 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12.5 w-15 rounded-md">
                    <Image
                      src={
                        (user.profile?.profile_photo as string) ||
                        "https://via.placeholder.com/150"
                      }
                      width={50}
                      height={50}
                      alt="user"
                      className="rounded-full"
                    />
                  </div>
                  <p className="text-xs text-black dark:text-white">
                    {user.profile?.name}
                  </p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-xs text-black dark:text-white">
                  {user.email}
                </p>
              </div>
              <div className="col-span-2 flex items-center">
                <p className="line-clamp-3 pr-12 text-xs text-black dark:text-white">
                  {user.profile?.address || "-"}
                </p>
              </div>
              <div className="col-span-1 flex items-center text-center">
                <p className="text-xs text-black dark:text-white">
                  {user.role}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <div className="flex flex-row gap-2">
                  <FormButton
                    buttonText={<PiPencil className="text-blue-500" />}
                    dialogContent={<UserForm data={user} />}
                    dialogTItle="Edit User"
                    variant="ghost"
                  />
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <PiTrash className="text-red" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You will delete {user.profile?.name}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-3">
                        <AlertDialogCancel className="bg-green-500 text-black">
                          No
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(user.id as number)}
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

export default UserTable;
