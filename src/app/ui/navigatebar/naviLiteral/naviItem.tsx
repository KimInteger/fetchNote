import TicTacToeField from '../../minigameAssemble/tictactoe/gameBoard/playField';
import WriteFieldSection from '../../writeField/fieldSection';

const naviItem: Array<keyof typeof naviRouteContent> = [
  '공지사항',
  '대기실',
  '잡담게시판',
];

const naviRouteContent = {
  공지사항: <WriteFieldSection />,
  대기실: <TicTacToeField />,
  잡담게시판: <p>잡담임</p>,
};

export { naviItem, naviRouteContent };
