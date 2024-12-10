// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/178871 달리기 경주

// 2024 답
function solution(players, callings) {
  const playersCopy = initPlayerOrder(players); // 추상화 단계를 맞춤
  const playersRank = initRankings(players);

  for (let calling of callings) {
    updateRank(playersRank, playersCopy, calling);
  }

  return playersCopy;
}

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

// NOTE: 계산 함수
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

// 이전 답
// function solution(players, callings) {
//   // for 시간 초과를 줄여보자🤮
//   let _indexObject = {};
//   players.forEach((_name, _idx) => (_indexObject[_name] = _idx));

//   for (let _call of callings) {
//     const _CallingIdx = _indexObject[_call];
//     const _prevPlayer = players[_CallingIdx - 1];

//     players[_CallingIdx - 1] = _call;
//     players[_CallingIdx] = _prevPlayer;

//     _indexObject[_call] = _CallingIdx - 1;
//     _indexObject[_prevPlayer] = _CallingIdx;
//   }

//   return players;
// }
