// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/68936

function solution(arr) {
  // 문제를 반복적으로 나눠서 분할정복인 듯. 근데 DFS로 풀어보자.
  const n = arr.length;
  const count = [0, 0]; // [0의 개수, 1의 개수]

  // NOTE: 계산함수 (압축 여부 확인)
  const isCompressible = (x, y, size) => {
    const firstValue = arr[x][y];
    for (let i = x; i < x + size; i++) {
      for (let j = y; j < y + size; j++) {
        if (arr[i][j] !== firstValue) return false;
      }
    }
    return true;
  };

  // NOTE: 비즈니스 로직 (쿼드 트리 분할 + count)
  const dfs = (x, y, size) => {
    if (isCompressible(x, y, size)) {
      count[arr[x][y]] += 1;
      return;
    }

    const half = size / 2;
    dfs(x, y, half);
    dfs(x + half, y, half);
    dfs(x, y + half, half);
    dfs(x + half, y + half, half);
  };

  dfs(0, 0, n);
  return count;
}
