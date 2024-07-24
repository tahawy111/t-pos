import { useSignupContext } from "../contexts/SignupContext";
import AccountInputs from "./account-inputs";

function SignupContainer() {
  const { step } = useSignupContext();
  return (
    <>
      <div className="flex items-center justify-center flex-col h-full">
        {/* Steps */}
        <nav aria-label="Progress" className="my-6">
          <ol
            role="list"
            className="space-y-4 md:flex md:space-x-8 md:space-y-0"
          >
            <li className="md:flex-1">
              {/* <!-- Completed Step --> */}
              <a className="group flex flex-col border-l-4 border-red-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-red-600 group-hover:text-red-800">
                  Step 1
                </span>
                <span className="text-sm font-medium">Account Information</span>
              </a>
            </li>
            <li className="md:flex-1">
              {/* <!-- Current Step --> */}
              <a
                className="flex flex-col border-l-4 border-gray-300 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                aria-current="step"
              >
                <span className="text-sm font-medium text-gray-600">
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

        {step === 1 && <AccountInputs />}
      </div>
    </>
  );
}

export default SignupContainer;
