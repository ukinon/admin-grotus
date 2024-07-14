import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import NutritionTable from "@/components/Tables/NutritionTable";
import FormButton from "@/components/ui/form-button";
import NutritionForm from "@/components/Forms/NutritionForm";

export const metadata: Metadata = {
  title: "Settings | Grotus Admin",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Settings" />

      <div className="flex h-screen flex-col gap-5">
        <NutritionTable />
      </div>
    </DefaultLayout>
  );
};

export default Settings;
