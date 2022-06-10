import React, { useState, createContext } from "react";
import client from "api/client";

export const GetSensorReadingsContext = createContext();

export const GetSensorReadingsContextProvider = function (props) {
  const [allSensorReadings, setAllSensorReadings] = useState();

  const getAllSensorReadings = async () => {
    await client
      .get("/readings")
      .then((response) => {
        setAllSensorReadings(response.data);
      })
      .catch((err) => {
        console.log("Unable to get all sensor readings");
      });
  };

  return (
    <GetSensorReadingsContext.Provider
      value={{
        allSensorReadings,
        getAllSensorReadings,
      }}
    >
      {props.children}
    </GetSensorReadingsContext.Provider>
  );
};
