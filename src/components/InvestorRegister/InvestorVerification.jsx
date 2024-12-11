import React, { useState, useEffect } from "react";

export default function InvestorVerification() {
  // State for form fields
  const [formData, setFormData] = useState({
    revenue: "",
    netWorth: "",
    businessLicenseNumber: "",
    taxPayerIdentification: "",
    govtIssuedIdentification: { type: "", typeValue: "" },
  });

  const [investorTypeData, setInvestorTypeData] = useState("");

  const govtIdentification = [
    { value: "drivingLicense", label: "Driving License" },
    { value: "aadhaarCard", label: "Aadhaar Card" },
    { value: "passport", label: "Passport" },
    { value: "voterId", label: "Voter ID" },
  ];

  // State for tracking form validation
  const [isFormComplete, setIsFormComplete] = useState(false);

  // Handle input changes for general fields
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // Handle changes for govtIssuedIdentification fields
  const handleGovtIssuedIdentificationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      govtIssuedIdentification: {
        ...prevData.govtIssuedIdentification,
        [name]: value,
      },
    }));
  };

  // Validate form completeness
  const validateForm = () => {
    const requiredFields = [
      "revenue",
      "netWorth",
      "taxPayerIdentification",
      "govtIssuedIdentification.type",
      "govtIssuedIdentification.typeValue",
    ];
    const isComplete = requiredFields.every((field) => {
      const [parent, child] = field.split(".");
      return child
        ? formData[parent]?.[child]?.trim() !== ""
        : formData[field]?.trim() !== "";
    });
    setIsFormComplete(isComplete);
  };

  // Fetch saved data and investor type
  useEffect(() => {
    const savedData = localStorage.getItem("InvestorVerification");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    const investorData = JSON.parse(
      localStorage.getItem("InvestorPersonalInformation"),
    );
    setInvestorTypeData(investorData?.investorType || "");
  }, []);

  // Validate form on change
  useEffect(() => {
    validateForm();
    localStorage.setItem("InvestorVerification", JSON.stringify(formData));
  }, [formData]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete) {
      console.log("Form submitted successfully!");
    }
  };

  return (
    <div className="p-6 w-full bg-blue-50 rounded-lg shadow-md border border-gray-200">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Financial Information
      </h2>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Revenue */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Revenue
            </label>
            <input
              type="text"
              name="revenue"
              placeholder="Enter Revenue"
              value={formData.revenue}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Net Worth */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Net Worth (in Crores)
            </label>
            <input
              type="number"
              name="netWorth"
              placeholder="Enter Net Worth in Crores"
              value={formData.netWorth}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Conditional Fields */}
        {investorTypeData === "Institutional" ? (
          <div className="flex items-center space-x-3">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Business License Number (optional)
              </label>
              <input
                type="number"
                name="businessLicenseNumber"
                placeholder="Enter License Number"
                value={formData.businessLicenseNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        ) : null}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              {investorTypeData === "Institutional"
                ? "Tax Registration Number or VAT/GST Number"
                : " PAN or Equivalent ID"}
            </label>
            <input
              type="number"
              name="taxPayerIdentification"
              placeholder={
                investorTypeData === "Institutional"
                  ? " enter TRN or GST Number"
                  : "Enter PAN/Equivalent ID"
              }
              value={formData.taxPayerIdentification}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Government ID */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Government Issued Identification
            </label>
            <select
              name="type"
              value={formData.govtIssuedIdentification.type}
              onChange={handleGovtIssuedIdentificationChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Government ID</option>
              {govtIdentification.map((govtId) => (
                <option key={govtId.value} value={govtId.value}>
                  {govtId.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="typeValue"
              placeholder={`Enter ${formData.govtIssuedIdentification.type || "ID"} Number`}
              value={formData.govtIssuedIdentification.typeValue}
              onChange={handleGovtIssuedIdentificationChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`py-2 px-6 rounded-md font-semibold text-white ${
              isFormComplete
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormComplete}
          >
            Save Financial Information
          </button>
        </div>
      </form>
    </div>
  );
}
