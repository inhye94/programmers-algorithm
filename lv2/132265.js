// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/132265

function solution(topping) {
  let count = 0;
  const 철수_토핑_맵 = new Map();
  const 동생_토핑_맵 = new Map();

  for (let item of topping) {
    철수_토핑_맵.set(item, (철수_토핑_맵.get(item) || 0) + 1);
  }

  for (let item of topping) {
    // 철수 토핑 > 동생 토핑
    철수_토핑_맵.set(item, 철수_토핑_맵.get(item) - 1);
    동생_토핑_맵.set(item, (동생_토핑_맵.get(item) || 0) + 1);

    if (철수_토핑_맵.get(item) === 0) {
      철수_토핑_맵.delete(item);
    }

    // 토핑 수 비교
    if (철수_토핑_맵.size === 동생_토핑_맵.size) {
      count += 1;
    }
  }

  return count;
}
