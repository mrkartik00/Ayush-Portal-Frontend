import { Link } from "react-router-dom";
import { Button } from "../components";
import { useState } from "react";
import { icons } from "../assets/icons";
import { EMAIL, NUMBER1, NUMBER2 } from "../constants/contacts";
import { copyEmail } from "../utils";
import { useVariantContext } from "../contexts";
import { motion } from "framer-motion";

export default function ContactUsPage() {
  const { textVariants } = useVariantContext();
  const [inputs, setInputs] = useState({ email: "", query: "" });

  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  }

  function submitQuery(e) {
    e.preventDefault();
    setInputs({ query: "", email: "" });
    alert("Query Submitted Successfully 🤗");
  }

  const contactInfo = [
    {
      title: "email",
      icon: icons.mail,
      info: EMAIL,
    },
    {
      title: "contact number",
      icon: icons.call,
      info: `+91 ${NUMBER1}, ${NUMBER2}`,
    },
    {
      title: "address",
      icon: icons.location,
      info: "123 Startup Avenue, New Delhi, India",
    },
  ];

  const contactElements = contactInfo.map((contact) => (
    <div className="flex items-center justify-start gap-3">
      <div className="flex items-center justify-center">
        <div className="bg-white p-2 rounded-full w-fit drop-shadow-xl">
          <div className="size-[16px]">{contact.icon}</div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <div className="cursor-text">{contact.info}</div>

        {contact.title === "email" && (
          <div
            className="size-[15px] hover:fill-[#f68533] cursor-pointer fill-[#f68533] hover:scale-125 transition-all ease-in"
            onClick={copyEmail}
          >
            {icons.clipboard}
          </div>
        )}
      </div>
    </div>
  ));

  return (
    <div className="w-full h-full py-8 px-[5%] flex flex-col items-start justify-start gap-8">
      <motion.section
        variants={textVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <h1 className="text-3xl font-bold text-center mb-6 w-full">
          Contact Us
        </h1>
        <p className="text-justify">
          We're here to help! You make the most of your experience! Whether you
          have feedback, need support, or are looking for guidance, feel free to
          reach out to us. Our team is ready to assist you every step of the
          way!
        </p>
      </motion.section>

      <hr className="w-full" />

      <div className="flex flex-col lg:flex-row items-start justify-between lg:gap-24 gap-14 w-full h-full">
        <div className="flex flex-col w-full items-start justify-start gap-8">
          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            className="w-full"
          >
            <h2 className="mb-4 font-semibold text-xl">👥 Technical Support</h2>
            <p className="text-justify">
              Need help navigating{" "}
              <Link
                to={"/"}
                className="font-semibold text-[#f68533] hover:underline"
              >
                AYUSH Portal
              </Link>{" "}
              or having technical issues? Visit our{" "}
              <Link
                to={"/support"}
                className="text-nowrap font-semibold text-[#f68533] hover:underline"
              >
                Support Page
              </Link>{" "}
              for assistance, troubleshooting tips, and to connect directly with
              team members if you need further help.
            </p>
          </motion.section>

          <hr className="w-full" />

          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
          >
            <h2 className="mb-4 font-semibold text-xl">
              📚 Frequently Asked Questions (FAQs)
            </h2>
            <p className="text-justify">
              For common questions and guidance, check out our{" "}
              <Link
                to={"/faqs"}
                className="font-semibold text-[#f68533]  hover:underline"
              >
                FAQ page
              </Link>
              . You might find the answer you're looking for right there!
            </p>
          </motion.section>

          <motion.section
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            className="flex flex-col gap-4 items-start justify-start bg-[#fffcf9] drop-shadow-md rounded-md p-4"
          >
            {contactElements}
          </motion.section>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={textVariants}
          className="w-full"
        >
          <section className="w-full">
            <h2 className="mb-4 font-semibold text-xl">
              ❓Queries & Feedbacks
            </h2>
            <p className="text-justify">
              We value your input! If you have any questions, suggestions, or
              feedback about our services, please feel free to reach out. Your
              feedback helps us improve and provide better services, make{" "}
              <Link
                to={"/"}
                className="font-semibold text-[#f68533] hover:underline"
              >
                Investor Connect
              </Link>{" "}
              better for everyone.
            </p>
          </section>

          <form
            onSubmit={submitQuery}
            className="mt-2 w-full flex flex-col items-start justify-center gap-3"
          >
            <div className="w-full">
              <div className="bg-white text-[#040606] z-[1] ml-3 px-2 w-fit relative top-3 font-medium">
                <label htmlFor="email">
                  Email
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  className="shadow-md shadow-[#efefef] px-2 py-4 rounded-md indent-2 w-full border-[0.01rem] placeholder:text-[15px] border-[#aeaeae] bg-transparent placeholder:text-[#a0a0a0]"
                />
              </div>
              <p className="text-sm">
                This email will be sent along with the query
              </p>
            </div>

            <div className="w-full">
              <div className="bg-white z-[1] text-[#040606] ml-3 px-2 w-fit relative top-3 font-medium">
                <label htmlFor="feedback">
                  Query / Feedback
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="w-full">
                <textarea
                  placeholder="Let us know how are we doing !!"
                  value={inputs.query}
                  onChange={handleChange}
                  name="feedback"
                  className="shadow-md shadow-[#efefef] bg-transparent border border-[#aeaeae] w-full indent-2 rounded-md p-2 pt-4 text-black placeholder:text-[15px] placeholder:text-[#a0a0a0] resize-y"
                  rows="4"
                  cols="50"
                  style={{ minHeight: "100px" }}
                />
              </div>
            </div>

            <Button
              btnText={"Submit"}
              className="text-[#f9f9f9] mt-4 rounded-md w-[90%] self-center bg-gradient-to-r from-[#f1924f] to-[#f68533] hover:from-green-600 hover:to-green-700"
            />
          </form>
        </motion.div>
      </div>
    </div>
  );
}
