// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/118667

function solution(queue1, queue2) {
  let sum1 = queue1.reduce((acc, cur) => acc + cur, 0);
  let sum2 = queue2.reduce((acc, cur) => acc + cur, 0);
  const total = [...queue1, ...queue2];

  // NOTE: 상태 - index (queue1, queue2), count
  let count = 0;
  let q1Index = 0;
  let q2Index = queue1.length;

  // NOTE: 어느 한 큐라도 비었다면 / 인덱스가 배열 범위를 넘었다면 / 두 인덱스가 만난다면 => 종료
  while (
    sum1 != 0 &&
    sum2 != 0 &&
    q1Index < total.length &&
    q2Index < total.length &&
    q1Index != q2Index
  ) {
    if (sum1 > sum2) {
      const temp = total[q1Index];
      sum1 -= temp;
      sum2 += temp;
      q1Index += 1;
    } else if (sum1 < sum2) {
      const temp = total[q2Index];
      sum2 -= temp;
      sum1 += temp;
      q2Index += 1;
    } else if (sum1 === sum2) {
      return count;
    }

    count += 1;
  }

  return -1;
}
