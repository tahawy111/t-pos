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
import { IUserPropsContext, useSignupContext } from "../contexts/SignupContext";

interface AuthFormProps {}

export default function AccountSignupForm({}: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { setStep, setAccountInfo, accountInfo } = useSignupContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserPropsContext>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setStep((prev) => prev + 1);
    setAccountInfo((prev) => ({ ...prev, ...data }));
  };

  return (
    <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="dark:bg-[#27282d] px-4 py-8 shadow sm:rounded-lg sm:px-10 gap-y-3 flex flex-col">
        <form
          className="flex flex-col gap-y-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-y-0.5">
            <label htmlFor="name">Name</label>
            <Input
              defaultValue={accountInfo.name}
              placeholder="Name"
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-y-0.5">
            <label htmlFor="email">Email</label>
            <Input
              defaultValue={accountInfo.email}
              placeholder="Email"
              type="email"
              id="email"
              disabled={isLoading}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-y-0.5">
            <label htmlFor="password">Password</label>
            <Input
              defaultValue={accountInfo.password}
              placeholder="Password"
              type="password"
              id="password"
              disabled={isLoading}
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex justify-end w-full mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <Button>Next</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
