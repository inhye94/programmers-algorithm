// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/12923
function solution(begin, end) {
  const stack = [];

  for (let i = begin; i <= end; i++) {
    let max = 1;

    for (let j = 2; j <= Math.sqrt(i); j++) {
      // NOTE: 약수가 아니면 넘어가기
      if (i % j === 0) {
        const divValue = i / j;

        // NOTE: 순서는 항상 divValue 부터 검사
        if (divValue <= 10_000_000) {
          max = Math.max(max, divValue);
          break; // NOTE: 최초의 10,000,000 이하 약수를 찾고 종료. 계속 진행하면, 점점 값이 작아짐
        } else if (j <= 10_000_000) {
          max = Math.max(max, j);
        }
      }
    }

    stack.push(i === 1 ? 0 : max);
  }

  return stack;
}
