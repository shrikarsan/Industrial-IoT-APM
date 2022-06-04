import React, { useState, createContext } from "react";
import client from "api/client";

export const GetSensorsContext = createContext();

export const GetSensorsContextProvider = function (props) {
  const [allSensors, setAllSensors] = useState();

  const getAllSensors = async () => {
    await client
      .get("/sensors")
      .then((response) => {
        setAllSensors(response.data);
      })
      .catch((err) => {
        console.log("Unable to get all sensors");
      });
  };

  return (
    <GetSensorsContext.Provider
      value={{
        allSensors,
        getAllSensors,
      }}
    >
      {props.children}
    </GetSensorsContext.Provider>
  );
};
