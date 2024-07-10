"use client";

import React from "react";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const isBrowser = typeof window !== "undefined";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: isBrowser ? window.location.hostname : "",
  cookieSecure: isBrowser ? window.location.protocol === "https:" : false,
});

const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
};

export default Providers;
