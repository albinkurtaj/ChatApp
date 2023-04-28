import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
//import { useQuery, gql } from "@apollo/react-hooks";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import SignIn from "./components/signIn.js";
import Hello from "./components/hello";
import CreateUser from "./components/signUp.js";
import Chat from "./components/chats.js";
import SelectChat from "./components/selectChat.js";
import InsertChat from "./components/insertChat.js";
import CreateChat from "./components/createChat.js";

import { useCookies } from "react-cookie";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hello />} />
          {/* <Route index element={<Hello />} /> */}
          <Route path="signin" element={<SignIn />}>
            <Route path="selectchat" element={<SelectChat />} />
            {/* <Route path="signup" element={<CreateUser />} /> */}
            <Route path="insertchat" element={<InsertChat />} />
            <Route path="createchat" element={<CreateChat />} />

            <Route path="chat" element={<Chat />} />
          </Route>
          <Route path="signup" element={<CreateUser />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}
//
