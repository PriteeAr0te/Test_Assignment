import React, { useState, useEffect } from 'react';
import dataContext from "./dataContext";

const useDataState = () => {
    const host = "http://localhost:5000";
    const dataInitial = [];
    const [data, setData] = useState(dataInitial);

    const getData = async () => {
        try {
            const response = await fetch(`${host}/api/getdata/data`, {
                method: "GET"
            });
            const json = await response.json();
            setData(json);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        getData();
    }, []); 

    return { data, getData };
}

const DataState = (props) => {
    const dataHook = useDataState();

    return (
        <dataContext.Provider value={dataHook}>
            {props.children}
        </dataContext.Provider>
    );
}

export default DataState;
