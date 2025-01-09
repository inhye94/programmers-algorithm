// 코드 출처: https://cjy00n.tistory.com/207
function solution(n) {
  // NOTE: 좌표 이동 방향
  const dx = [1, 0, -1]; // 하 우 상
  const dy = [0, 1, -1]; // 하 우 상

  // NOTE: 현재 좌표
  let x = 0;
  let y = 0;

  // NOTE: 현재 방향, 방향 변경 횟수
  let i = 0; // 현재 방향 => 0:하 / 1:우 / 2:상
  let ii = 0; // 방향을 변경한 횟수 => 2회를 변경했는데 더 이상 숫자를 붙일 수 없으면 종료

  // NOTE: 채울 숫자와 배열 초기화 (이동가능: 0, 불가능: -1)
  let cnt = 1;
  const arr = initArr(n, 1); // 첫 칸은 1로 초기값

  while (true) {
    // NOTE: 더 이상 움직일 수 없는 경우
    if (ii > 2) break;

    const xx = x + dx[i];
    const yy = y + dy[i];

    if (xx >= 0 && yy >= 0 && xx < n && yy < n && arr[xx][yy] == 0) {
      x = xx;
      y = yy;
      arr[x][y] = ++cnt;
      ii = 0;
    } else {
      i = (i + 1) % 3;
      ii++;
    }
  }

  return flattenAndFilterPositives(arr, n);
}

function initArr(n, firstValue) {
  const arr = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      arr[i][j] = -1;
    }
  }
  arr[0][0] = firstValue; // 첫 칸은 1로 초기값

  return arr;
}

function flattenAndFilterPositives(arr, n) {
  const answer = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (arr[i][j] != -1) {
        answer.push(arr[i][j]);
      }
    }
  }

  return answer;
}
