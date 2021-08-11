import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../context/UserContext";

const Setting = () => {
  const { user, setUser } = useContext(UserContext);

  return <h1>Settings</h1>;
};

export default Setting;
