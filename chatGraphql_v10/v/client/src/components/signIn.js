import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import * as ReactDOM from "react-dom/client";
import { Outlet, Link } from "react-router-dom";
import Chat from "./chats";
import "./chats.css";
import Page from "./userPage";

import { withCookies, useCookies } from "react-cookie";

let chatUser = "";
let chatPassword = "";

const GG = gql`
  query q3 {
    gethistory
  }
`;

const GGG = gql`
  query gethistoryM($user: String!, $password: String!) {
    gethistoryM(user: $user, password: $password)
  }
`;

const GGGG = gql`
  {
    gethistoryM(user: "user1", password: "pass")
  }
`;

const SIGN_IN = gql`
  mutation signIn($user: String!, $password: String!) {
    signIn(user: $user, password: $password)
  }
`;

function SignIn() {
  const [meState, setMeState] = useState("no user");
  const [me, setMe] = useCookies("user");
  const [v, setV] = useCookies("v");
  let userInput;
  let passwordInput;
  const formRef = useRef(null);

  const [signIn, { data, loading, error }] = useMutation(SIGN_IN);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (data && JSON.parse(data.signIn[0])) {
      setMe("user", data.signIn[1], { path: "/" });
      console.log(data.signIn[0]);
      setValidation(JSON.parse(data.signIn[0]));
      setV("v", true, { path: "/" });
      console.log(1);
    }
  }, [data]);

  // const {
  //   loading: loading1,
  //   error: error1,
  //   data: data1,
  //   refetch,
  // } = useQuery(GGG, {
  //   pollInterval: 1000,
  // });

  // let validation = false;

  if (loading) return "loading...";
  if (error) return `Submission error! ${error.message}`;

  // if (data && Boolean(data.signIn[0])) {
  //   setMe("user", data.signIn[1], { path: "/" });

  //   console.log(data.signIn[0]);
  //   // chatUser = data.signIn[1];
  //   // chatPassword = data.signIn[2];
  //   validation = JSON.parse(data.signIn[0]);
  // }

  if (v.v) {
    console.log(1);
    console.log(v.v);
    return <Page />;
  }

  return (
    <div>
      <form
        className="container"
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          setMe("user", userInput.value, { path: "/" });
          setMeState(`${me.user}`);

          signIn(
            {
              variables: {
                user: userInput.value,
                password: passwordInput.value,
              },
            }
            // refetch({ user: `${userInput.value}`, password: "12" })
          );

          userInput.value = "";
          passwordInput.value = "";

          formRef.current.setAttribute("action", "/signin");
          formRef.current.submit();
        }}
      >
        <input
          className="input"
          ref={(node) => {
            userInput = node;
          }}
          placeholder="enter your  user name"
        />

        <input
          className="input"
          ref={(node) => {
            passwordInput = node;
          }}
          placeholder="enter  your password"
        />

        <button className="button" type="submit">
          sign in
        </button>
      </form>
    </div>
  );
}

export default withCookies(SignIn);
