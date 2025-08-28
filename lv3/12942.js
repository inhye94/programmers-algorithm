// 시작: 2025.08.28 am 10:48 - 11:20 (32분 / 26분)
function solution(matrix_sizes) {
  const n = matrix_sizes.length;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  for (let len = 1; len < n; len++) {
    for (let i = 0; i + len < n; i++) {
      const j = i + len;
      dp[i][j] = Infinity;
      for (let k = i; k < j; k++) {
        const cost =
          matrix_sizes[i][0] * matrix_sizes[k][1] * matrix_sizes[j][1];
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + cost);
      }
    }
  }

  return dp[0][n - 1];
}

console.log(
  solution([
    [5, 3],
    [3, 10],
    [10, 6],
  ])
); // 270

// 내 풀이: 그리디

// 5x3, 3x10, 10x6 /axb 먼저 > 150 + 300 = 450(5*3*10 + 5*10*6) / bxc > 180 + 90 = 270 (3*6*10 + 5*3*6)
// [x1, y1], [x2, y2], [x3, y3] ... [xn, yn]

// 순서대로 합: x1 * y1 * y2 + x2 * y2 * y3 + ... + xn-1 * yn-1 * yn
// 역순으로 합: x1 * x2 * y2 + x2 * x3 * y3 + ... + xn-1 * xn * yn

// --------------------------------------------------------

// 정답: DP

// 내가 푼 방식은 그리디 방식이라서 반례가 존재함. ㅠㅜ
// dp[i][j] = i번째 행렬부터 j번째 행렬까지 곱하는 최소 연산 횟수
// 점화식: dp[i][j] = Math.min(dp[i][k] + dp[k+1][j] + 곱셈 비용) (i <= k < j);
// 곱셈 비용 = matrix_sizes[i][0] * matrix_sizes[k][1] * matrix_sizes[j][1];
// 즉, 단순히 (i번째 행렬 × j번째 행렬) 한 번의 곱이 아니라, i~j 범위 전체를 곱하는 최소 비용을 의미

/**
 * i~j 범위를 k에서 잘라서
왼쪽 부분: i~k
오른쪽 부분: k+1~j
로 나누었다고 할게요.

그럼 i~j 전체를 계산하려면:
먼저 왼쪽 부분 전체를 곱해서 하나의 행렬을 만들어야 합니다 → 비용 = dp[i][k]
그리고 오른쪽 부분 전체도 곱해서 하나의 행렬을 만들어야 합니다 → 비용 = dp[k+1][j]
마지막으로, 왼쪽 결과 행렬 × 오른쪽 결과 행렬을 곱해야 합니다 → 비용 = (곱셈 비용)
 */

/**
 * 비유로 이해해보면,
행렬 곱셈을 “작업 공정”이라고 생각해보자.

왼쪽 공정(i~k)을 끝내는 데 드는 비용 = dp[i][k]
오른쪽 공정(k+1~j)을 끝내는 데 드는 비용 = dp[k+1][j]
이 두 결과물을 합치는 추가 비용 = 곱셈 비용

즉, 전체 공정을 끝내려면 “왼쪽 비용 + 오른쪽 비용 + 합치는 비용”을 다 합해야 한다는 뜻이다.
 */
