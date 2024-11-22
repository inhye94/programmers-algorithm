// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/42889

function solution(N, stages) {
  let totalPlayers = stages.length;

  const failureRates = initFailureRates(N); // 모두 실패율 0으로 초기화
  const sortedStages = getSortedStage(stages, N);

  // 비즈니스 로직만
  for (let stage of getDeduplicatedStages(sortedStages)) {
    const notClearedCount = sortedStages.lastIndexOf(stage) + 1;

    failureRates.set(stage, notClearedCount / totalPlayers);
    totalPlayers -= notClearedCount;

    sortedStages.splice(0, notClearedCount);
  }

  return getSortedFailureRates(failureRates);
}

// 계산 함수만 분리
function initFailureRates(n) {
  return new Map(Array.from({ length: n }, (_, i) => [i + 1, 0]));
}

function getSortedStage(arr, n) {
  return arr.filter((v) => v <= n).sort((a, b) => a - b);
}

function getDeduplicatedStages(arr) {
  return [...new Set(arr)];
}

function getSortedFailureRates(failureRates) {
  return [...failureRates.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([stage, _]) => stage);
}
