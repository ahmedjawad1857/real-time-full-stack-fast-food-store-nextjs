// // app/register/page
"use client";
import { useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import OpenEye from "../(components)/icons/openEye";
import EyeSlash from "../(components)/icons/eyeSlash";

const RegisterPage = () => {
  const session = useSession();
  const status: string = session.status;
  if (status === "authenticated") {
    redirect("/");
  }

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const [userName, setUserName] = useState("");
  const [userNameError, setUserNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(true);
  const [countdown, setCountdown] = useState<number>(5);

  const router = useRouter();

  const onHandleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError(null);
    setUserNameError(null);
    setPasswordError(null);
    setMessage(null);
    setCreatingUser(true);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ userName, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    try {
      const data = await response.json();
      console.log(data);
      console.log("hello");
      if (Array.isArray(data)) {
        data.forEach((error) => {
          console.log(error);

          if (error.path === "userName") {
            setUserNameError(error.msg);
          } else if (error.path === "email") {
            setEmailError(error.msg);
          } else if (error.path === "password") {
            setPasswordError(error.msg);
          }
        });
      } else {
        setMessage(data.msg);
        console.log(`error ${data.msg}`);
      }
      if (data.success) {
        setSuccess(true);
        setUserName("");
        setEmail("");
        setPassword("");
        let countdownValue = 5;
        setMessage(
          `${data.msg}. You are redirecting to the login page in ${countdownValue}s`
        );
        const countdownInterval = setInterval(() => {
          countdownValue -= 1;
          setCountdown(countdownValue);
          setMessage(
            `${data.message} You are redirecting to the login page in ${countdownValue}s`
          );
          if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            router.push("/login");
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Error parsing JSON response:", error);
      setMessage("An error occurred while registering.");
    } finally {
      setCreatingUser(false);
    }
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register </h1>

      <form className={`block max-w-xs mx-auto `} onSubmit={onHandleFormSubmit}>
        <input
          type="text"
          placeholder="Enter Your userName..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={creatingUser}
          className={`${
            userNameError ? "border-red-600" : " mb-2"
          } block w-full rounded-xl border p-2 border-gray-300 bg-gray-100`}
        />
        {userNameError && (
          <span className="text-red-600 text-sm -mt-10">{userNameError}</span>
        )}
        <input
          type="email"
          placeholder="Enter Your Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={creatingUser}
          className={`${
            emailError ? "border-red-600" : " mb-2"
          } block w-full mb-2 rounded-xl border p-2 border-gray-300 bg-gray-100`}
        />
        {emailError && (
          <span className="text-red-600 text-sm -mt-10">{emailError}</span>
        )}

        <div className="relative">
          {" "}
          {/* Wrap input field and icon in a container */}
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Your Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={creatingUser}
            className={`${
              passwordError ? "border-red-600" : " mb-2"
            } block w-full  rounded-xl border p-2 border-gray-300 bg-gray-100`}
          />
          <span
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
          >
            {!showPassword ? <OpenEye /> : <EyeSlash />}
          </span>
        </div>
        {passwordError && (
          <span className="text-red-600 text-sm ">{passwordError}</span>
        )}

        <button type="submit" className="mt-2" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500 text-xl">
          Or login with...
        </div>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex gap-4 justify-center items-center"
          disabled={creatingUser}
        >
          <Image src={"/google.png"} alt="google icon" width={32} height={32} />
          Login With Google
        </button>
        <hr className="mt-7" />
        <p className="text-gray-400 text-md text-center font-semibold my-5">
          Already have an Account?
          <Link className="text-primary ml-2 underline" href="/login">
            Login &raquo;
          </Link>
        </p>
        {message && (
          <div className="bg-gray-100 h-fit p-4 my-4 w-full">
            <p
              className={`${
                !success ? "text-red-600" : "text-green-600"
              } text-2xl  `}
            >
              {message}
            </p>
          </div>
        )}
      </form>
    </section>
  );
};
export default RegisterPage;
