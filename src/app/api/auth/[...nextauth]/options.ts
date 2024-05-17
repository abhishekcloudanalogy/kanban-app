import { auth } from "@app/utils/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      type: "credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" },
      },
      async authorize(credentials, req) {
        return await signInWithEmailAndPassword(auth, credentials?.email, credentials?.password)
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => console.error(error));
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
