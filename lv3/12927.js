// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/12927

function solution(n, works) {
  // 순서대로 나열
  const descWorks = [...works].sort((a, b) => b - a);
  let remainTimes = n;

  // 업무 시간이 끝나거나 업무를 모두 끝마칠 때까지
  while (remainTimes && firstItem(descWorks)) {
    const max = firstItem(descWorks);

    for (let i = 0; i < descWorks.length; i++) {
      if (descWorks[i] >= max) {
        descWorks[i]--;
        remainTimes--;
      }

      // 업무 시간이 끝난 경우
      if (!remainTimes) break;
    }
  }

  return firstItem(descWorks) === 0
    ? 0
    : descWorks.reduce((acc, cur) => acc + cur ** 2, 0);
}

const firstItem = (arr) => arr[0];
