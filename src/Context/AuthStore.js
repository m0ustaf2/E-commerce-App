import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [userData, setUserData] = useState(null);
  const saveUserData=()=>{
    let encodedToken = localStorage.getItem("userToken");
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
    localStorage.setItem("userData", JSON.stringify(decodedToken));
  }
  let logout = () => {
    localStorage.removeItem("userToken");
    setUserData(null);
    return <Navigate to="/login" />;
  };
  
  useEffect(() => {
    if (localStorage.getItem("userToken") !== null && userData == null) {
      saveUserData();
    }
  }, []);
  return (
    <AuthContext.Provider value={{ userData, saveUserData, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
