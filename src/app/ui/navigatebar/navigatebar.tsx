'use client'

import React, { ReactEventHandler, ReactNode, useState } from "react";
import naviItem from "./naviLiteral/naviItem";

const NavigateBar : React.FC = () => {
  const [viewContent, setViewContent] = useState<string>(naviItem[0])
  
  const navi : string[] = naviItem
  
  const changeContent = (item : string) => {
    setViewContent(item)
  }
  
  return(
    <>
      <ul>
        {navi.map((item, index) => (
          <li key={index} onClick={()=>{changeContent(item)}}>{item}</li>
        ))}
      </ul>

      {viewContent === naviItem[0] && 
        <div>야호</div>
      }
    </>
  )
}

export default NavigateBar