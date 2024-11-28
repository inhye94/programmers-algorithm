// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/140108

function solution(s) {
  // 상태: 기준, 기준count, 다른count, 답
  let state = { target: "", tCount: 0, oCount: 0, answer: 0 };

  for (let char of [...s]) {
    if (state.target === "") {
      state.target = char;
      state.tCount = 1;
      continue;
    }

    // count
    if (state.target === char) {
      state.tCount += 1;
    } else {
      state.oCount += 1;
    }

    // 문자열 나누기
    if (state.tCount === state.oCount) {
      state.tCount = 0;
      state.oCount = 0;
      state.target = "";
      state.answer += 1;
    }
  }

  return state.target ? state.answer + 1 : state.answer;
}
