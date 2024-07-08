import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import UserTable from "@/components/Tables/UserTable";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
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
