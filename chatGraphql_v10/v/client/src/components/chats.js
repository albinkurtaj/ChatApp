import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import React, { useEffect, useState, useLayoutEffect } from "react";
import * as ReactDOM from "react-dom/client";
import "./chats.css";
import { withCookies, useCookies, Cookies } from "react-cookie";

import { Outlet, Link } from "react-router-dom";

const GG = gql`
  query q3 {
    gethistory
  }
`;

const GGG = gql`
  query gethistoryMM($person1: String!, $person2: String!) {
    gethistoryMM(person1: $person1, person2: $person2)
  }
`;

const GGGG = gql`
  query gethistoryMMM($person1: String!, $person2: String!) {
    gethistoryMMM(person1: $person1, person2: $person2)
  }
`;
function Chat() {
  const [me, setMe] = useCookies("user");
  const [they, setThey] = useCookies("they");
  // const { loading, error, data, refetch } = useQuery(GET_CHAT);
  const { loading, error, data, refetch } = useQuery(GGGG, {
    pollInterval: 1000,

    variables: {
      person1: me.user,
      person2: they.they,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message} :(</p>;

  return (
    <>
      {/* cookies: me {me.user} , they {they.they}, */}
      <div className="my-div">
        <div className="beforemessages">
          <ul>
            <p></p>
          </ul>
        </div>

        <div className="messages1">
          <ul className="my-list">
            {data.gethistoryMMM[0].map((chat) => (
              <li key={chat[1]} className="messageBox">
                {chat[0]}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul>
            <p></p>
          </ul>
        </div>
        <div>
          <ul>
            <p></p>
          </ul>
        </div>

        <div className="right">
          <ul className="my-list">
            {data.gethistoryMMM[1].map((chat) => (
              <li key={chat[1]} className="messageBox">
                {chat[0]}
              </li>
            ))}
          </ul>
        </div>
        <div className="beforemessages">
          <ul>
            <p></p>
          </ul>
        </div>
      </div>
      {/* <Link to="/selectchat">select chat</Link>
      <p></p>
      <Link to="/insertchat">start chat</Link> */}
    </>
  );
}

export default withCookies(Chat);
