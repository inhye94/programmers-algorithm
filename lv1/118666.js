// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/118666

// 2024 답
function solution(survey, choices) {
  // 상태: 항목별 점수, 순서
  const scores = calcScores(survey, choices);
  return determinePersonality(scores);
}

// 비즈니스 로직
function calcScores(survey, choices) {
  const scores = { R: 0, T: 0, C: 0, F: 0, J: 0, M: 0, A: 0, N: 0 };

  choices.forEach((choice, i) => {
    const score = choice - 4;
    const [charLeft, charRight] = survey[i];
    const char = score < 0 ? charLeft : charRight;

    scores[char] += Math.abs(score);
  });

  return scores;
}

function determinePersonality(scores) {
  return ["RT", "CF", "JM", "AN"]
    .map(([charLeft, charRight]) =>
      scores[charLeft] >= scores[charRight] ? charLeft : charRight
    )
    .join("");
}

// 이전 답
// function solution(survey, choices) {
//   const _score_obj = {
//     RT: 0,
//     CF: 0,
//     JM: 0,
//     AN: 0,
//   };

//   survey.forEach((q, i) => {
//     const _type = [...q].sort().join("");
//     _score_obj[_type] += _type == q ? choices[i] - 4 : 4 - choices[i];
//   });

//   let _result = "";
//   for (let [_type, _score] of Object.entries(_score_obj)) {
//     _score > 0 && (_result += [..._type][1]);
//     _score > 0 || (_result += [..._type][0]);
//   }

//   return _result;
// }
