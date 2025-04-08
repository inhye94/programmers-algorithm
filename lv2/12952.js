// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/12952
// 풀이 도움: https://velog.io/@youngcheon/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-N-Queen-JavaScript-DFS
// 풀이 도움: https://school.programmers.co.kr/questions/24716

function solution(n) {
  let count = 0;
  const arr = []; // 성능을 위해 1차원 배열로 사용 (index = row, value = column)

  function dfs(depth) {
    // NOTE: 종료 조건
    if (depth === n) {
      count++;
      return;
    }

    // NOTE: 각 행에 대해 가능한 열을 탐색
    for (let i = 0; i < n; i++) {
      arr[depth] = i;
      let valid = true;

      for (let j = 0; j < depth; j++) {
        if (isSameCol(arr, j, depth) || isInDiagonal(arr, j, depth)) {
          valid = false;
          break;
        }
      }

      if (valid) {
        dfs(depth + 1);
      }
    }
  }

  dfs(0);

  return count;
}

// NOTE: 계산함수 - 세로 체크
function isSameCol(arr, rowA, rowB) {
  return arr[rowA] === arr[rowB];
}

// NOTE: 계산함수 - 대각선 체크 (기울기가 1이면, 가로 간격 = 세로 간격)
function isInDiagonal(arr, rowA, rowB) {
  return Math.abs(arr[rowA] - arr[rowB]) === Math.abs(rowA - rowB);
}
