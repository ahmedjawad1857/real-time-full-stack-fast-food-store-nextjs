"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useState } from "react";

const Profile = () => {
  const [bgColor, setBgColor] = useState<string>("");
  const session: any = useSession();
  const userImage: any = session.data?.user?.image;
  const userN: any = session.data?.user?.email;
  const [userName, setUserName] = useState<string>(
    session.data?.user?.name || ""
  );
  const colorOptions = [
    "rgb(255, 0, 0)", // Red
    "rgb(0, 255, 0)", // Green
    "rgb(0, 0, 255)", // Blue
    "rgb(255, 255, 0)", // Yellow
    "rgb(255, 0, 255)", // Magenta
    "rgb(0, 255, 255)", // Cyan
    "rgb(128, 128, 128)", // Gray
  ];

  const generateRandomColor = (): void => {
    const randomIndex = Math.floor(Math.random() * colorOptions.length);
    setBgColor(colorOptions[randomIndex]);
  };

  const handleProfileInfoUpdate = async (ev: any) => {
    ev.preventDefault();
    await fetch("/api/profile", {
      method: "PUT",
      body: JSON.stringify({ name: userName }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //   const generateImageWithInitialLetter = (name: any, bgColor: string) => {
  //     const canvas = document.createElement("canvas");
  //     const ctx: any = canvas.getContext("2d");
  //     canvas.width = 200;
  //     canvas.height = 200;
  //     ctx.fillStyle = bgColor;
  //     ctx.fillRect(0, 0, canvas.width, canvas.height);
  //     ctx.fillStyle = "white";
  //     ctx.font = "bold 80px Arial";
  //     ctx.textAlign = "center";
  //     ctx.textBaseline = "middle";
  //     ctx.fillText(
  //       name.charAt(0).toUpperCase(),
  //       canvas.width / 2,
  //       canvas.height / 2
  //     );
  //     return canvas.toDataURL();
  //   };

  if (session.status === "loading") {
    return (
      <h1 className="text-center text-primary text-4xl mb-4">Loading... </h1>
    );
  } else if (session.status === "unauthenticated") {
    redirect("/login");
  }
  //   const handleImageError = () => {
  //     // If image fails to load, generate an image with the initial letter
  //     const newDataUrl = generateImageWithInitialLetter(
  //       session.data?.user?.name?.split(" ")[0],
  //       bgColor
  //     );
  //     setBgColor(generateRandomColor());
  //     return newDataUrl;
  //   };
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
      <div className="max-w-md mx-auto">
        <div className="flex gap-4 items-center">
          <div>
            <div className=" p-2 rounded-lg relative">
              {userImage ? (
                <Image
                  className="rounded-lg w-full h-full mb-2"
                  src={userImage}
                  alt="Avatar"
                  width={200}
                  height={200}
                />
              ) : (
                <div
                  style={{
                    backgroundColor: bgColor,
                  }}
                  className="rounded-lg w-20 h-20 text-white justify-center items-center text-xl font-bold "
                >
                  {userN.charAt(0).toUpperCase()}
                </div>
              )}
              <button type="button">Edit</button>
            </div>
          </div>
          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="First and Last Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              value={session.data?.user?.email}
              disabled={true}
              placeholder="First and Last Name"
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Profile;
