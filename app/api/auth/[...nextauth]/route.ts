// app/api/auth/[...nextauth]/route
import mongooseConnection from "@/mongoose-config/page";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { userModel } from "../../../../models/user-schema";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/mongoConnect";

const handler = NextAuth({
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || " ",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        userName: {
          label: "UserName",
          type: "string",
          placeholder: "John Doe",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        const { userName,email, password } = credentials;

        console.log(credentials);
        mongooseConnection();
        const user = await userModel.findOne({ email });
        const passwordOk: boolean =
          user && bcrypt.compareSync(password, user.password);
        console.log("passwordOk", passwordOk);
        if (passwordOk && user.userName === userName) {
          console.log("user", user);

          return user;
        }
        return null;
      },
    }),
  ],
});

export { handler as GET, handler as POST };
