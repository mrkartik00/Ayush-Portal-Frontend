import React, { useState, useEffect } from "react";

const ReviewSubmit = () => {
  // State to hold fetched data
  const [investorData, setInvestorData] = useState({
    personalInformation: {},
    investorVerification: {},
    bankingInformation: {},
  });

  // Fetch data from localStorage on component mount
  useEffect(() => {
    const personalInformation =
      JSON.parse(localStorage.getItem("InvestorPersonalInformation")) || {};
    const investorVerification =
      JSON.parse(localStorage.getItem("InvestorVerification")) || {};
    const bankingInformation =
      JSON.parse(localStorage.getItem("InvestorBankingInformation")) || {};

    setInvestorData({
      personalInformation,
      investorVerification,
      bankingInformation,
    });
  }, []);

  const { personalInformation, investorVerification, bankingInformation } =
    investorData;

  return (
    <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Review & Submit
      </h2>

      {/* Personal Information Section */}
      <div className="mb-6 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Personal Information
        </h3>
        <p className="text-gray-600">
          <strong>Full Name:</strong> {personalInformation.fullName || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Investor Type:</strong>{" "}
          {personalInformation.investorType?.value || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Phone Number:</strong>{" "}
          {personalInformation.phoneNumber || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Email:</strong> {personalInformation.email || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Address:</strong> {personalInformation.address || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Date of Birth:</strong>{" "}
          {personalInformation.dateOfBirth || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Nationality:</strong>{" "}
          {personalInformation.nationality || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>LinkedIn:</strong>{" "}
          <a
            href={personalInformation.linkedIn || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            {personalInformation.linkedIn || "N/A"}
          </a>
        </p>
      </div>

      {/* Banking Information Section */}
      <div className="mb-6 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Banking Information
        </h3>
        <p className="text-gray-600">
          <strong>Bank Name:</strong> {bankingInformation.bankName || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Account Number:</strong>{" "}
          {bankingInformation.accountNumber || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Account Type:</strong>{" "}
          {bankingInformation.accountType || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>IFSC Code:</strong> {bankingInformation.ifscCode || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Branch Name:</strong> {bankingInformation.branchName || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>SWIFT Code:</strong> {bankingInformation.swiftCode || "N/A"}
        </p>
      </div>

      {/* Financial Information Section */}
      <div className="mb-6 bg-white shadow-md rounded-lg p-4">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Financial Information
        </h3>
        <p className="text-gray-600">
          <strong>Revenue:</strong> {investorVerification.revenue || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Net Worth:</strong> {investorVerification.netWorth || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Business License Number:</strong>{" "}
          {investorVerification.businessLicenseNumber || "N/A"}
        </p>
        <p className="text-gray-600">
          <strong>Taxpayer Identification:</strong>{" "}
          {investorVerification.taxPayerIdentification || "N/A"}
        </p>
        {investorVerification.govtIssuedIdentification?.type && (
          <p className="text-gray-600">
            <strong>Government ID:</strong>{" "}
            {investorVerification.govtIssuedIdentification?.type} -{" "}
            {investorVerification.govtIssuedIdentification.typeValue || "N/A"}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReviewSubmit;
