import * as userService from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    userService.logout();
    navigate("/home");
  });
}
