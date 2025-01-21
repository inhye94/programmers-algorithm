// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/152996
function solution(weights) {
  // NOTE: 짝꿍이 될 수 있는 비율의 목록
  const ratioCases = [1, 2 / 3, 1 / 2, 3 / 4];

  // NOTE: 무게별 등장 횟수를 기록하는 맵
  const weightCounts = {};
  let count = 0;

  // NOTE: 오름차순으로 정렬해서 짝꿍이 되는 경우를 줄임
  const ascWeights = [...weights].sort((a, b) => a - b);

  // NOTE: 한 사람씩 짝궁 탐색
  for (let weight of ascWeights) {
    // 현재 weight로 짝꿍이 되는 경우 탐색
    for (let ratio of ratioCases) {
      const targetWeight = weight * ratio;

      if (weightCounts[targetWeight]) {
        count += weightCounts[targetWeight];
      }
    }

    // 현재 weight의 등장 횟수를 기록
    weightCounts[weight] = (weightCounts[weight] || 0) + 1;
  }

  return count;
}
