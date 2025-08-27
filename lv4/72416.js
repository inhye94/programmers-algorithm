function solution(sales, links) {
  const dp = Array.from({ length: sales.length + 1 }, () => [0, 0]); // [불참 최소 매출, 참석 최소 매출]

  // 트리 구조로 변환
  const tree = new Map();
  for (const [a, b] of links) {
    if (!tree.has(a)) tree.set(a, []);
    tree.get(a).push(b);
  }

  function dfs(node) {
    // 초기화
    dp[node][0] = 0; // 불참
    dp[node][1] = sales[node - 1]; // 참석

    // 최하단 (리프 노드)
    if (!tree.has(node)) return;

    let diff = Infinity;

    for (let child of tree.get(node)) {
      dfs(child); // 리프 노드 dp 설정

      const cost = Math.min(dp[child][0], dp[child][1]); // 최소 매출

      dp[node][1] += cost; // 내가 참석한 경우
      dp[node][0] += cost;

      diff = Math.min(diff, dp[child][1] - cost); // 참석한 경우와 불참한 경우의 차이
    }

    dp[node][0] += diff;
  }

  dfs(1);

  return Math.min(dp[1][0], dp[1][1]);
}

//
