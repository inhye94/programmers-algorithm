// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/340212

// NOTE: 리팩토링 전
function solution(diffs, times, limit) {
  const max = Math.max(...diffs);

  for (let level = 1; level <= max; level++) {
    let _limit = limit - times[0];

    for (let j = 1; j < diffs.length; j++) {
      if (diffs[j] > level) {
        _limit -= (diffs[j] - level) * (times[j] + times[j - 1]) + times[j];
      } else {
        _limit -= times[j];
      }

      if (_limit < 0) break; // limit을 넘기는 경우
    }

    // 최소값을 찾은 경우
    if (_limit >= 0) return level;
  }
}

// =================================================

// NOTE: 이분 탐색으로 최적화
function solutionBinarySearch(diffs, times, limit) {
  let left = 1;
  let right = diffs.reduce((acc, cur) => Math.max(acc, cur), -Infinity);

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    let remainingTime = limit - times[0];

    // 남은 시간 계산
    for (let j = 1; j < diffs.length; j++) {
      remainingTime -= getTakenTime(diffs[j], mid, times[j], times[j - 1]);

      // limit을 넘기는 경우
      if (remainingTime < 0) break;
    }

    // 이분탐색 범위 재조정
    if (remainingTime >= 0) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}

function getTakenTime(diff, level, time_cur, time_prev) {
  return diff > level
    ? (diff - level) * (time_cur + time_prev) + time_cur
    : time_cur;
}
