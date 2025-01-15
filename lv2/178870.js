// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/178870

function solution(sequence, k) {
  // NOTE: 슬라이딩 윈도우 (state: start, end)
  let sum = 0;
  const pointer = { start: 0, end: null };
  let answer = null;

  for (pointer.end = 0; pointer.end < sequence.length; pointer.end += 1) {
    sum += sequence[pointer.end];

    // NOTE: sum > k인 경우
    while (sum > k && pointer.start <= pointer.end) {
      sum -= sequence[pointer.start];
      pointer.start += 1; // pointer.start를 오른쪽으로 옮김
    }

    // NOTE: sum === k인 경우
    if (sum === k) {
      if (
        !answer || // 비어있거나
        answer[1] - answer[0] > pointer.end - pointer.start || // 길이가 짧거나
        pointer.start < answer[0] // 시작이 빠른
      ) {
        answer = [pointer.start, pointer.end];
      }
    }
  }

  return answer;
}
