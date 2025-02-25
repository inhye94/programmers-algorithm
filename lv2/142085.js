// NOTE: (이분탐색) 코드 가져온 곳 https://velog.io/@dlzagu/%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EB%94%94%ED%8E%9C%EC%8A%A4-%EA%B2%8C%EC%9E%84-%EB%AC%B8%EC%A0%9C-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98

// NOTE: (문제) https://school.programmers.co.kr/learn/courses/30/lessons/142085

function solution(n, k, enemy) {
  let leftIndex = 0;
  let rightIndex = enemy.length;

  while (leftIndex <= rightIndex) {
    // 이분탐색
    const mid = Math.floor((leftIndex + rightIndex) / 2);

    if (canSurvive(n, k, enemy, mid)) {
      leftIndex = mid + 1;
    } else {
      rightIndex = mid - 1;
    }
  }

  return rightIndex;
}

function canSurvive(n, k, enemy, mid) {
  if (mid <= k) return true;

  // 가장 강한 k명을 제외한 나머지를 최소 힙으로 계산
  let sum = 0;
  let sortedEnemies = enemy.slice(0, mid).sort((a, b) => b - a); // 내림차순

  for (let i = k; i < sortedEnemies.length; i++) {
    sum += sortedEnemies[i];

    if (sum > n) {
      return false;
    }
  }

  return true;
}
