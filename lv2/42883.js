// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/42883

function solution(number, k) {
  // NOTE: 조합인 줄 알았는데, stack + greedy가 정답임!
  const stack = [];
  const selectAmount = number.length - k;
  let remainingRemovals = k; // 제거 가능한 숫자의 남은 개수

  for (let current of number) {
    // stack에서 현재 숫자보다 작은 수 제거
    while (remainingRemovals > 0 && current > stack.at(-1)) {
      stack.pop();
      remainingRemovals -= 1; // 제거된 숫자 증가
    }

    stack.push(current);
  }

  return stack.slice(0, selectAmount).join("");
}
