"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <Toaster toastOptions={{ duration: 5000 }} />
        {children}
      </SessionProvider>
    </>
  );
}

export default Providers;
