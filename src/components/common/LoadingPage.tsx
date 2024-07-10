import React from "react";

export default function LoadingPage() {
  return (
    <div className="absolute left-0 top-[50%] flex h-screen w-screen items-center justify-center bg-white dark:bg-black/10">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
}
