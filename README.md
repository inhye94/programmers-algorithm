## 📖 알고리즘 공부

### 목표

- 클린 코드
- 액션/계산/데이터 분리
- 추상화 단계 맞추기
- 재사용성 고려

## 🤔 예시

### [프로그래머스 340213번 [PCCP 기출문제] 1번 / 동영상 재생기](https://school.programmers.co.kr/learn/courses/30/lessons/340213)

#### solution

```js
function solution(video_len, pos, op_start, op_end, commands) {
  // NOTE: 입력 변환
  const videoLength = convertToSeconds(video_len);
  const initPosition = convertToSeconds(pos);
  const openingRange = {
    start: convertToSeconds(op_start),
    end: convertToSeconds(op_end),
  };

  // NOTE: 초기 위치 설정
  let curPosition = initPosition;

  if (isPositionInRange(curPosition, openingRange.start, openingRange.end)) {
    curPosition = openingRange.end;
  }

  // NOTE: 명령어 처리
  for (let command of commands) {
    curPosition = updatePosition(
      command,
      curPosition,
      videoLength,
      openingRange
    );
  }

  // NOTE: 결과 반환
  return formatTime(curPosition);
}
```

#### 비즈니스 로직

```js
// NOTE: 비즈니스 로직
function updatePosition(command, curPosition, videoLength, openingRange) {
  let position = curPosition;
  const { start, end } = openingRange;

  if (command === "prev") {
    position = Math.max(0, position - 10);
  }

  if (command === "next") {
    position = Math.min(videoLength, position + 10);
  }

  if (isPositionInRange(position, start, end)) {
    position = end;
  }

  return position;
}
```

#### 계산 함수

```js
// NOTE: 계산 함수
function isPositionInRange(position, rangeStart, rangeEnd) {
  return rangeStart <= position && position <= rangeEnd;
}

function convertToSeconds(time) {
  const [min, sec] = time.split(":").map((v) => Number(v));

  return 60 * min + sec;
}

function formatTime(seconds) {
  const min = String(parseInt(seconds / 60));
  const sec = String(seconds % 60);

  return `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
}
```

---

### [프로그래머스 77484번 로또의 최고 순위와 최저 순위 문제](https://school.programmers.co.kr/learn/courses/30/lessons/77484)

#### solution

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
```

#### 비즈니스 로직

```js
// NOTE: 비즈니스 로직
// 특징: 순위 = lottos.length + 1 - 맞춘 갯수
function calcRank(matchCount, totalNumbers, lowestRank) {
  const sum = totalNumbers + 1;
  const rank = sum - matchCount;

  return rank >= sum ? lowestRank : rank;
}
```

#### 계산 함수

```js
// NOTE: 계산 함수
function countMatchingValues(candidate, reference) {
  const setObject = new Set(reference);

  return candidate.reduce((acc, v) => (setObject.has(v) ? acc + 1 : acc), 0);
}

function countInvalidNumbers(arr) {
  return arr.filter((v) => !v).length;
}
```

---

### [프로그래머스 178871번 달리기 경주 문제](https://school.programmers.co.kr/learn/courses/30/lessons/178871)

#### solution

```js
function solution(players, callings) {
  const playersCopy = initPlayerOrder(players); // 추상화 단계를 맞춤
  const playersRank = initRankings(players);

  for (let calling of callings) {
    updateRank(playersRank, playersCopy, calling);
  }

  return playersCopy;
}
```

#### 비즈니스 로직

```js
// NOTE: 비즈니스 로직 - 단일 책임 원칙
function updateRank(playersRank, playersCopy, calling) {
  const currentRank = playersRank[calling];

  if (canUpdateRank(currentRank)) {
    const prevPlayer = playersCopy[currentRank - 1];
    playersRank[calling] = currentRank - 1;
    playersRank[prevPlayer] = currentRank;

    swap(playersCopy, currentRank, currentRank - 1);
  }
}

function canUpdateRank(currentRank) {
  return currentRank > 0;
}

function initPlayerOrder(arr) {
  // 의도를 명확하게 표현
  return arr.slice();
}

function initRankings(players) {
  return players.reduce((acc, player, i) => {
    acc[player] = i;
    return acc;
  }, {});
}
```

#### 계산 함수

```js
// NOTE: 계산 함수
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
```
