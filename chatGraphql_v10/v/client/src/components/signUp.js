import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import React, { useEffect, useState, useLayoutEffect } from "react";
import * as ReactDOM from "react-dom/client";

const CREATE_USER = gql`
  mutation createUser($user: String, $password: String) {
    createUser(user: $user, password: $password) {
      _id
      user
      password
    }
  }
`;

export default function CreateUser() {
  let userInput;
  let passwordInput;

  const [insertChat, { data, loading, error }] = useMutation(CREATE_USER);

  if (loading) return "loading...";

  if (error) return `Submission error! ${error.message}`;

  return (
    <div>
      <form
        className="column"
        onSubmit={(e) => {
          e.preventDefault();

          insertChat({
            variables: {
              user: userInput.value,
              password: passwordInput.value,
            },
          });

          userInput.value = "";
          passwordInput.value = "";
        }}
      >
        <input
          className="input1"
          ref={(node) => {
            userInput = node;
          }}
          placeholder="enter your new user name"
        />

        <input
          className="input1"
          ref={(node) => {
            passwordInput = node;
          }}
          placeholder="enter password"
        />

        <button className="button" type="submit">
          create user
        </button>
      </form>
    </div>
  );
}
