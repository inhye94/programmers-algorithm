// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/77484

// NOTE: 2024 답
function solution(lottos, win_nums) {
  const LOWEST_RANK = 6;
  const totalCount = win_nums.length;

  // 상태: 0의 갯수, 맞춘 갯수
  const zeroCount = countInvalidNumbers(lottos);
  const matchCount = countMatchingValues(lottos, win_nums);

  const highestRank = calcRank(matchCount + zeroCount, totalCount, LOWEST_RANK);
  const lowestRank = calcRank(matchCount, totalCount, LOWEST_RANK);

  return [highestRank, lowestRank];
}

// NOTE: 비즈니스 로직
// 특징: 순위 = lottos.length + 1 - 맞춘 갯수
function calcRank(matchCount, totalNumbers, lowestRank) {
  const sum = totalNumbers + 1;
  const rank = sum - matchCount;

  return rank >= sum ? lowestRank : rank;
}

// NOTE: 계산 함수
function countMatchingValues(candidate, reference) {
  const setObject = new Set(reference);

  return candidate.reduce((acc, v) => (setObject.has(v) ? acc + 1 : acc), 0);
}

function countInvalidNumbers(arr) {
  return arr.filter((v) => !v).length;
}

// 이전 답
// function solution(lottos, win_nums) {
//   const _win = [6, 6, 5, 4, 3, 2, 1];

//   const _sameCount = lottos.reduce(
//     (acc, cur) => (win_nums.indexOf(cur) != -1 ? acc + 1 : acc),
//     0
//   );
//   const _zeroCount = lottos.filter((v) => !v).length;

//   return [_win[_sameCount + _zeroCount], _win[_sameCount]];
// }
