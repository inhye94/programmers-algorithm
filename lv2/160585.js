// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/160585

function solution(board) {
  let onlyOX = board.join("").replaceAll(".", "");
  let oCount = [...onlyOX].filter((char) => char === "O").length;
  let xCount = onlyOX.length - oCount;

  // X 또는 O를 한 텀 건너뛴 경우
  if (oCount < xCount || oCount > xCount + 1) {
    return 0;
  }

  const oWin = checkWin("O", board);
  const xWin = checkWin("X", board);

  // 둘 다 승리하는 경우 > 불가능
  if (oWin && xWin) return 0;

  // O가 이겼는데, X를 한번 더 두는 경우 > 불가능
  if (oWin && oCount !== xCount + 1) return 0;

  // X가 이겼는데, O를 더 두는 경우 > 불가능
  if (xWin && oCount !== xCount) return 0;

  return 1;
}

function checkWin(char, board) {
  // 가로 확인
  if (board.some((row) => row === char.repeat(3))) return true;

  // 세로 확인
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === char && board[1][i] === char && board[2][i] === char) {
      return true;
    }
  }

  // 대각선 확인
  if (board[0][0] === char && board[1][1] === char && board[2][2] === char) {
    return true;
  }
  if (board[0][2] === char && board[1][1] === char && board[2][0] === char) {
    return true;
  }

  return false;
}
