// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/134239

function solution(k, ranges) {
  // 우박수 배열 생성
  const 우박수배열 = get우박수배열(k);

  // 정적분 배열 생성
  return ranges.map(([a, b]) => {
    const end = 우박수배열.length - Math.abs(b);
    if (a >= end) return -1;
    return calc정적분(우박수배열.slice(a, end));
  });
}

// NOTE: 계산 함수 - 정적분 계산
function calc정적분(arr) {
  return (arr.reduce((acc, cur) => acc + cur, 0) * 2 - arr[0] - arr.at(-1)) / 2;
}

// NOTE: 데이터 함수 - 우박수 배열 생성
function get우박수배열(k) {
  const array = [k];

  while (true) {
    let last = array.at(-1);
    if (last === 1) break;
    array.push(last % 2 ? last * 3 + 1 : last / 2);
  }

  return array;
}
