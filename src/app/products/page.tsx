import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductTable from "@/components/Tables/ProductTable";

export const metadata: Metadata = {
  title: "Products | Grotus Admin",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ProductsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />

      <div className="flex h-screen flex-col gap-10">
        <ProductTable />
      </div>
    </DefaultLayout>
  );
};

export default ProductsPage;
