import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import * as ReactDOM from "react-dom/client";
import { instanceOf } from "prop-types";
import "./chats.css";

import { withCookies, useCookies, Cookies } from "react-cookie";

import { Outlet, Link } from "react-router-dom";

const GGG = gql`
  query gethistoryM($user: String!, $password: String!) {
    gethistoryM(user: $user, password: $password)
  }
`;

function SelectChat() {
  const [me, setMe] = useCookies("user");
  const [they, setThey] = useCookies("they");
  let theyInput;
  const formRef = useRef(null);

  return (
    <div>
      cookies in use:{me.user} dhe {they.they}
      <form
      className="column"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();

          setThey("they", theyInput.value, { path: "/" });

          theyInput.value = "";
          formRef.current.setAttribute("action", "/signin/selectchat");
          formRef.current.submit();
        }}
      >
        <input
          className="input1"
          ref={(node) => {
            theyInput = node;
          }}
          placeholder="enter your friend's username"
        />

        <button className="button" type="submit">
          get chat
        </button>
      </form>
      {/* <button className="button">
        <Link to="/signin/chat">go to chat</Link>
      </button> */}
    </div>
  );
}

export default withCookies(SelectChat);
