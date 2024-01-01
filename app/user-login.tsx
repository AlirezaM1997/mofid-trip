import React from "react";
import UserLoginForm from "@organisms/user-login-form";
import { useSession } from "@src/context/auth";
import { Redirect } from "expo-router";

const LoginScreen = () => {
  const { session } = useSession();
  
  if (session) return <Redirect href="/" />;

  return <UserLoginForm />;
};
export default LoginScreen;
