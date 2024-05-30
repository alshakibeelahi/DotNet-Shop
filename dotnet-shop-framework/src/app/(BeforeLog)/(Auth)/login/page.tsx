"use client"
import Login from "@/Components/BeforeLog/(Auth)/Login/Login";
import { useSearchParams } from "next/navigation";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "product";
  console.log("redirectTo", redirectTo);
  return (
    <div>
      <Login path={redirectTo}/>
    </div>
  );
};

export default LoginPage;
