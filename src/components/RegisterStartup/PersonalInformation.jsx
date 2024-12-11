import { useState, useEffect, useMemo } from "react";
import { icons } from "../../assets/icons";
import PhoneInput from "react-phone-input-2";
import { Button, Popup } from "..";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import { useRegisterStartupContext } from "../../contexts";
import { verifyRegex, formatDate } from "../../utils";
import {
  ownerService,
  startupRegistrationApplicationService,
} from "../../services";

export default function PersonalInformation() {
  const {
    setCurrentStep,
    setTotalData,
    setCompletedSteps,
    totalData,
    existingApp,
  } = useRegisterStartupContext();

  const initialInputs = {
    name: totalData.persona?.data?.name || "",
    email: totalData.personal?.data?.email || "",
    dateOfBirth: formatDate(totalData.personal?.data?.dateOfBirth) || "",
    password: totalData.personal?.data?.password || "",
    phone: totalData.personal?.data?.phone || "",
    address: totalData.personal?.data?.address || "",
    nationality: totalData.personal?.data?.nationality || "",
    linkedInURL: totalData.personal?.data?.linkedInURL || "",
  };

  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [flag, setFlag] = useState("");
  const [inputs, setInputs] = useState(initialInputs);

  const initialErrors = {
    root: "",
    name: "",
    email: "",
    dateOfBirth: "",
    password: "",
    phone: "",
    address: "",
  };
  const [errors, setErrors] = useState(initialErrors);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState();
  const [isFormAutoFilled, setIsFormAutoFilled] = useState(false);

  // Memoizing the check for autofill status to prevent unnecessary rerenders
  const checkFormAutoFilled = useMemo(() => {
    return Object.entries(inputs).every(
      ([key, value]) => value || key === "linkedInURL",
    );
  }, [inputs]);

  useEffect(() => {
    setIsFormAutoFilled(checkFormAutoFilled);
  }, [checkFormAutoFilled]); // Only trigger when checkFormAutoFilled changes

  useEffect(() => {
    (async function fetchCountryList() {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/flag/images",
          {
            method: "GET",
          },
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        const countries = result.data;

        countries.sort((a, b) => a.name.localeCompare(b.name));
        setCountryList(countries);
        // Set the initial flag if nationality exists
        if (initialInputs.nationality) {
          const initialCountry = countries.find(
            (countryObject) => countryObject.name === initialInputs.nationality,
          );

          if (initialCountry) {
            setFlag(initialCountry.flag); // Set the flag URL
          } else {
            console.warn(
              `Country with name "${initialInputs.nationality}" not found.`,
            );
          }
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    })();
  }, []);

  function handleChange(e) {
    const { value, name } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    // update flag
    if (name === "nationality") {
      const selectedCountry = countryList.find(
        (countryObject) => countryObject.name === value,
      );
      setFlag(selectedCountry.flag);
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    if (name !== "password") {
      verifyRegex(name, value, setErrors);
    }
  }

  function onMouseOver() {
    if (
      Object.entries(inputs).some(
        ([key, value]) => !value && key !== "linkedInURL",
      ) ||
      Object.entries(errors).some(
        ([key, value]) => value !== "" && key !== "root",
      )
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setLoading(true);
      setDisabled(true);
      setErrors(initialErrors);

      const { name, email, phone, password, ...ownerInputs } = inputs;

      if (existingApp) {
        if (
          Object.entries(inputs).some(
            ([key, value]) => value !== initialInputs[key],
          )
        ) {
          let updates = {};
          Object.entries(inputs).map(([key, value]) => {
            if (value !== initialInputs[key]) {
            }
          });

          const res = await ownerService.update({ ...updates });
          if (res && !res.message) {
            alert("your details have been updated");
          } else {
            setErrors((prev) => ({ ...prev, root: res.message }));
          }
        }
      } else {
        const res =
          await startupRegistrationApplicationService.startApplication();
        if (res) {
          const res2 = await ownerService.register(ownerInputs);
          if (res2?.message === "personal info saved successfully") {
            setCurrentStep((prev = prev + 1));
            navigate("organization");
            setCompletedSteps((prev) => [...prev, "personal"]);
            setTotalData((prev) => ({
              ...prev,
              personal: {
                data: { ...inputs },
                status: "complete",
              },
            }));
          }
        } else {
          setErrors((prev) => ({ ...prev, root: res.message }));
        }
      }
    } catch (err) {
      navigate("/server-error");
    } finally {
      setDisabled(false);
      setLoading(false);
    }
  }

  const inputFields = [
    {
      type: "text",
      name: "name",
      label: "Full Name",
      placeholder: "Enter your Full Name",
      icon: icons.user,
      required: true,
      readOnly: isFormAutoFilled,
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      icon: icons.mailUnfill,
      placeholder: "Enter your Email",
      required: true,
      readOnly: isFormAutoFilled,
    },
    {
      type: "date",
      name: "dateOfBirth",
      required: true,
      label: "Date of Birth",
      readOnly: false,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      icon: icons.password,
      placeholder: "Create a strong Password",
      required: true,
      readOnly: isFormAutoFilled,
    },
    {
      type: "url",
      name: "linkedInURL",
      label: "LinkedIn Profile (Optional)",
      icon: icons.linkedIn,
      placeholder: "Enter LinkedIn profile URL",
      required: false,
      readOnly: false,
    },
  ];

  const inputElements = inputFields.map((field) => (
    <div key={field.name} className="w-full">
      <div className="bg-[#fff7f2] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
        <label htmlFor={field.name}>
          {field.required && <span className="text-red-500">* </span>}
          {field.label}
        </label>
      </div>
      <div className="shadow-md shadow-[#f8f0eb] relative">
        {field.icon && (
          <div className="size-[16px] fill-[#323232] stroke-[#323232] absolute top-[50%] translate-y-[-50%] right-3">
            {field.icon}
          </div>
        )}
        <input
          type={field.type}
          readOnly={field.readOnly}
          name={field.name}
          id={field.name}
          value={inputs[field.name]}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={field.placeholder}
          className={`py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md ${field.icon ? "pl-3 pr-10" : "px-3"} w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent`}
        />
      </div>
      {errors[field.name] && (
        <div className="mt-1 text-red-500 text-xs font-medium">
          {errors[field.name]}
        </div>
      )}
      {field.name === "dateOfBirth" && !errors.dateOfBirth && (
        <div className="text-xs">Age should be atleast 18 years old.</div>
      )}
    </div>
  ));

  return (
    <div className="p-6 w-full bg-[#fff7f2] overflow-x-scroll rounded-lg shadow-md border border-gray-200">
      {/* email verification popup */}
      {showPopup && (
        <Popup
          onClick={() => setShowPopup(false)}
          className="text-[#f9f9f9] mt-4 rounded-md text-lg bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
          header="Verification Email"
          description="A verification email has been sent on your provided email, check it out to proceed with the registeration process"
        />
      )}

      <h2 className="text-xl font-bold text-orange-600 mb-6 text-center">
        Founder/Co-Founder Personal Information
      </h2>
      <div className="w-full flex flex-col items-center justify-center gap-3">
        {errors.root ? (
          <div className="text-red-500 w-full text-center">{errors.root}</div>
        ) : (
          <p className="text-red-500 w-full text-center text-[15px]">
            <span className="font-bold">* </span>Indicates compulsory fields
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start justify-center gap-1 w-full"
        >
          {inputElements}

          {/* Phone Number */}
          <div className="w-full shadow-md shadow-[#f8f0eb]">
            <div className="bg-[#fff7f2] z-[10] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
              <label htmlFor="phone">
                <span className="text-red-500">* </span>
                Phone Number
              </label>
            </div>
            <div className="w-full relative">
              <div className="size-[16px] stroke-[#323232] absolute top-[50%] translate-y-[-50%] right-3">
                {icons.callUnfill}
              </div>
              <PhoneInput
                country="in"
                value={inputs.phone}
                inputProps={{
                  name: "phone",
                  required: true,
                  id: "phone",
                  readOnly: isFormAutoFilled,
                }}
                inputClass="!w-full !h-[45px] !indent-2 !rounded-md !shadow-sm !border-[0.01rem] !border-[#858585] !outline-[#f68533] !bg-transparent"
                buttonClass="!h-[45px] !w-[45px] !bg-[#fff7f2] !hover:bg-[#fff7f2] !z-[1] !rounded-r-none !rounded-md !border-[0.01rem] !border-[#858585] !outline-[#f68533]"
              />
            </div>
          </div>

          {/* Nationality */}
          <div className="w-full">
            <div className="bg-[#fff7f2] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
              <label htmlFor="nationality">
                <span className="text-red-500">* </span>
                Nationality
              </label>
            </div>
            <div className="w-full relative">
              {flag && (
                <div className="h-[18px] w-[28px] rounded-sm overflow-hidden absolute top-[50%] translate-y-[-50%] left-3">
                  <img
                    src={flag}
                    alt={`${inputs.nationality} flag`}
                    className="object-cover h-full w-full"
                  />
                </div>
              )}
              <select
                name="nationality"
                id="nationality"
                value={inputs.nationality}
                disabled={false}
                onChange={handleChange}
                className={`py-[10px] text-ellipsis transition-all ease-in placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md ${flag ? "pl-12 pr-3" : "px-3"} w-full border-[0.01rem] border-[#858585] outline-violet-600 bg-transparent`}
              >
                <option value="">Select Nationality</option>
                {countryList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="w-full">
            <div className="bg-[#fff7f2] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
              <label htmlFor="address">
                <span className="text-red-500">* </span>
                Current Address
              </label>
            </div>
            <div className="w-full relative">
              <div className="size-[16px] fill-[#323232] absolute top-2 right-3">
                {icons.locationPinPoint}
              </div>
              <textarea
                id="address"
                name="address"
                placeholder="Provide your Current address"
                value={inputs.address}
                readOnly={isFormAutoFilled}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                className="shadow-md shadow-[#f8f0eb] py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
              />
            </div>
            {errors.address ? (
              <div className="mt-1 text-red-500 text-sm font-medium">
                {errors.address}
              </div>
            ) : (
              <div className="text-xs">Only 256 characters are allowed.</div>
            )}
          </div>

          {/* buttons */}
          <div className="w-full flex items-center justify-end gap-4 mt-4">
            <Button
              className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-red-600 hover:to-red-700"
              onClick={() => {
                setInputs(initialInputs);
                setErrors(initialErrors);
                setFlag("");
              }}
              btnText={
                <div className="flex items-center justify-center gap-2">
                  <p className="text-[#f9f9f9]">Reset</p>
                  <div className="size-[15px] fill-[#f9f9f9]">
                    {icons.erase}
                  </div>
                </div>
              }
            />
            <Button
              className="text-[#f9f9f9] rounded-md h-[35px] w-[80px] bg-gradient-to-r from-[#f68533] to-[#ff8025] hover:from-green-600 hover:to-green-700"
              disabled={disabled}
              onMouseOver={onMouseOver}
              type="submit"
              btnText={
                loading ? (
                  <div className="fill-[#f9f9f9] text-[#f9a264] size-[20px]">
                    {icons.loading}
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <p className="text-[#f9f9f9]">Save</p>
                    <div className="size-[14px] fill-[#f9f9f9]">
                      {icons.next}
                    </div>
                  </div>
                )
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
}
