import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TransactionTable from "@/components/Tables/TransactionTable";

export const metadata: Metadata = {
  title: "Transactions | Grotus Admin",
};

const TablesPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Transactions" />

      <div className="flex h-screen flex-col gap-10">
        <TransactionTable />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
