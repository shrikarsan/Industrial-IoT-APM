import React, { useState, createContext } from "react";
import client from "api/client";

export const GetMachinesContext = createContext();

export const GetMachinesContextProvider = function (props) {
  const [allMachines, setAllMachines] = useState();

  const getAllMachines = async () => {
    await client
      .get("/machines")
      .then((response) => {
        setAllMachines(response.data);
      })
      .catch((err) => {
        console.log("Unable to get all machines");
      });
  };

  return (
    <GetMachinesContext.Provider
      value={{
        allMachines,
        getAllMachines,
      }}
    >
      {props.children}
    </GetMachinesContext.Provider>
  );
};
