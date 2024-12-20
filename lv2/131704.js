// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/131704

function solution(order) {
  let count = 0;
  let pointer = 0;
  const N = order.length;
  const stack = [];

  for (let num = 1; num <= N; num++) {
    stack.push(num);

    let top = stack.at(-1);

    // NOTE: stack 탐색
    while (stack.length > 0 && order[pointer] === top) {
      stack.pop();

      count += 1;
      pointer += 1;

      top = stack.at(-1);
    }
  }

  return count;
}
