// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/42862

// 2024 답
function solution(n, lost, reserve) {
  const clothMap = initializeClothState(n, lost, reserve); // 상태: 학생번호, 옷 개수
  const eligibleReserves = getEligibleReserves(lost, reserve);

  distributeClothes(eligibleReserves, clothMap);

  return countWithValue(clothMap);
}

// NOTE: 비즈니스 로직
function isEmpty(key, map) {
  return map.get(key) === 0;
}

function shareCloth(giver, receiver, map) {
  map.set(giver, 1);
  map.set(receiver, 1);
}

function distributeClothes(reserves, clothMap) {
  for (let student of reserves) {
    if (isEmpty(student - 1, clothMap)) {
      shareCloth(student, student - 1, clothMap);
      continue;
    }

    if (isEmpty(student + 1, clothMap)) {
      shareCloth(student, student + 1, clothMap);
    }
  }
}

// NOTE: 계산 함수
function initializeClothState(n, lost, reverse) {
  const map = new Map();

  for (let i = 1; i <= n; i++) {
    map.set(i, 1);
  }

  lost.forEach((student) => map.set(student, map.get(student) - 1));
  reverse.forEach((student) => map.set(student, map.get(student) + 1));

  return map;
}

function getEligibleReserves(lost, reserve) {
  return reserve
    .filter((student) => !lost.includes(student)) // 도난당하지 않은 학생만
    .sort((a, b) => a - b); // 정렬하여 작은 번호 우선
}

function countWithValue(map) {
  return Array.from(map.values()).filter((v) => v > 0).length;
}

// 이전 답
// function solution(n, lost, reserve) {
//   // NOTE: 전체 - 잃어버린 사람 수
//   let _passCount = n - lost.length;

//   lost = lost.sort((a, b) => a - b);
//   reserve = reserve.sort((a, b) => a - b);

//   // NOTE: 여벌 도둑맞은 사람 >> reserve에서 빼기
//   for (let i = 0; i < lost.length; i++) {
//     for (let j = 0; j < reserve.length; j++) {
//       if (lost[i] == reserve[j]) {
//         reserve[j] = -1;
//         lost[i] = -1;
//         _passCount += 1;
//         break;
//       }
//     }
//   }

//   lost = lost.filter((v) => v != -1);
//   reserve = reserve.filter((v) => v != -1);

//   // NOTE: 빌려주기
//   for (let i = 0; i < lost.length; i++) {
//     for (let j = 0; j < reserve.length; j++) {
//       if (lost[i] == reserve[j] - 1 || lost[i] == reserve[j] + 1) {
//         reserve[j] = -1;
//         lost[i] = -1;
//         _passCount += 1;
//         break;
//       }
//     }
//   }

//   return _passCount;
// }
