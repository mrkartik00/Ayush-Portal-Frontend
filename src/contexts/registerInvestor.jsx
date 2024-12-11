import { createContext, useContext, useState } from "react";

const RegisterInvestorContext = createContext();

export const RegisterInvestorContextProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [totalData, setTotalData] = useState({
    personal: {
      data: {},
      status: "pending",
    },
    organization: { data: {}, status: "pending" },
    financial: { data: {}, status: "pending" },
    banking: { data: {}, status: "pending" },
    reviewd: { status: "pending" },
  });

  return (
    <RegisterInvestorContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        totalData,
        setTotalData,
        completedSteps,
        setCompletedSteps,
      }}
    >
      {children}
    </RegisterInvestorContext.Provider>
  );
};

export function useRegisterInvestorContext() {
  return useContext(RegisterInvestorContext);
}
