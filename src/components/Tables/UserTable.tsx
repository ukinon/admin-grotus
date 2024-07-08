import Image from "next/image";
import { Product } from "@/types/product";
import { User } from "@/types/user";

const userData: User[] = [
  {
    id: 1,
    profile_photo: "/images/product/product-01.png",
    name: "User 1",
    email: "user@gmail.com",
    address: "pkfpafapjf",
    phone: "089109283908",
  },
];

const UserTable = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">User Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Address</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Phone</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Email</p>
        </div>
      </div>

      {userData.map((user, key) => (
        <div
          className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={user.profile_photo}
                  width={60}
                  height={50}
                  alt="user"
                />
              </div>
              <p className="text-sm text-black dark:text-white">{user.name}</p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{user.address}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{user.phone}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserTable;
