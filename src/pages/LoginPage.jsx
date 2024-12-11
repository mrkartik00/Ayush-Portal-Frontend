import { useState } from "react";
import { Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../contexts";
import { userService } from "../services";

export default function LoginPage() {
  const [role, setRole] = useState("Startup Owner"); // Default role
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useUserContext();

  async function handleChange(e) {
    const { value, name } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  function onMouseOver() {
    if (Object.values(inputs).some((value) => !value)) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setDisabled(true);
    try {
      const res = await userService.login(inputs, role);
      if (res && !res.message) {
        setUser(res);
        navigate("/");
      } else {
        setError(res.message);
      }
    } catch (err) {
      navigate("/server-error");
    } finally {
      setDisabled(false);
      setLoading(false);
    }
  }

  // input fields
  const inputFields = [
    {
      type: "text",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      placeholder: "Create a strong password",
      required: true,
    },
  ];

  const inputElements = inputFields.map((field) => (
    <div key={field.name} className="w-full">
      <div className="bg-[#f9f9f9] z-[1] text-[15px] ml-2 px-1 w-fit relative top-3 font-medium">
        <label htmlFor={field.name}>
          {field.required && <span className="text-red-500">* </span>}
          {field.label}
        </label>
      </div>
      <div>
        <input
          type={field.type}
          name={field.name}
          id={field.name}
          value={inputs[field.name]}
          onChange={handleChange}
          placeholder={field.placeholder}
          className="py-[10px] text-ellipsis placeholder:text-[0.9rem] placeholder:text-[#a6a6a6] rounded-md px-3 w-full border-[0.01rem] border-[#858585] outline-[#f68533] bg-transparent"
        />
      </div>
    </div>
  ));

  return (
    <div
      className="bg-cover bg-no-repeat min-h-[calc(100vh-110px)] flex items-center justify-center"
      style={{
        backgroundImage: `url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/c3/c9/ee/impressive-construction.jpg')`,
      }}
    >
      <div className="w-full bg-opacity-70 max-w-[450px] text-center bg-[#f9f9f9] drop-shadow-md p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome Back!</h1>

        <div className="bg-opacity-85 bg-white drop-shadow-md border border-gray-300 shadow-md rounded-lg p-6 w-full max-w-sm">
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {inputElements}

            <div className="w-full">
              <Button
                className="text-[#f9f9f9] mt-8 rounded-md w-full bg-gradient-to-r from-[#f68533] to-[#f68533] hover:from-green-600 hover:to-green-700"
                disabled={disabled}
                onMouseOver={onMouseOver}
                type="submit"
                btnText={loading ? "logging..." : "Login"}
              />
              <p className="w-full text-center text-xs xs:text-sm mt-2">
                don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-[#2a4fae] hover:underline"
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
