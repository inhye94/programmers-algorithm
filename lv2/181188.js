// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/181188

function solution(targets) {
  // 예외 처리
  if (targets.length === 0) return 0;

  // start 오름차순 정렬, 같으면 end 오름차순 정렬
  const sorted = [...targets].sort(compareTargets);

  let count = 1;
  let endMin = sorted[0][1];

  for (let [targetS, targetE] of sorted) {
    if (targetS < endMin) {
      // 범위 좁히기
      endMin = Math.min(endMin, targetE);
    } else {
      // 범위 갱신
      endMin = targetE;
      // 미사일 추가
      count += 1;
    }
  }

  return count;
}

// NOTE: 계산 함수
function compareTargets([s1, e1], [s2, e2]) {
  return s1 === s2 ? e1 - e2 : s1 - s2;
}
