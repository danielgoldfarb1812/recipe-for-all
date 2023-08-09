import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false); // Add a state to trigger refresh

  useEffect(() => {
    fetchUsers();
  }, [refreshFlag]); // Trigger fetchUsers whenever refreshFlag changes

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://doctorbalan.bsite.net/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const refreshContext = () => {
    setRefreshFlag((prevFlag) => !prevFlag); // Toggle refreshFlag to trigger re-render
  };

  return (
    <UserContext.Provider value={{ users, setUsers, refreshContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
