import React, { useState, useEffect } from "react";
import { icons } from "../../assets/icons";
import { verifyRegex, formatDate } from "../../utils";
import countryList from "../Country/Country";

// import Select from 'react-select';

import { debounce } from "lodash"; // Debounce utility to prevent unnecessary filtering
import {
  RegisterInvestorContextProvider,
  useRegisterInvestorContext,
} from "../../contexts";
export default function PersonalInformationInvestor() {
  // State for form fields
  const [formData, setFormData] = useState({
    fullName: "",
    investorType: "",
    phoneNumber: "",
    organisationName: "",
    email: "",
    address: "",
    dateOfBirth: "",
    nationality: "", // This should be a valid country code (e.g., "IN")
    linkedIn: "",
  });
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [nationalityInput, setNationalityInput] = useState(""); // For tracking nationality input
  const [investorType, setInvestorType] = useState("");
  const { currentStep, setCurrentStep, setTotalData, setCompletedSteps } =
    useRegisterInvestorContext;

  useEffect(() => {
    const savedData = localStorage.getItem("InvestorPersonalInformation");
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setInvestorType(JSON.parse(savedData)?.investorType);
    }

    // Fetch countries dynamically
    const fetchCountries = async () => {
      try {
        setNationalityInput(countryList);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountries(); // Fetch countries on component mount
  }, []);

  // State for tracking form validation

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
    console.log(name);
    if (name === investorType) {
      setInvestorType(value);
    }
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: date ? date.toISOString().split("T")[0] : "", // Store in YYYY-MM-DD format
    }));
  };

  // Handle nationality change from select
  const handleNationalityChange = (selectedOption) => {
    console.log("Selected Option:", selectedOption);
    setFormData((prevData) => ({
      ...prevData,
      nationality: selectedOption ? selectedOption.value : "", // Correctly set nationality value
    }));
  };
  const investorOptions = [
    { value: "Individual", label: "Individual" },
    { value: "Institutional", label: "Institutional" },
  ];
  // Validate form completeness
  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "investorType",
      "phoneNumber",
      "email",
      "address",
      "dateOfBirth",
      "nationality",
    ];
    const isComplete =
      requiredFields.every((field) =>
        field != String
          ? formData[field] !== null
          : formData[field]?.trim() !== "",
      ) && validateEmailDomain(formData.email);

    setIsFormComplete(isComplete);
  };

  // Custom email domain validation
  const validateEmailDomain = (email) => {
    // Check if email ends with popular domains like gmail.com or email.com
    const validDomains = ["gmail.com", "email.com", "outlook.com", "yahoo.com"];
    return validDomains.some((domain) => email.endsWith(domain));
  };

  // Call validateForm on every change
  useEffect(() => {
    validateForm();
    localStorage.setItem(
      "InvestorPersonalInformation",
      JSON.stringify(formData),
    );
  }, [formData]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormComplete) {
      // Pass the completed data back to the parent component
      onComplete(formData);
      setCompletedSteps((prev) => [...prev, "personal"]);

      setTotalData((prev) => ({
        ...prev,
        personal: { data: { ...formData }, status: "complete" },
      }));
      setCurrentStep((prev) => prev + 1);
    } else {
      alert("Please complete all required fields and ensure email is valid.");
    }
  };

  // Debounce the nationality input to avoid excessive filtering
  const debouncedInputChange = debounce((inputValue) => {
    setNationalityInput(inputValue);
  }, 300); // 300ms debounce time

  return (
    <div className="p-6 w-full bg-orange-100 rounded-lg shadow-md border border-gray-200">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
        Investor Personal Information
      </h2>

      {/* Form */}
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="flex items-center space-x-3">
          {" "}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Investor Type
            </label>
            <select
              name="investorType"
              id="investorType"
              value={formData.investorType}
              disabled={false}
              onChange={handleChange}
              className="m-1"
            >
              <option value="">Select InvestorType</option>
              {investorOptions.map((investor) => (
                <option key={investor.label} value={investor.value}>
                  {investor.value}
                </option>
              ))}
            </select>
          </div>
        </div>
        {investorType?.value === "Institutional" ? (
          <div className="flex items-center space-x-3">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Organisation Name
              </label>
              <input
                type="text"
                name="organisationName"
                placeholder="Enter full name"
                value={formData.organisationName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>
        ) : (
          ""
        )}
        {/* Other Fields */} {/* Phone Number */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        {/* Email */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        {/* Address */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              name="address"
              placeholder="Enter complete address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
            ></textarea>
          </div>
        </div>
        {/* Date of Birth */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              required
              onChange={handleChange}
            />
          </div>
        </div>
        {/* Nationality */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Nationality
            </label>
            <select
              name="nationality"
              id="nationality"
              value={formData.nationality}
              disabled={false}
              onChange={handleChange}
              className="m-1"
            >
              <option value="">Select Nationality</option>
              {countryList.map((country) => (
                <option key={country.label} value={country.label}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* LinkedIn Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn Profile (Optional)
            </label>
            <input
              type="url"
              name="linkedIn"
              placeholder="Enter LinkedIn profile URL"
              value={formData.linkedIn}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>
        {/* Submit Button */}{" "}
        <div className="text-center">
          <button
            type="submit"
            className={`py-2 px-6 rounded-md font-semibold text-white ${
              isFormComplete
                ? "bg-orange-500 hover:bg-orange-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            disabled={!isFormComplete}
          >
            Save Information
          </button>
        </div>
      </form>
    </div>
  );
}
