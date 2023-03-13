import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function useAuthenticator() {
  const [authenticated, setAuthenticated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState(localStorage.getItem("appCertificate"));
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      const currentTime = new Date().getTime() / 1000;
      if (decode.exp > currentTime) {
        setAuthenticated(true);
        setFirstName(decode.first_name);
        setLastName(decode.last_name);
        setUserId(decode.user_id);
        setUserEmail(decode.user_email);
        setUserRole(decode.role);
      } else {
        setAuthenticated(false);
        setFirstName(null);
        setLastName(null);
        localStorage.clear();
      }
    } else {
      localStorage.clear();
      setAuthenticated(false);
      setFirstName("");
      setLastName("");
      setUserId("");
      setUserEmail("");
    }
    if (!token) {
      setToken(localStorage.getItem("appCertificate"));
    }
  }, [token]);

  return {
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
