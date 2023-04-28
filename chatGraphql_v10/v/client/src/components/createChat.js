import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import React, { useEffect, useState, useLayoutEffect } from "react";
import * as ReactDOM from "react-dom/client";

import { withCookies, useCookies, Cookies } from "react-cookie";

import { Outlet, Link } from "react-router-dom";

const CREATING_CHAT = gql`
  mutation m10($user1: String, $user2: String) {
    createChat(user1: $user1, user2: $user2)
  }
`;

function CreateChat() {
  const [me, setMe] = useCookies("user");
  const [they, setThey] = useCookies("they");

  let person2Input;

  const [createChat, { data, loading, error }] = useMutation(CREATING_CHAT);

  if (loading) return "loading...";

  if (error) return `Submission error! ${error.message}`;

  return (
    <div className="column">
      <form
        onSubmit={(e) => {
          e.preventDefault();

          //setThey("they", person2Input.value, { path: "/" });

          createChat({
            variables: {
              user1: me.user,
              user2: person2Input.value,
            },
          });

          person2Input.value = "";
        }}
      >
        <input
          className="input3"
          ref={(node) => {
            person2Input = node;
          }}
          placeholder="enter the username of who you want to chat to"
        />

        <button className="button" type="submit">
          create
        </button>
      </form>

      {/* <Link to="/selectchat">select chat</Link>
      <p></p>
      <Link to="/insertchat">start chat</Link> */}
    </div>
  );
}
export default withCookies(CreateChat);
