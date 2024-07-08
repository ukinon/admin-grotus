import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import NutritionTable from "@/components/Tables/NutritionTable";

export const metadata: Metadata = {
  title: "Settings | Grotus Admin",
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
