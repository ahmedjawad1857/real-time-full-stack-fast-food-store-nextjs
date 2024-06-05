"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import EyeSlash from "../(components)/icons/eyeSlash";
import OpenEye from "../(components)/icons/openEye";
import { redirect, useRouter } from "next/navigation";

const Login = () => {
  const session = useSession();
  const status: string = session.status;
  if (status === "authenticated") {
    redirect("/");
  }

  const [userName, setUserName] = useState<string>("");
  const [userNameError, setUserNameError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [loginProgress, setLoginProgress] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setError(""); // Reset error state

    // Validation checks
    if (userName.length === 0) {
      setUserNameError("Username is required.");
    } else if (userName.length < 3) {
      setUserNameError("Username must be at least 2 characters");
    }
    if (password.length === 0) {
      setPasswordError("Password is required.");
    } else if (password.length < 5) {
      setPasswordError("Password must be at least 5 characters");
    }
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email.length === 0) {
      setEmailError("Email is required.");
    } else if (!emailRegex.test(email)) {
      setEmailError("Email format is invalid.");
    }

    // If there are no validation errors, proceed to authentication
    if (!userNameError && !passwordError && !emailError) {
      setLoginProgress(true);

      const result: any = await signIn("credentials", {
        redirect: false,
        userName,
        email,
        password,
        callbackUrl: "/",
      });
      setLoginProgress(false);
      console.log("result", result);
      // Handle authentication result
      if (result.error === "CredentialsSignin") {
        setError("Your credentials are wrong.");
      } else if (result.error) {
        setError("An unknown error occurred.");
      } else {
        router.push("/");
      }
    } else {
      setLoginProgress(false);
    }
  };

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter Your userName..."
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={loginProgress}
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
          disabled={loginProgress}
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
            disabled={loginProgress}
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

        <button type="submit" className="mt-2" disabled={loginProgress}>
          Login
        </button>

        {/* <button onClick={handleContinueAsGuest} disabled={loginProgress}>
          Continue as Guest
        </button> */}

        <div className="my-4 text-center text-gray-500 text-xl">
          Or login with...
        </div>
        <button
          type="button"
          className="flex gap-4 justify-center items-center"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          disabled={loginProgress}
        >
          <Image src={"/google.png"} alt="google icon" width={32} height={32} />
          Login With Google
        </button>
        <hr className="mt-7" />
        <p className="text-gray-400 text-md text-center font-semibold my-5">
          Don't have an Account?
          <Link className="text-primary ml-2 underline" href="/register">
            Register &raquo;
          </Link>
        </p>
        {error && (
          <div className="bg-gray-100 h-fit p-4 my-4 w-full">
            <p
              className={`
 text-red-600 text-4xl font-bold `}
            >
              {error}
            </p>
          </div>
        )}
      </form>
    </section>
  );
};

export default Login;
