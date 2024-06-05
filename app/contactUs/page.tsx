import React from "react";

const ContactUs = () => {
  return (
    <>
      <h1 className="text-primary text-center text-4xl fornt-semibold italic mt-10 mb-5">
        Contact Us
      </h1>
      <section className="flex flex-wrap justify-between md:justify-items-center">
        <form className="">
          <input
            type="text"
            className="block w-full  rounded-xl border p-2 border-gray-300 bg-gray-100"
            placeholder="Enter Text"
          />
          <input
            type="text"
            className="block w-full  rounded-xl border p-2 border-gray-300 bg-gray-100"
            placeholder="Enter Text"
          />
          <input
            type="text"
            className="block w-full  rounded-xl border p-2 border-gray-300 bg-gray-100"
            placeholder="Enter Text"
          />
        </form>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108947.33335921248!2d72.94789126840703!3d31.425030241513763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392243a77e3326ed%3A0x9cc1e2e806e0729f!2sDoctor%20Saucy!5e0!3m2!1sen!2s!4v1717101637181!5m2!1sen!2s"
          width="450"
          height="450"
          className="border-none"
          loading="lazy"
        ></iframe>{" "}
      </section>
    </>
  );
};

export default ContactUs;
