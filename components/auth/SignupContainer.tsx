import { cn } from "@/lib/utils";
import { useSignupContext } from "../contexts/SignupContext";
import AccountSignupForm from "./account-signup-form";
import CompanySignupForm from "./company-signup-form";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

async function SignupContainer() {
  const { step, accountInfo, companyInfo } = useSignupContext();

  const session = await getServerSession();

  const user = await db.user.findFirst();

  if (user || session?.user) {
    redirect("/login");
  }

  return (
    <>

      <h1 className="text-center text-xl font-bold text-neutral-700/50 my-3">Register Proccess (For the first time only)</h1>

      <div className="flex items-center justify-center flex-col h-full">
        {/* Steps */}
        <nav aria-label="Progress" className="mt-6">
          <ol
            role="list"
            className="space-y-4 md:flex md:space-x-8 md:space-y-0"
          >
            <li className="md:flex-1">
              {/* <!-- Completed Step --> */}
              <a
                className={cn(
                  "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                  step >= 1 && "border-red-600"
                )}
              >
                <span
                  className={cn(
                    "text-sm font-medium",
                    step >= 1 && "text-red-600"
                  )}
                >
                  Step 1
                </span>
                <span className="text-sm font-medium">Account Information</span>
              </a>
            </li>
            <li className="md:flex-1">
              {/* <!-- Current Step --> */}
              <a
                className={cn(
                  "flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                  step >= 2 ? "border-red-600" : "border-gray-300"
                )}
                aria-current="step"
              >
                <span
                  className={cn(
                    "text-sm font-medium ",
                    step >= 2 ? "text-red-600" : "text-gray-600"
                  )}
                >
                  Step 2
                </span>
                <span className="text-sm font-medium">Company Information</span>
              </a>
            </li>
            {/* 

    <li className="md:flex-1">
    
      <a href="#" className="group flex flex-col border-l-4 border-black py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
      <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700">Step 3 / الخطوه 3</span>
      <span className="text-sm font-medium">Preview / معاينة</span>
      </a>
      </li>

      */}
          </ol>
        </nav>

        {step === 1 && <AccountSignupForm />}
        {step === 2 && <CompanySignupForm />}
      </div>
    </>
  );
}

export default SignupContainer;
