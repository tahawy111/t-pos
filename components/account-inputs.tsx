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

interface AuthFormProps {}

export default function AccountInputs({}: AuthFormProps) {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/");
        }
      })
      .finally(() => setIsLoading(false));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // Register

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Registerd has been done successfully");
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="dark:bg-[#27282d] px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Name"
            type="text"
            id="name"
            {...register("name", { required: true })}
          />
          <Input
            className={`${errors["email"] && "focus:ring-red-500"}`}
            placeholder="Email"
            type="email"
            id="email"
            disabled={isLoading}
            {...register("email", { required: true })}
          />
          <Input
            className={`${errors["password"] && "focus:ring-red-500"}`}
            placeholder="Password"
            type="password"
            id="password"
            disabled={isLoading}
            {...register("password", { required: true })}
          />

        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 items-center flex">
              <div className="w-full border-t border-gray-300" />
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500 dark:text-white">
          Already Have An Account?
          <div className="underline cursor-pointer">
            <Link href={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
