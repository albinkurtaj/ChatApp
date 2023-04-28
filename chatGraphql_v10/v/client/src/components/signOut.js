import { Outlet, Link } from "react-router-dom";
import Chat from "./chats";
import "./chats.css";
import Page from "./userPage";

import { withCookies, useCookies } from "react-cookie";

function SignOut() {
  return <button className="button"> Sign out</button>;
}
