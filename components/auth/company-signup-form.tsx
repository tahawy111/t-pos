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
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ICompanyPropsContext>();

  const name = watch("name");
  const email = watch("email");
  const address = watch("address");
  const numbers = watch("numbers");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setCompanyInfo((prev) => ({ ...prev, ...data }));
    setIsLoading(true);
    // Register

    axios
      .post("/api/register", { accountInfo, companyInfo: data })
      .then(() => {
        toast.success("Registerd has been done successfully, Please login!");
        router.push("/login")
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="dark:bg-[#27282d] px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form
          className="flex flex-col gap-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-y-0.5">
            <label htmlFor="name">Company Name</label>
            <Input
              defaultValue={companyInfo.name}
              placeholder="Company Name"
              type="text"
              id="name"
              {...register("name", { required: "Company Name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-y-0.5">
            <label htmlFor="email">Company Email</label>
            <Input
              defaultValue={companyInfo.email}
              placeholder="Company Email"
              type="email"
              id="email"
              disabled={isLoading}
              {...register("email", { required: "Company Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-y-0.5">
            <label htmlFor="email">Address</label>
            <Input
              defaultValue={companyInfo.address}
              placeholder="Address"
              type="text"
              id="address"
              disabled={isLoading}
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <span className="text-red-500 text-xs">
                {errors.address.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-y-0.5">
            <label htmlFor="email">
              Phone Numbers
              <span className="text-red-400/90 text-xs">(Comma separated)</span>
            </label>
            <div className="">
              <Input
                defaultValue={companyInfo.numbers}
                placeholder="Phone Numbers (Comma separated)"
                type=""
                id="numbers"
                disabled={isLoading}
                {...register("numbers", {
                  required: "Phone numbers are required",
                })}
              />
              {errors.numbers && (
                <span className="text-red-500 text-xs">
                  {errors.numbers.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-between w-full mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <Button
              variant={"secondary"}
              onClick={() => {
                setCompanyInfo((prev) => {
                  if (!name || !email || !address || !numbers) return prev;
                  return {
                    ...prev,
                    ...{ name, email, address, numbers },
                  };
                });
                onHandleBack();
              }}
            >
              Back
            </Button>
            <Button variant={"rose"}>Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
