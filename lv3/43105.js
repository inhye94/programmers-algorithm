// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/43105

// NOTE: DFS를 사용한 풀이 - 시간 복잡도 O(2^n)
function solutionDFS(triangle) {
  const endStep = triangle.length;
  let max = 0;

  function dfs(sum, depth, index) {
    if (depth === endStep) {
      max = Math.max(max, sum);
      return;
    }

    dfs(sum + triangle[depth][index], depth + 1, index);
    dfs(sum + triangle[depth][index + 1], depth + 1, index + 1);
  }

  dfs(triangle[0][0], 1, 0);

  return max;
}

// NOTE: DP를 사용한 풀이 - 시간 복잡도 O(n^2)
// 깊은 복사를 쓰면, 원본 보존으로 안전하지만 시간이 오래 걸림
// 그래서 원본을 수정하는 방법을 사용함
// 원본유지를 했음에도 불구하고, 효율성 통과가 되지 않는 이유는 속도가 느려서 그럼
function solutionDP(triangle) {
  for (let i = triangle.length - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      triangle[i][j] += Math.max(triangle[i + 1][j], triangle[i + 1][j + 1]);
    }
  }

  return triangle[0][0];
}
