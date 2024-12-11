import React, { useState, useEffect } from "react";
import ReviewSubmit from "./ReviewSubmit";

export default function DocumentUpload() {
  // State to manage form validation and file uploads
  const [uploadedFiles, setUploadedFiles] = useState({
    image: null,
    taxId: null,
    governmentId: null,
    bankStatements: null,
    businessRegistration: null,
  });
  const [declarations, setDeclarations] = useState({
    authenticity: false,
    termsAndConditions: false,
    policies: false,
  });
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [investorData, setInvestorData] = useState({});

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const personalInformation = JSON.parse(
      localStorage.getItem("InvestorPersonalInformation"),
    );
    const investorType = personalInformation?.investorType;
    console.log(investorType);
    setInvestorData(investorType);
  }, []);

  // Validate form completeness
  const validateForm = () => {
    const requiredFiles = ["image", "taxId", "governmentId", "bankStatements"];
    if (
      investorData?.personalInformation?.investorType?.value !== "Individual"
    ) {
      requiredFiles.push("businessRegistration");
    }

    const allFilesUploaded = requiredFiles.every(
      (field) => uploadedFiles[field] !== null,
    );
    const allDeclarationsChecked = Object.values(declarations).every(
      (value) => value === true,
    );

    return allFilesUploaded && allDeclarationsChecked;
  };

  // Monitor form completeness
  useEffect(() => {
    setIsFormComplete(validateForm());
    localStorage.setItem("DocumentVerification", JSON.stringify(uploadedFiles));
  }, [uploadedFiles, declarations]);

  // Handle file upload changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setUploadedFiles((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setDeclarations((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormComplete) {
      alert("Please complete the form and agree to all declarations.");
      return;
    }

    console.log("Uploaded Files:", uploadedFiles);
    console.log("Declarations:", declarations);
    alert("Document uploaded successfully!");

    //handle here dbms integration
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Document Upload & Review
      </h2>

      {/* Review Section */}
      <div className="mb-8">
        <ReviewSubmit />
      </div>

      {/* Document Upload Form */}
      <form
        className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Upload Required Documents
        </h3>

        {/* Image Upload */}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {investorData?.value === "Individual"
              ? "Upload Your Image"
              : "Upload Organisation Image"}
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Tax ID Upload */}
        <div>
          <label
            htmlFor="taxId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Tax ID
          </label>
          <input
            type="file"
            id="taxId"
            name="taxId"
            onChange={handleFileChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Government ID Proof */}
        <div>
          <label
            htmlFor="governmentId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Upload Government ID Proof
          </label>
          <input
            type="file"
            id="governmentId"
            name="governmentId"
            onChange={handleFileChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Bank Statements */}
        <div>
          <label
            htmlFor="bankStatements"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Bank Statements or Financial Proof
          </label>
          <input
            type="file"
            id="bankStatements"
            name="bankStatements"
            onChange={handleFileChange}
            className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        {/* Business Registration Documents */}
        {investorData?.value !== "Individual" ? (
          <div>
            <label
              htmlFor="businessRegistration"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Business Registration Documents
            </label>
            <input
              type="file"
              id="businessRegistration"
              name="businessRegistration"
              onChange={handleFileChange}
              className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        ) : null}

        {/* Declarations */}
        {Object.keys(declarations).map((key) => (
          <div key={key} className="flex items-start space-x-3">
            <input
              type="checkbox"
              id={key}
              name={key}
              checked={declarations[key]}
              onChange={handleCheckboxChange}
              className="h-5 w-5 text-blue-500 border-gray-300 rounded"
            />
            <label htmlFor={key} className="text-gray-700">
              {key === "authenticity"
                ? "I confirm that all details provided are accurate and verifiable."
                : key === "termsAndConditions"
                  ? "I consent to the Terms and Conditions."
                  : "I agree to comply with the portal's policies and regulatory requirements."}
            </label>
          </div>
        ))}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`py-2 px-6 rounded-md shadow-lg transition-all ${
              isFormComplete
                ? "bg-blue-500 text-white hover:bg-green-600"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            disabled={!isFormComplete}
          >
            Submit Documents
          </button>
        </div>
      </form>
    </div>
  );
}
