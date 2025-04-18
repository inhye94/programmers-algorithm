// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/131130

function solution(cards) {
  const visited = Array(cards.length).fill(false);
  const groups = [];

  for (let i = 0; i < cards.length; i++) {
    if (visited[i]) continue;

    let count = 0;
    let index = i;

    while (!visited[index]) {
      visited[index] = true;
      index = cards[index] - 1;
      count += 1;
    }

    groups.push(count);
  }

  groups.sort((a, b) => b - a);

  return groups.length < 2 ? 0 : groups[0] * groups[1];
}
