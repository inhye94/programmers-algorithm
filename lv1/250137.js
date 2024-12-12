// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/250137

// 2024 답
function solution(bandage, health, attacks) {
  const [t, heal, bonus] = bandage;
  const limit = health;
  const attackMap = new Map(attacks);
  const state = { health: health, count: 0 };

  for (let time = firstItem(attacks)[0]; time <= lastItem(attacks)[0]; time++) {
    // NOTE: 몬스터 공격
    if (attackMap.has(time)) {
      state.health -= attackMap.get(time);
      state.count = 0;

      // 게임오버
      if (isGameOver(state.health)) return -1;

      // 회복 건너뛰기
      continue;
    }

    // NOTE: 회복
    // 꽉 찬 체력
    if (isFull(state.health, limit)) continue;

    state.health = Math.min(state.health + heal, limit);
    state.count += 1;

    // 보너스 여부
    if (canGetABonus(state.count, t)) {
      state.health = Math.min(state.health + bonus, limit);
      state.count = 0;
    }
  }

  return state.health;
}

// NOTE: 비즈니스 로직
function isGameOver(health) {
  return health <= 0;
}

function isFull(value, limit) {
  return value >= limit;
}

function canGetABonus(count, t) {
  return count === t;
}

// NOTE: 계산 함수
function firstItem(arr) {
  return arr[0];
}

function lastItem(arr) {
  return arr.at(-1);
}

// 이전 답 =========================================================
function before(bandage, health, attacks) {
  const _totalTime = attacks[attacks.length - 1][0];
  const [_healTime, _heal, _bonus] = bandage;

  // NOTE: 값 초기화
  let _continuous = 0;
  let _curHealth = health;

  // NOTE: 1~마지막 공격까지 timetable
  let _attackTimeTable = new Array(_totalTime + 1).fill(0);
  attacks.forEach(([i, value]) => (_attackTimeTable[i] = value));

  for (let _attack of _attackTimeTable) {
    // NOTE: 공격 받는 경우
    if (_attack) {
      _curHealth -= _attack;
      _continuous = 0;

      // NOTE: 죽음
      if (_curHealth <= 0) return -1;

      continue;
    }

    // NOTE: 공격 받지 않는 경우
    _continuous++;
    _curHealth = Math.min(_curHealth + _heal, health);

    // NOTE: 연속 성공한 경우
    if (_continuous == _healTime) {
      _curHealth = Math.min(_curHealth + _bonus, health);
      _continuous = 0;
    }
  }

  return _curHealth > 0 ? _curHealth : -1;
}
