import React, { createContext, useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Context/AuthStore";

export default function Profile() {
  let { userData } = useContext(AuthContext);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Profile</title>
      </Helmet>
      <div className={`profile w-75  py-5 p-5 my-5 m-auto text-start`}>
        <h2 className="text-center mb-5">Welcome,{userData?.name}</h2>
        <h3>
          Name : <span className="text-main">{userData?.name}</span>
        </h3>
        <h3 className="my-4">
          Your Id : <span className="text-main">{userData.id}</span>
        </h3>
        <h3>
          Role: <span className="text-main">{userData?.role}</span>
        </h3>
      </div>
    </>
  );
}
