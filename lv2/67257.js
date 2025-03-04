// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/67257

// NOTE: 데이터 함수 - 문자와 연산자 분리
function parseExpression(expression) {
  return expression.split(/(\D)/);
}

// NOTE: 계산 함수 - 두 숫자의 연산
function calculate(left, right, operator) {
  // 숫자로 변환
  left = Number(left);
  right = Number(right);

  if (operator === "*") return left * right;
  if (operator === "+") return left + right;
  return left - right;
}

// NOTE: 비즈니스 로직 - 우선순위 적용 계산
function evaluateExpression(exp, priority) {
  let copyExp = exp.slice(); // 복사

  for (let operator of priority) {
    // 연산자가 있는 경우에만
    while (copyExp.includes(operator)) {
      // 연산자 위치 찾기
      const index = copyExp.indexOf(operator);

      // 연산
      let result = calculate(copyExp[index - 1], copyExp[index + 1], operator);

      // 결과 반영
      copyExp.splice(index - 1, 3, result);
    }
  }

  return Math.abs(copyExp[0]);
}

function solution(expression) {
  let max = 0;
  let exp = parseExpression(expression);

  // 우선순위
  const priority = [
    ["+", "-", "*"],
    ["+", "*", "-"],
    ["-", "+", "*"],
    ["-", "*", "+"],
    ["*", "-", "+"],
    ["*", "+", "-"],
  ];

  // 모든 연산자 우선순위에 대해 최대값 찾기
  for (let i = 0; i < priority.length; i++) {
    max = Math.max(max, evaluateExpression(exp, priority[i]));
  }

  return max;
}
