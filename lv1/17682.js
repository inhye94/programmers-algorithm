// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/17682

// NOTE: 2024 답
function solution(dartResult) {
  const score = new Map([
    [1, 0],
    [2, 0],
    [3, 0],
  ]);

  // 상태: 순서, 단계
  const stack = [];
  let step = 0;

  // 점수 계산
  for (let dart of dartResult) {
    // 10 처리
    if (dart === "0" && isNum(stack.at(-1))) {
      score.set(step, 10);
      continue;
    }

    // 숫자인 경우
    if (isNum(dart)) {
      step += 1;
    }

    stack.push(dart);
    calcScore(score, step, dart);
  }

  return getSum([...score.values()]);
}

// NOTE: 비즈니스 로직
function calcScore(score, step, dart) {
  const currentStepScore = score.get(step);

  switch (true) {
    case isNum(dart):
      score.set(step, Number(dart));
      break;
    case isBonus(dart):
      score.set(step, Math.pow(currentStepScore, getBonusMultiplier(dart)));
      break;
    case isOption(dart):
      const num = dart === "*" ? 2 : -1;

      if (dart === "*" && step > 1) {
        let before = score.get(step - 1);
        score.set(step - 1, before * num);
      }

      score.set(step, currentStepScore * num);
      break;
  }
}

function isBonus(value) {
  return ["S", "D", "T"].includes(value);
}

function getBonusMultiplier(bonus) {
  const multipliers = { S: 1, D: 2, T: 3 };
  return multipliers[bonus];
}

function isOption(value) {
  return ["*", "#"].includes(value);
}

// NOTE: 계산 함수
function getSum(arr) {
  return arr.reduce((acc, cur) => acc + cur, 0);
}

function isNum(target) {
  return !Number.isNaN(Number(target));
}

// 이전 답
// function solution(dartResult) {
//   let _step = 0;

//   const _score = new Map();
//   for (let i = 1; i <= 3; i++) _score.set(i, 0);

//   let _stack = [];
//   for (let cur of dartResult) {
//     // NOTE: 0과 10 구분
//     if (cur == 0 && !isNaN(_stack.at(-1))) {
//       _score.set(_step, 10);
//       continue;
//     }
//     _stack.push(cur);

//     switch (true) {
//       case 0 <= cur && cur <= 10:
//         _step += 1;
//         _score.set(_step, +cur);
//         break;
//       case cur == "D":
//         _score.set(_step, _score.get(_step) ** 2);
//         break;
//       case cur == "T":
//         _score.set(_step, _score.get(_step) ** 3);
//         break;
//       case cur == "*":
//         _score.set(_step, _score.get(_step) * 2);
//         _score.has(_step - 1) &&
//           _score.set(_step - 1, _score.get(_step - 1) * 2);
//         break;
//       case cur == "#":
//         _score.set(_step, _score.get(_step) * -1);
//         break;
//     }
//   }

//   return [..._score.values()].reduce((acc, cur) => acc + cur, 0);
// }
