import RegisterForm from '../../registerForm';

const naviItem: Array<keyof typeof naviRouteContent> = [
  '공지사항',
  '대기실',
  '잡담게시판',
];

const naviRouteContent = {
  공지사항: <RegisterForm />,
  대기실: <p>대기실임</p>,
  잡담게시판: <p>잡담임</p>,
};

export { naviItem, naviRouteContent };
