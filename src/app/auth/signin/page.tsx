import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Next.js SignIn Page | Grotus Admin - Next.js Dashboard Template",
  description: "This is Next.js Signin Page Grotus Admin Dashboard Template",
};

const SignIn: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-2">
      <div className="w-[90%] rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <h1 className="text-4xl font-bold text-primary">Grotus</h1>

              <p className="text-xl text-secondary 2xl:px-20">
                Grow your <span className="text-primary">Lettuce</span> with us!
              </p>

              <span className="mt-8 inline-block">
                <Image
                  src={"/images/logo/grotusIcon.png"}
                  width={200}
                  height={200}
                  className="w-full"
                  alt="Grotus Logo"
                />
              </span>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign In to Grotus Admin
              </h2>

              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
