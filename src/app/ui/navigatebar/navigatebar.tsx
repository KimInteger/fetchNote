import React, { useState } from "react";
import naviItem from "./naviLiteral/naviItem";

const NavigateBar : React.FC = () => {
  const navi = naviItem
  
  return(
    <>
      <ul>
        {navi.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  )
}