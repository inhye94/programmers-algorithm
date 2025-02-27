// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/147354

/**
 * 오래 걸린 이유
 * - 문제를 이해하는데 시간이 오래 걸림
 *
 * 풀이
 * 1. data[i][j]를 기준으로 정렬하고, 값이 같으면 data[i][0]을 기준으로 정렬한다.
 * 2. row_begin부터 row_end까지의 행을 선택한다.
 * 3. 선택된 행의 각 열의 값을 row_index로 나눈 나머지를 구한다.
 * 4. 나머지를 모두 XOR 연산한다.(^)
 */

function solution(data, col, row_begin, row_end) {
  return data
    .sort((a, b) => sortByCol(a, b, col - 1))
    .slice(row_begin - 1, row_end)
    .map((items, i) => {
      const rowIndex = row_begin + i;
      return items.reduce((sum, value) => sum + (value % rowIndex), 0);
    })
    .reduce((acc, cur) => acc ^ cur, 0);
}

// NOTE: 계산 함수
function sortByCol(a, b, index) {
  return a[index] - b[index] || b[0] - a[0];
}
