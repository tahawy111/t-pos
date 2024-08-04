"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import ModalProvider from "./modal-provider";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <ModalProvider />
        <Toaster toastOptions={{ duration: 5000 }} />
        {children}
      </SessionProvider>
    </>
  );
}

export default Providers;
