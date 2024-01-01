import React from "react";
import NgoLoginForm from "@organisms/ngo-login-form";
import { useSession } from "@src/context/auth";
import { Redirect } from "expo-router";

const LoginScreen = () => {
  const { session } = useSession();
  
  if (session) return <Redirect href="/" />;

  return <NgoLoginForm />;
};
export default LoginScreen;
