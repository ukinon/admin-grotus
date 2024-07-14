import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductTable from "@/components/Tables/ProductTable";
import FormButton from "@/components/ui/form-button";
import ProductForm from "@/components/Forms/ProductForm";

export const metadata: Metadata = {
  title: "Products | Grotus Admin",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ProductsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />

      <div className="flex h-screen w-full flex-col gap-5">
        <div className="w-1/6 self-end">
          <FormButton
            buttonText="Add Product"
            dialogTItle="Add Product"
            dialogContent={<ProductForm />}
          />
        </div>
        <ProductTable />
      </div>
    </DefaultLayout>
  );
};

export default ProductsPage;
