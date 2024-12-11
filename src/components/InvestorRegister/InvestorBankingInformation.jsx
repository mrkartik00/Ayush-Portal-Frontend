import React, { useState, useEffect } from "react";

export default function InvestorBankingInformation() {
  // State for form fields
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountType: "",
    ifscCode: "",
    branchName: "",
    swiftCode: "",
    balanceStatement: null,
  });

  // State for tracking form validation
  const [isFormComplete, setIsFormComplete] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Validate form completeness
  const validateForm = () => {
    const requiredFields = [
      "bankName",
      "accountNumber",
      "accountType",
      "ifscCode",
      "branchName",
    ];
    const isComplete = requiredFields.every(
      (field) => formData[field]?.trim() !== "",
    );
    setIsFormComplete(isComplete);
  };
  useEffect(() => {
    const savedData = localStorage.getItem("InvestorBankingInformation");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Call validateForm on every change
  useEffect(() => {
    validateForm();
    localStorage.setItem(
      "InvestorBankingInformation",
      JSON.stringify(formData),
    );
  }, [formData]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete) {
      console.log("Form submitted successfully!");
      // Call onComplete function if needed to proceed to the next step.
    }
  };

  return (
    <div className="p-6 w-full bg-green-50 rounded-lg shadow-md border border-gray-200">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
        Banking Information
      </h2>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Bank Name */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Bank Name
            </label>
            <input
              type="text"
              name="bankName"
              placeholder="Enter bank name"
              value={formData.bankName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Account Number */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Account Number
            </label>
            <input
              type="text"
              name="accountNumber"
              placeholder="Enter account number"
              value={formData.accountNumber}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Account Type */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Account Type
            </label>
            <input
              type="text"
              name="accountType"
              placeholder="Enter account type (e.g., Checking, Savings)"
              value={formData.accountType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* IFSC Code */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              IFSC Code
            </label>
            <input
              type="text"
              name="ifscCode"
              placeholder="Enter IFSC code"
              value={formData.ifscCode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Branch Name */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Branch Name
            </label>
            <input
              type="text"
              name="branchName"
              placeholder="Enter branch name"
              value={formData.branchName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* SWIFT Code */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              SWIFT Code
            </label>
            <input
              type="text"
              name="swiftCode"
              placeholder="Enter SWIFT code"
              value={formData.swiftCode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`py-2 px-6 rounded-md font-semibold text-white ${
              isFormComplete
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormComplete}
          >
            Save Banking Information
          </button>
        </div>
      </form>
    </div>
  );
}
