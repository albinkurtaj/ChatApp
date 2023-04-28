import { Outlet, Link } from "react-router-dom";
import Chat from "./chats";
import "./chats.css";

import { withCookies, useCookies } from "react-cookie";

function Page() {
  const [v, setV, removeV] = useCookies("v");

  function SignOut() {
    removeV("v", { path: "/" });
  }

  return (
    <>
      <div className="column1">
        <button className="button">
          <Link to="/signin/selectchat">select chat</Link>
        </button>

        <div>
          <button className="button">
            <Link to="/signin/insertchat">start chat</Link>
          </button>
        </div>

        <div>
          <button className="button">
            <Link to="/signin/createchat">create chat</Link>
          </button>
        </div>

        <div>
          <button className="button" onClick={SignOut}>
            <Link to="/">Sign out</Link>
          </button>
        </div>

        <div>
          <button className="button">
            <Link to="/">Back Home</Link>
          </button>
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default withCookies(Page);
