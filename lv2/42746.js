// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/42746

function solution(numbers) {
  // NOTE: 두 수의 조합을 비교하기
  // NOTE: [0, 0, 0] 인 경우, 0을 출력

  // 문자열로 조합된 결과를 숫자로 암묵적으로 변환함
  const answer = numbers.sort((a, b) => `${b}${a}` - `${a}${b}`).join("");
  return answer[0] === "0" ? "0" : answer;
}
