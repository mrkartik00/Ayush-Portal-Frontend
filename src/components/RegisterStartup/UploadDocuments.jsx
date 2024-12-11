import React, { useState } from "react";

export default function UploadDocuments() {
  const [files, setFiles] = useState({
    file1: null,
    file2: null,
    file3: null,
    file4: null,
  });

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Files submitted:", files);
  };

  return (
    <div className="p-6 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl font-bold text-orange-600 mb-6 text-center">
        Upload Your Documents
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* File 1 */}
        <div className="w-full">
          <label
            htmlFor="file1"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Document 1
          </label>
          <input
            type="file"
            id="file1"
            name="file1"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-800 border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* File 2 */}
        <div className="w-full">
          <label
            htmlFor="file2"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Document 2
          </label>
          <input
            type="file"
            id="file2"
            name="file2"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-800 border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* File 3 */}
        <div className="w-full">
          <label
            htmlFor="file3"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Document 3
          </label>
          <input
            type="file"
            id="file3"
            name="file3"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-800 border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* File 4 */}
        <div className="w-full">
          <label
            htmlFor="file4"
            className="text-sm font-medium text-gray-700 mb-2 block"
          >
            Document 4
          </label>
          <input
            type="file"
            id="file4"
            name="file4"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-800 border border-gray-300 rounded-md py-2 px-3"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-4 mt-4">
          <button
            type="reset"
            className="text-white rounded-md h-10 w-32 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            onClick={() =>
              setFiles({
                file1: null,
                file2: null,
                file3: null,
                file4: null,
              })
            }
          >
            Reset
          </button>
          <button
            type="submit"
            className="text-white rounded-md h-10 w-32 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
