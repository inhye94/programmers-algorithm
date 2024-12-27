// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/17679

function solution(m, n, board) {
  // 상태: 빈칸, 삭제 여부
  const boardArr = board.map((v) => [...v]); // 빈칸은 0
  let count = 0;
  let check = true; // 루프 종료 플래그

  while (check) {
    check = false;
    const removeArr = Array.from({ length: m }, () => Array(n).fill(false));

    // 2x2 검출
    for (let i = 0; i < m - 1; i++) {
      for (let j = 0; j < n - 1; j++) {
        if (isRemovable(i, j, boardArr)) {
          removeArr[i][j] = true;
          removeArr[i + 1][j] = true;
          removeArr[i][j + 1] = true;
          removeArr[i + 1][j + 1] = true;
          check = true;
        }
      }
    }

    // count
    count += removeArr.flat().filter((v) => v).length;

    // 삭제된 만큼 아래로 이동
    for (let j = 0; j < n; j++) {
      const stack = [];
      for (let i = 0; i < m; i++) {
        if (!removeArr[i][j]) {
          stack.push(boardArr[i][j]);
        }
      }

      for (let i = m - 1; i >= 0; i--) {
        boardArr[i][j] = stack.length ? stack.pop() : 0;
      }
    }
  }

  return count;
}

const isRemovable = (x, y, arr) => {
  const char = arr[x][y];
  return (
    char !== 0 &&
    char === arr[x + 1][y] &&
    char === arr[x][y + 1] &&
    char === arr[x + 1][y + 1]
  );
};
