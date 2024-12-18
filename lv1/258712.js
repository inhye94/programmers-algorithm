// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/258712

function solution(friends, gifts) {
  // NOTE: 입력 변환
  const LEN = friends.length;
  const index = createIndexMap(friends);
  const state = { give: new Map(), receive: new Map() };
  const records = createTwoDimensionalArray(LEN, 0);

  for (let gift of gifts) {
    const [giver, receiver] = gift.split(" ");
    updateRecordsAndState(giver, receiver, records, index, state);
  }

  // NOTE: 비즈니스 로직
  const giftAdvantage = [];
  const giftPoint = friends.map((name) => {
    const { give, receive } = state;
    return (give.get(name) || 0) - (receive.get(name) || 0);
  });

  for (let giverIndex = 0; giverIndex < LEN; giverIndex++) {
    let giftCount = 0;

    for (let receiverIndex = 0; receiverIndex < LEN; receiverIndex++) {
      if (giverIndex === receiverIndex) continue; // 본인은 제외
      const giverCount = records[giverIndex][receiverIndex];
      const receiverCount = records[receiverIndex][giverIndex];

      // 선물 횟수가 giver < receiver
      if (giverCount < receiverCount) continue;

      // 선물 횟수가 giver > receiver
      if (giverCount > receiverCount) {
        giftCount += 1;
        continue;
      }

      // 선물 지수가 giver > receiver
      if (giftPoint[giverIndex] > giftPoint[receiverIndex]) {
        giftCount += 1;
      }
    }

    giftAdvantage.push(giftCount);
  }

  return Math.max(...giftAdvantage);
}

// NOTE: 계산 함수
function updateRecordsAndState(giver, receiver, records, indexMap, state) {
  const giverIndex = indexMap[giver];
  const receiverIndex = indexMap[receiver];
  records[giverIndex][receiverIndex] += 1;

  const { give, receive } = state;
  give.set(giver, (give.get(giver) || 0) + 1);
  receive.set(receiver, (receive.get(receiver) || 0) + 1);
}

// NOTE: 계산 함수 - utils
function createIndexMap(array) {
  return array.reduce((acc, value, i) => {
    acc[value] = i;
    return acc;
  }, {});
}

function createTwoDimensionalArray(n, value) {
  return Array.from({ length: n }, () => new Array(n).fill(value));
}
