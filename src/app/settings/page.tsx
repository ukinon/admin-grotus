import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableTwo from "@/components/Tables/TableTwo";
import NutritionTable from "@/components/Tables/NutritionTable";

export const metadata: Metadata = {
  title: "Next.js Settings | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Settings" />

      <div className="flex h-screen flex-col gap-10">
        <NutritionTable />
      </div>
    </DefaultLayout>
  );
};

export default Settings;
