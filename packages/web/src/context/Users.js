import React, { useState, createContext } from "react";
import client from "api/client";

export const GetUsersContext = createContext();

export const GetUsersContextProvider = function (props) {
  const [allUsers, setAllUsers] = useState();

  const getAllUsers = async () => {
    await client
      .get("/users")
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((err) => {
        console.log("Unable to get all users");
      });
  };

  return (
    <GetUsersContext.Provider
      value={{
        allUsers,
        getAllUsers,
      }}
    >
      {props.children}
    </GetUsersContext.Provider>
  );
};
