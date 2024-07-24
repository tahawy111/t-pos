"use client";
import { useCallback, useEffect, useState, useContext } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import axios from "axios";
import {
  ICompanyPropsContext,
  useSignupContext,
} from "../contexts/SignupContext";

interface AuthFormProps {}

export default function CompanySignupForm({}: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { setCompanyInfo, onHandleBack, companyInfo, accountInfo } =
    useSignupContext();
  const { register, handleSubmit } = useForm<ICompanyPropsContext>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setCompanyInfo((prev) => ({ ...prev, ...data }));
    setIsLoading(true);
    // Register

    axios
      .post("/api/register", { accountInfo, companyInfo })
      .then(() => {
        toast.success("Registerd has been done successfully, return to login");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="dark:bg-[#27282d] px-4 py-8 shadow sm:rounded-lg sm:px-10 gap-y-3 flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="name">Company Name</label>
            <Input
              defaultValue={companyInfo.name}
              placeholder="Company Name"
              type="text"
              id="name"
              {...register("name")}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email">Company Email</label>
            <Input
              defaultValue={companyInfo.email}
              placeholder="Company Email"
              type="email"
              id="email"
              disabled={isLoading}
              {...register("email")}
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="email">Address</label>
            <Input
              defaultValue={companyInfo.address}
              placeholder="Address"
              type="text"
              id="address"
              disabled={isLoading}
              {...register("address")}
            />
          </div>

          <div className="flex justify-between w-full mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <Button variant={"secondary"} onClick={() => onHandleBack()}>
              Back
            </Button>
            <Button variant={"rose"}>Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
