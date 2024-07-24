"use client";

import AccountInputs from "@/components/auth/account-inputs";
import SignupContainer from "@/components/auth/SignupContainer";
import { SignupContextProvider } from "@/components/contexts/SignupContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RegisterPage() {
  return (
    <SignupContextProvider>
      <SignupContainer />
    </SignupContextProvider>
  );
}
