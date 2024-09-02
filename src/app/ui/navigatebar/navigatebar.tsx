'use client';

import React, { useState } from 'react';
import { naviItem, naviRouteContent } from './naviLiteral/naviItem';

const NavigateBar: React.FC = () => {
  const [viewContent, setViewContent] = useState<keyof typeof naviRouteContent>(
    naviItem[0],
  );

  const navi: Array<keyof typeof naviRouteContent> = naviItem;

  const changeContent = (item: keyof typeof naviRouteContent) => {
    setViewContent(item);
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Navigation Bar */}
      <div className="basis-1/5 bg-gray-100 p-4">
        <ul className="list-none">
          {navi.map((item, index) => (
            <li
              className="cursor-pointer hover:bg-gray-200 p-4"
              key={index}
              onClick={() => {
                changeContent(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="basis-4/5 p-8">
        {naviRouteContent[viewContent] || <div>페이지를 찾을 수 없습니다.</div>}
      </div>
    </div>
  );
};

export default NavigateBar;
