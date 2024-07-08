import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserTable from "@/components/Tables/UserTable";

export const metadata: Metadata = {
  title: "Users | Grotus Admin",
};

const UsersPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />

      <div className="flex h-screen flex-col gap-10">
        <UserTable />
      </div>
    </DefaultLayout>
  );
};

export default UsersPage;
