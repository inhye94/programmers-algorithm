// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/42576

// 2024 답
function solution(participant, completion) {
  const map = new Map(); // 상태: 이름, 참가사 수(동명이인)

  // 완주자 map
  for (let name of completion) {
    map.set(name, (map.get(name) || 0) + 1);
  }

  // 참가자 순회하며 소거
  for (let name of participant) {
    if (!map.has(name) || map.get(name) === 0) {
      return name;
    }

    map.set(name, map.get(name) - 1);
  }
}

// 이전 답
// function solution(participant, completion) {
//   const _sort_part = [...participant].sort();
//   const _sort_comp = [...completion].sort();

//   for (let i = 0; i < _sort_part.length; i++) {
//     if (_sort_part[i] == _sort_comp[i]) continue;

//     return _sort_part[i];
//   }
// }
