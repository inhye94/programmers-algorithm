// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/12900

function solution(n) {
  // 헉 dp 인가봐.
  // NOTE: 배열을 사용하면, 공간 복잡도가 O(n)이 된다.
  let a = 1;
  let b = 2;
  let temp;

  for (let i = 3; i <= n; i++) {
    temp = (a + b) % 1000000007;
    [a, b] = [b, temp]; // a > b, b > temp로 교체
  }

  return b;
}
