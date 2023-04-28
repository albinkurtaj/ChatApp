import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import React, { useEffect, useState, useLayoutEffect } from "react";
import * as ReactDOM from "react-dom/client";
import Chat from "./chats.js";

import { withCookies, useCookies, Cookies } from "react-cookie";

const GET_CHAT = gql`
  query {
    chatlogs {
      _id
      person1
      person2
      content
    }
  }
`;

const ADDING_CHAT = gql`
  mutation insertChat(
    $person1: String!
    $person2: String!
    $user1: String!
    $user2: String!
    $whoWrote: String!
  ) {
    insertChat(
      person1: $person1
      person2: $person2
      user1: $user1
      user2: $user2
      whoWrote: $whoWrote
    )
  }
`;

const GGG = gql`
  query gethistoryM($user: String!, $password: String!) {
    gethistoryM(user: $user, password: $password)
  }
`;

function InsertChat() {
  const [me, setMe] = useCookies("user");
  const [they, setThey] = useCookies("they");

  let person1Input;

  const {
    loading: loading1,
    error: error1,
    data: data1,
    refetch,
  } = useQuery(GET_CHAT);

  const [insertChat, { data, loading, error }] = useMutation(ADDING_CHAT, {
    onCompleted(data) {
      refetch({});
    },
  });
  if (loading || loading1) return <Chat />;

  if (error || error1) return `Submission error! ${error.message}`;

  return (
    <div>
      <Chat />

      <form
        onSubmit={(e) => {
          e.preventDefault();

          insertChat({
            variables: {
              person1: person1Input.value,
              person2: "",
              user1: me.user,
              user2: they.they,
              whoWrote: me.user,
            },
          });

          person1Input.value = "";
        }}
      >
        <div className="column1">
          <input
            className="input2"
            ref={(node) => {
              person1Input = node;
            }}
            placeholder="message"
          />

          <button className="button" type="submit">
            send
          </button>
        </div>
      </form>
    </div>
  );
}

export default withCookies(InsertChat);
