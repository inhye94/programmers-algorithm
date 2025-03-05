// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/60058

function solution(p) {
  // 빈 문자열은 그대로 반환
  if (p === "") return p;

  let isBalanced = 0;
  let index = 0;

  // 균형잡힌 괄호 문자열인지 확인
  do {
    isBalanced += p[index++] === "(" ? 1 : -1;
  } while (isBalanced !== 0);

  let u = p.slice(0, index);
  let v = p.slice(index);

  // v에 대해 재귀 또는 단계 따르기
  if (isCorrect(u)) {
    return u + solution(v);
  } else {
    return "(" + solution(v) + ")" + reserve(u);
  }
}

// NOTE: 계산 함수 - 올바른 괄호 문자열인지 확인
function isCorrect(u) {
  let count = 0;

  for (let char of [...u]) {
    count += char === "(" ? 1 : -1;

    // 닫는 괄호가 먼저 오는 경우
    if (count < 0) {
      return false;
    }
  }

  return true;
}

// NOTE: 계산 함수 - 괄호 문자열 뒤집기
function reserve(u) {
  return [...u.slice(1, -1)].map((char) => (char === ")" ? "(" : ")")).join("");
}
