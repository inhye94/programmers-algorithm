// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/131128

// 2024 답
function solution(X, Y) {
  // 상태: 개수, 정수
  const xTable = countDigits(X);
  const yTable = countDigits(Y);

  // 공통숫자 큰 순서대로 나열
  const answer = xTable
    .map((count, digit) =>
      digit.toString().repeat(Math.min(count, yTable[digit]))
    )
    .reverse()
    .join("");

  // 짝꿍이 없는 경우 "-1", 모든 짝꿍이 0인 경우 "0"
  if (!answer) return "-1";
  if (answer[0] === "0") return "0";

  return answer;
}

function countDigits(str) {
  const counts = new Array(10).fill(0);

  for (let char of str) {
    counts[Number(char)] += 1;
  }

  return counts;
}

// 이전 답
// function solution(X, Y) {
//   const _count_X = new Array(10).fill(0);
//   const _count_Y = new Array(10).fill(0);

//   for (let i = 0; i < 10; i++) {
//     _count_X[i] = (X + "").split(`${i}`).length - 1;
//     _count_Y[i] = (Y + "").split(`${i}`).length - 1;
//   }

//   const _matchArr = _count_X.map((_, i) => Math.min(_count_X[i], _count_Y[i]));
//   const _max =
//     _matchArr.reduce((acc, cur, i) => (i + "").repeat(cur) + acc, "") || "-1";

//   return _max.replaceAll("0", "") ? _max : "0";
// }
