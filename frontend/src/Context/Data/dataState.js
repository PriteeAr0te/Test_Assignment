import React, { useState, useEffect } from "react";
import dataContext from "./dataContext";

const useDataState = () => {
  const BASE_URL = "https://datavisualization-service1852.onrender.com";
  const dataInitial = [];
  const [data, setData] = useState(dataInitial);

  const getData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/getdata/data`, {
        method: "GET",
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, getData };
};

const DataState = (props) => {
  const dataHook = useDataState();

  return (
    <dataContext.Provider value={dataHook}>
      {props.children}
    </dataContext.Provider>
  );
};

export default DataState;
