const naviItem: Array<keyof typeof naviRouteContent> = [
  '패치노트',
  '대기실',
  '잡담게시판',
];

const naviRouteContent = {
  패치노트: <p>이것은 패치 노트이다.</p>,
  대기실: <p>대기실임</p>,
  잡담게시판: <p>잡담임</p>,
};

export { naviItem, naviRouteContent };
