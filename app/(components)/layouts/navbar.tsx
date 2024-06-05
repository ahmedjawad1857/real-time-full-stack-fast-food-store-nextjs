"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const session = useSession();
  console.log(session);
  const status: string = session.status;
  const userData: any = session.data?.user;
  const userName: string[] = userData?.name.split(" ")[0] || userData?.email;
  return (
    <>
      <header className="flex item-center justify-between -m-4 mt-1">
        <nav className="flex gap-8 text-gray-500 font-semibold items-center">
          {/* <Link href={"/"} className="text-primary font-semibold text-2xl">
            Pizza Time
          </Link> */}
          <Link href={"/"}>
            <Image
              src="/transparent-logo.png"
              alt="logo"
              width={100}
              height={100}
              className="bg-transparent-image"
            />
          </Link>
          {/* <LogoIcon /> */}
          <Link
            href={"/"}
            className="hover:text-primary transition hover:scale-125 relative duration-300 group "
          >
            Home
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
          </Link>
          <Link
            href={"/"}
            className="hover:text-primary transition hover:scale-125 relative duration-300 group "
          >
            Menu
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
          </Link>
          <Link
            href={"/"}
            className="hover:text-primary transition hover:scale-125 relative duration-300 group "
          >
            About Us
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
          </Link>
          <Link
            href={"/contactUs"}
            className="hover:text-primary transition hover:scale-125 relative duration-300 group "
          >
            Contact Us
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
          </Link>
        </nav>

        <nav className="flex gap-4 text-gray-500 font-semibold items-center ">
          {status === "authenticated" ? (
            <>
              <Link
                href={"/profile"}
                className="whitespace-nowrap hover:text-primary transition hover:scale-125 relative duration-300 group "
              >
                Hello, {userName}
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
              </Link>
              <button
                onClick={() => signOut()}
                className="bg-primary  border-0  text-white px-8 py-2 rounded-full hover:bg-orange-200 hover:text-primary transition-transform hover:scale-110 "
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href={"/login"}
                className="hover:text-primary transition hover:scale-125 relative duration-300 group "
              >
                Login
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-600"></span>
              </Link>
              <Link
                href={"/register"}
                className="bg-primary border-0 text-white px-8 py-2 rounded-full hover:bg-orange-200 hover:text-primary transition-transform hover:scale-110 "
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;
