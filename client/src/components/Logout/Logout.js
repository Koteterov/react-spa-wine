import * as userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

export default function Logout() {
  const navigate = useNavigate();
  const { updateNav } = useContext(UserContext);

  useEffect(() => {
    userService.logout();
    updateNav({});
    navigate("/home");
  });
}
