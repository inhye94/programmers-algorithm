## 📖 알고리즘 공부

### 목표

- 클린 코드
- 액션/계산/데이터 분리

### 예시

**프로그래머스 77484번 로또의 최고 순위와 최저 순위 문제**

```js
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
```
