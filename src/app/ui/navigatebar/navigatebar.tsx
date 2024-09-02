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
    <div>
      <div>
        <ul>
          {navi.map((item, index) => (
            <li
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
      {naviRouteContent[viewContent] || <div>페이지를 찾을 수 없습니다.</div>}
    </div>
  );
};

export default NavigateBar;
