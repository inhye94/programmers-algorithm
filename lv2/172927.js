// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/172927

/**
 * 시간 복잡도: O(3^N) (최악)
 * 탐색: 모든 경우의 수 시도
 * 효율성: 작은 입력에서는 적절
 * 백트래킹: 필요
 * 실행속도: 곡괭이 개수 적으면 괜찮음
 */
function solution(picks, minerals) {
  const tiredList = [
    [1, 1, 1],
    [5, 1, 1],
    [25, 5, 1],
  ];

  const endPoint = getEndPoint(picks, minerals);
  let accTired = Infinity;

  function dfs(curLevel, sum) {
    if (curLevel >= endPoint) {
      accTired = Math.min(accTired, sum);
      return;
    }

    for (let i = 0; i < 3; i++) {
      if (picks[i] === 0) continue;

      picks[i] -= 1;

      let tired = 0;
      let min = Math.min(5, endPoint - curLevel);

      for (let j = 0; j < min; j++) {
        const mineral = minerals[curLevel + j];
        if (mineral === "diamond") {
          tired += tiredList[i][0];
        } else if (mineral === "iron") {
          tired += tiredList[i][1];
        } else {
          tired += tiredList[i][2];
        }
      }

      dfs(curLevel + min, sum + tired);

      picks[i] += 1; // 백트래킹
    }
  }

  dfs(0, 0);

  return accTired;
}

// NOTE: 계산 함수 - endPoint 계산
function getEndPoint(picks, minerals) {
  const picksTotal = picks.reduce((acc, cur) => acc + cur, 0);
  return Math.min(picksTotal * 5, minerals.length);
}

// ==================================

/**
 * NOTE: 다른 사람의 풀이
 *
 * 시간 복잡도: O(N log N)
 * 탐색: 피로도가 높은 순서대로 처리
 * 효율성: 큰 입력에서도 빠름
 * 백트래킹: 필요 없음
 * 실행속도: 항상 빠름
 */

function solutionCool(picks, minerals) {
  const remainPicks = [...picks];
  const maxFatigue = []; // 5개씩 묶은 광물들의 피로도 저장 배열

  // 사용할 수 있는 최대 광물 개수
  const useable = minerals.slice(0, picks.reduce((acc, cur) => acc + cur) * 5);

  // 광물을 5개씩 묶어서 피로도를 저장
  useable.forEach((mineral, index) => {
    if (index % 5 === 0) maxFatigue.push({ diamond: 0, iron: 0, stone: 0 });
    maxFatigue.at(-1)[mineral]++;
  });

  // 피로도가 높은 그룹 순으로 정렬 (내림차순)
  maxFatigue.sort(
    (a, b) =>
      b.diamond * 25 +
      b.iron * 5 +
      b.stone -
      (a.diamond * 25 + a.iron * 5 + a.stone)
  );

  // 곡괭이 우선순위에 따라 피로도를 계산
  const answer = maxFatigue.reduce((acc, { diamond, iron, stone }) => {
    if (remainPicks[0] !== 0) {
      remainPicks[0]--;
      return acc + diamond + iron + stone;
    } else if (remainPicks[1] !== 0) {
      remainPicks[1]--;
      return acc + diamond * 5 + iron + stone;
    } else {
      remainPicks[2]--;
      return acc + diamond * 25 + iron * 5 + stone;
    }
  }, 0);

  return answer;
}
