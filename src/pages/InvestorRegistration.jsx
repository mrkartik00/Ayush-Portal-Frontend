import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useRegisterInvestorContext } from "../contexts";

export default function RegisterInvestorPage() {
  const location = useLocation();
  const pathname = location.pathname;
  const currentURL = pathname.split("/").pop();
  const { currentStep, setCurrentStep, totalData } =
    useRegisterInvestorContext();

  const steps = [
    {
      name: "Personal Information",
      path: "personal",
      onClick: () => setCurrentStep(0),
      status: totalData.personal.status,
    },

    {
      name: "Financial Information",
      path: "financial",
      onClick: () => setCurrentStep(1),
      status: totalData.financial.status,
    },
    {
      name: "Banking Information",
      path: "banking",
      onClick: () => setCurrentStep(2),
      status: totalData.banking.status,
    },
    {
      name: "Review & Submit",
      path: "document",
      onClick: () => setCurrentStep(3),
      status: totalData.reviewd.status,
    },
  ];

  useEffect(() => {
    const step = steps.find((step) => step.path === (currentURL || "personal"));
    step?.onClick();
  }, [currentURL]);

  const stepElements = steps.map((step, index) => (
    <NavLink
      className="cursor-pointer flex flex-col items-center justify-center gap-2"
      key={step.name}
      to={step.path}
      onClick={step.onClick}
    >
      {/* Circle */}
      <div
        className={`rounded-full w-14 h-14 flex items-center justify-center text-lg font-semibold transition-all ${
          currentStep === index
            ? "bg-[#f68533] text-white shadow-lg scale-105"
            : step.status === "complete"
              ? "bg-green-600 text-white shadow-md"
              : "bg-[#f9f9f9] text-[#040606]"
        }`}
      >
        {index + 1}
      </div>

      {/* Step Name */}
      <div
        className={`text-[15px] font-medium text-center ${
          currentStep === index
            ? "text-[#f68533]"
            : step.status === "complete"
              ? "text-green-600"
              : "text-[#040606]"
        }`}
      >
        {step.name}
      </div>

      {/* Connecting Line */}
      {index < steps.length && (
        <div
          className={`w-full h-1 mt-2 ${
            step.status === "complete" ? "bg-green-400" : "bg-[#f9f9f9]"
          }`}
        />
      )}
    </NavLink>
  ));

  return (
    <div className="w-screen min-h-[calc(100vh-110px)] bg-[#fff7f2] flex flex-col items-center">
      {/* steps */}
      <div className="bg-[#ffd7bb] overflow-x-scroll drop-shadow-md p-4 w-full flex flex-col items-center justify-start gap-8">
        <h1 className="text-center font-semibold text-2xl drop-shadow-md">
          {steps[currentStep].name}
        </h1>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 w-full transition-all ease-in">
          {stepElements}
        </div>
      </div>

      {/* forms */}
      <div className="w-full p-4 flex items-center justify-center">
        <div className="bg-white max-w-xl w-full drop-shadow-md rounded-md flex items-center justify-center p-4 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
