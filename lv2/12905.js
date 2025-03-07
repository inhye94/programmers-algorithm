// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/12905

// 후기: DP는 셍각도 못했다. 다음에 다시 풀어보기🔥

// NOTE: DP - 시간 복잡도 O(n ** 2);
function o2Solution(board) {
  const row = board.length;
  const col = board[0].length;
  let maxWidth = 0;

  // dp의 item = 정사각형 최대 너비
  const dp = Array.from({ length: row }, () => Array(col).fill(0));

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (board[i][j] === 1) {
        // 맨 윗줄, 맨 왼쪽은 그대로 출력
        if (i === 0 || j === 0) {
          dp[i][j] = 1;
        } else {
          dp[i][j] = Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]) + 1;
        }

        // 최대 너비 갱신
        maxWidth = Math.max(maxWidth, dp[i][j]);
      }
    }
  }

  return maxWidth * maxWidth;
}

// NOTE: 시간 복잡도 O(n ** 3);
function o3solution(board) {
  let max = 0;
  const size = {
    row: board.length,
    col: board[0].length,
  };

  for (let i = 0; i < size.row; i++) {
    let width = 0;
    for (let j = 0; j < size.col; j++) {
      if (board[i][j] === 0) {
        continue;
      }

      // 너비 구하기
      let col = j;
      do {
        width += 1;
        col += 1;
      } while (col < size.col && board[i][col] === 1);

      // 정사각형인지 확인
      let flag = true;
      let k = i;
      const limit = {
        k: Math.min(i + width, size.row),
        z: Math.min(j + width, size.col),
      };

      let stack = [];
      while (flag && k < limit.k) {
        let z = j;
        while (z < limit.z) {
          if (board[k][z] === 0) {
            flag = false;
            width = 0;
            stack = [];
          } else {
            stack.push(1);
          }
          z += 1;
        }

        k += 1;
      }

      // max 갱신
      if (flag) {
        max = Math.max(max, stack.length);
      }
    }
  }

  return max;
}
