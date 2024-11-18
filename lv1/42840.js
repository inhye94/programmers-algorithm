// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/42840

function solution(answers) {
  const _1 = [1, 2, 3, 4, 5];
  const _2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const _3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  // NOTE: 점수 계산
  const _score = [0, 0, 0];

  for (let i = 0; i < answers.length; i++) {
    answers[i] == _1[i % _1.length] && _score[0]++;
    answers[i] == _2[i % _2.length] && _score[1]++;
    answers[i] == _3[i % _3.length] && _score[2]++;
  }

  // NOTE: 결과 출력
  const _max = Math.max(..._score);
  const _result = [];

  _score[0] == _max && _result.push(1);
  _score[1] == _max && _result.push(2);
  _score[2] == _max && _result.push(3);

  return _result;
}

// answer를 완전 탐색
