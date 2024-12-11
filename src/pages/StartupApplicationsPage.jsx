import { useState, useEffect } from "react";
import { useUserContext } from "../contexts";
import { startupRegistrationApplicationService } from "../services";
import { useNavigate, useParams } from "react-router-dom";
import { icons } from "../assets/icons";
import { Button } from "../components";
import { formatDate } from "../utils";

export default function StartupApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const { user } = useUserContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async function getApps() {
      try {
        const res = await startupRegistrationApplicationService.getApplications(
          user._id,
        );
        if (res && !res.message) {
          setApplications(res);
        } else {
          setMessage("No Ongoing Startups Registration Applications");
        }
      } catch (err) {
        navigate("/server-error");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const appsElements = (
    <div className="mx-4 md:mx-8 lg:mx-16">
      {" "}
      {/* Adding margins around the table */}
      <table className="table-auto border-collapse w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-[#FF7F32] text-white">
          <tr>
            <th className="border-b-2 border-white px-4 sm:px-6 py-4 text-left">
              S. No
            </th>
            <th className="border-b-2 border-white px-4 sm:px-6 py-4 text-left">
              Startup ID
            </th>
            <th className="border-b-2 border-white px-4 sm:px-6 py-4 text-left">
              Startup Owner
            </th>
            <th className="border-b-2 border-white px-4 sm:px-6 py-4 text-left">
              Registered Date
            </th>
            <th className="border-b-2 border-white px-4 sm:px-6 py-4 text-left">
              Expiration Date
            </th>
            <th className="border-b-2 border-white px-4 sm:px-6 py-4 text-left">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => {
            // Calculate the registration date as 10 days before the expiration date
            const expirationDate = new Date(app.expireAt);
            const registrationDate = new Date(expirationDate);
            registrationDate.setDate(expirationDate.getDate() - 10);

            return (
              <tr
                key={app._id}
                onClick={() => navigate(`/application/${app._id}`)}
                className="cursor-pointer hover:bg-[#FF7F32] hover:text-white transition-all duration-300"
              >
                <td className="border-b border-[#FF7F32] px-4 sm:px-6 py-4">
                  {index + 1}
                </td>
                <td className="border-b border-[#FF7F32] px-4 sm:px-6 py-4">
                  {app._id}
                </td>
                <td className="border-b border-[#FF7F32] px-4 sm:px-6 py-4">
                  {app.owner || "N/A"}
                </td>
                <td className="border-b border-[#FF7F32] px-4 sm:px-6 py-4">
                  {registrationDate
                    ? registrationDate.toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="border-b border-[#FF7F32] px-4 sm:px-6 py-4">
                  {app.expireAt
                    ? new Date(app.expireAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="border-b border-[#FF7F32] px-4 sm:px-6 py-4">
                  {app.status || "Pending"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return loading ? (
    <div className="w-full flex size-[20px] text-[#f9f9f9] justify-center items-center fill-[#f68533]">
      {icons.loading}
    </div>
  ) : (
    <div>
      <div className="flex justify-center w-full px-4 sm:px-6 lg:px-8">
        <Button
          className="text-[#f9f9f9] rounded-md h-auto px-6 py-3 bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-green-600 hover:to-green-700 
                        flex items-center justify-center gap-2 min-w-[120px] max-w-[90vw] transition-all duration-300 m-4"
          onClick={() => navigate(`/application/new/personal`)}
          type="submit"
          btnText={
            <div className="flex items-center justify-center gap-2">
              <p className="text-[#f9f9f9] text-center">Register new Startup</p>
              <div className="size-[14px] fill-[#f9f9f9]">{icons.next}</div>
            </div>
          }
        />
      </div>

      {applications.length > 0 ? (
        <div>{appsElements}</div>
      ) : (
        <div className=" w-full text-black">{message}</div>
      )}
    </div>
  );
}
