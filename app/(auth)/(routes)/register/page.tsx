import AccountInputs from "@/components/auth/account-signup-form";
import SignupContainer from "@/components/auth/signup-container";
import { SignupContextProvider } from "@/components/contexts/signup-context";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RegisterPage() {
  return (
    <SignupContextProvider>
      <SignupContainer />
    </SignupContextProvider>
  );
}
