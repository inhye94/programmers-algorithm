// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/160586

// 2024 답
function solution(keymap, targets) {
  // 상태: 알파벳, 순서
  const pushCount = buildMinKeypressMap(keymap);
  return targets.map((string) => calculateTotalPresses([...string], pushCount));
}

function calculateTotalPresses(stringArr, countMap) {
  const CANT_WRITE = -1;
  let totolPresses = 0;

  for (let char of stringArr) {
    if (!countMap.has(char)) {
      return CANT_WRITE;
    }

    totolPresses += countMap.get(char);
  }

  return totolPresses;
}

function buildMinKeypressMap(keymap) {
  const mapObject = new Map();

  for (let key of keymap) {
    for (let i = 0; i < key.length; i++) {
      const char = key[i];
      const keyPresses = i + 1;

      if (mapObject.has(char)) {
        mapObject.set(char, Math.min(mapObject.get(char), keyPresses));
        continue;
      }

      mapObject.set(char, keyPresses);
    }
  }

  return mapObject;
}

// 이전 답
// function solution(keymap, targets) {
//   // NOTE: char 마다 가장 적게 누르는 수 저장
//   const _key_map = new Map();

//   for (let key of keymap) {
//     for (let i = 0; i < key.length; i++) {
//       const _char = key[i];
//       _key_map.set(_char, Math.min(_key_map.get(_char) || i + 1, i + 1));
//     }
//   }

//   // NOTE: reduce로 최소값 더하기
//   return targets.map((str) => {
//     return [...str].reduce((acc, cur) => acc + _key_map.get(cur), 0) || -1;
//   });
// }
