import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function useAuthenticator() {
  const getToken = () => {
    const tokenString = localStorage.getItem("appCertificate");
    // const userToken = JSON.parse(tokenString);
    return tokenString;
  };

  const decodeToken = (token) => {
    try {
      const decode = jwtDecode(token);
      return decode;
    } catch (error) {
      console.error("Error decoding token:", error);
      return;
    }
  };

  const checkExp = (exp) => {
    const currentTime = new Date().getTime() / 1000;
    return exp > currentTime ? true : false;
  };

  const [token, setToken] = useState(getToken());
  const [decode, setDecode] = useState(decodeToken(token));
  const [authenticated, setAuthenticated] = useState(checkExp(decode?.exp));
  const [firstName, setFirstName] = useState(decode?.first_name);
  const [lastName, setLastName] = useState(decode?.last_name);
  const [userId, setUserId] = useState(decode?.user_id);
  const [userEmail, setUserEmail] = useState(decode?.user_email);
  const [userRole, setUserRole] = useState(decode?.role);

  useEffect(() => {
    setToken(getToken());
    if (token) {
      console.log(token);
      console.log(userRole);
      console.log(authenticated);
      console.log(firstName);
      // const decode = decodeToken(token);
      // const currentTime = new Date().getTime() / 1000;
      if (checkExp(decode?.exp)) {
        if (decode?.role !== "school") {
          setAuthenticated(true);
          setFirstName(decode?.first_name);
          setLastName(decode?.last_name);
          setUserId(decode?.user_id);
          setUserEmail(decode?.user_email);
          setUserRole(decode?.role);
        } else {
          setAuthenticated(true);
          setFirstName(decode?.first_name);
          setUserEmail(decode?.user_email);
          setUserRole(decode?.role);
          setUserId(decode?.user_id);
        }
      } else {
        setAuthenticated(false);
        setFirstName(null);
        setLastName(null);
        // localStorage.clear();
      }
    } else {
      // localStorage.clear();
      setAuthenticated(false);
      setFirstName("");
      setLastName("");
      setUserId("");
      setUserEmail("");
    }
    // if (!token) {
    //   setToken(localStorage.getItem("appCertificate"));
    // }
  }, [
    token,
    authenticated,
    firstName,
    lastName,
    userId,
    userRole,
    setAuthenticated,
    setToken,
  ]);
  return {
    token,
    authenticated,
    firstName,
    lastName,
    userId,
    userRole,
    setAuthenticated,
    setToken,
  };
}
export default useAuthenticator;
