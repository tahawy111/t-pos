"use client";
import { useSession } from "next-auth/react";
import {
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  useState,
  useContext,
} from "react";

interface SignupContextInterface {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  onHandleNext: () => void;
  onHandleBack: () => void;
  accountInfo: IUserPropsContext;
  setAccountInfo: Dispatch<SetStateAction<IUserPropsContext>>;
  companyInfo: ICompanyPropsContext;
  setCompanyInfo: Dispatch<SetStateAction<ICompanyPropsContext>>;
}

export interface IUserPropsContext {
  name: string;
  email: string;
  password: string;
}

export interface ICompanyPropsContext {
  name: string;
  email: string;
  address: string;
  numbers: string;
  currency: string;
}

export const SignupContext = createContext<SignupContextInterface>({
  step: 1,
} as unknown as SignupContextInterface);

export function SignupContextProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1);
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [companyInfo, setCompanyInfo] = useState<ICompanyPropsContext>({
    name: "",
    email: "",
    address: "",
    numbers: "",
    currency: "",
  });
  const onHandleNext = () => setStep((prev) => prev + 1);
  const onHandleBack = () => setStep((prev) => prev - 1);

  return (
    <SignupContext.Provider
      value={{
        step,
        setStep,
        onHandleNext,
        onHandleBack,
        accountInfo,
        setAccountInfo,
        companyInfo,
        setCompanyInfo,
      }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export function useSignupContext() {
  return useContext(SignupContext);
}
