import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [stationName, setStationName] = useState('');
  const [userData, setUserData] = useState();
  const [machineList, setMachineList] = useState([]);

  return (
    <UserContext.Provider value={{ stationName, setStationName,userData,setUserData,machineList,setMachineList }}>
      {children}
    </UserContext.Provider>
  );
};
