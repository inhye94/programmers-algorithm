// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/60057

function solution(s) {
  // NOTE: 예외처리 - 한 글자인 경우
  if (s.length === 1) return 1;

  const half = Math.floor(s.length / 2); // 탐색 범위
  let min = s.length;

  for (let i = 1; i <= half; i++) {
    // 초기화
    let { prev, count } = init(s, i);
    const compressedArr = [];

    for (let j = i; j < s.length; j += i) {
      const curStr = s.slice(j, j + i);

      if (prev === curStr) {
        count += 1;
      } else {
        compressedArr.push(getCompressedStr(prev, count));
        prev = curStr;
        count = 1;
      }
    }

    // 마지막 문자 처리
    compressedArr.push(getCompressedStr(prev, count));

    // 최소값 계산
    min = Math.min(min, compressedArr.join("").length);
  }

  return min;
}

// NOTE: 데이터 함수 - 초기값
function init(s, i) {
  return {
    prev: s.slice(0, i),
    count: 1,
  };
}

// NOTE: 계산 함수 - 압축된 문자 반환
function getCompressedStr(prev, count) {
  return count > 1 ? count + prev : prev;
}

// ========================================
// NOTE: 다른 사람의 코드로, 최적화가 되어있어 최대 1ms 빠르다.

function solutionCool(s) {
  let minLen = s.length; //현재 스트링 길이로 시작한다.

  // 압축하는 문자열 길이를 1개씩부터, s의 반 까지 시도한다.
  top: for (let n = 1; n <= s.length / 2; n++) {
    // 이번 트라이얼의 문자열 길이 초기화한다.
    let curLen = 0;
    for (let i = 0; i < s.length; i += n) {
      // 이번 트라이얼의 길이 n 만큼 테스트를하고, 일치하는 수만큼 카운터로 계산
      // 불일치 시에 다음으로 진행
      let counter = 1;
      while (s.slice(i, i + n) === s.slice(i + n, i + 2 * n)) {
        i += n;
        counter++;
      }
      // 만약 하나도 일치가 없었으면, 테스트했던 문자열의 길이만큼만 더해주고,
      // 일치한 문자열이 하나라도 존재했다면 카운터를 스트링으로 변환 후 길이를 더해줌.
      if (counter !== 1) {
        curLen += n + (counter + "").length;
      } else {
        // 1일경우 그냥 n을 더해주는데, 혹시 맨 마지막에 남은 문자열이 n이하일 경우
        // 남는 수만 더해준다.
        curLen += s.length < i + n ? s.slice(i, i + n).length : n;
      }
      // 현재까지의 최소길이보다 현재길이가 커지는 순간, 다음 트라이얼 시작.
      if (minLen <= curLen) continue top;
    }
    // 여기까지 살아남았으면 이번 길이가 최소길이다.
    minLen = curLen;
  }
  return minLen;
}
