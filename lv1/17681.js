// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/17681

/**
 *
 * @param {number} n
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @returns {string[]}
 */

function solution(n, arr1, arr2) {
  return [...arr1].map((v, i) =>
    (v | arr2[i])
      .toString(2)
      .padStart(n, "0")
      .replaceAll(1, "#")
      .replaceAll(0, " ")
  );
}

// (v | arr[i]) > 비트 연산자(or), @return number(10진수)
// .toString(2) > 2진수로 변환, @return string
// .padStart(n, "0") > n자리수 맞추기, @return string
// .replaceAll(1, "#").replaceAll(0, " ") > # 또는 ' '로 대치, @return string
