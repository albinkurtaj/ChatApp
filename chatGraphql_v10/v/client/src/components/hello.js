import { Outlet, Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./chats.css";

export default function Hello() {
  return (
    <div>
      <div className="column">
        {/* <button className="button">
          <Link to=".">Back Home</Link>
        </button> */}
        <p></p>
        <button className="button">
          <Link to="/signin">Sign in</Link>
        </button>
        <p></p>
        <button className="button">
          <Link to="/signup">Sign up</Link>
        </button>
      </div>
      <div className="column">
        <Outlet />
      </div>
    </div>
  );
}
