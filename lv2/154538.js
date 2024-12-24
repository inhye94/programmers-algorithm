// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/154538

function solution(x, y, n) {
  // bfs인가?
  let count = 0;
  const queue = [y];
  const visited = new Set();

  while (queue.length > 0) {
    let nextQueue = [];
    count += 1;

    for (let num of queue) {
      // NOTE: 도달한 경우
      if (num === x) return count - 1;

      // NOTE: 방문여부 확인
      if (visited.has(num)) continue;
      visited.add(num);

      // NOTE: 다음 Queue 준비
      if (num % 2 === 0) {
        nextQueue.push(num / 2);
      }

      if (num % 3 === 0) {
        nextQueue.push(num / 3);
      }

      if (num - n > 0) {
        nextQueue.push(num - n);
      }
    }

    // NOTE: Queue 갱신
    queue.splice(0, queue.length, ...nextQueue);
  }

  // NOTE: 연산이 불가한 경우
  return -1;
}
