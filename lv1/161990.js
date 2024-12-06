// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/161990

// 2024 답
function solution(wallpaper) {
  // 상태: 행과 열의 최소값, 최대값
  // set은 탐색/삽입/삭제에서 O(1)이지만, max/min을 구하는 과정에서 완전탐색이 되므로 O(n) 오버헤드가 발생함
  let minX = Infinity,
    maxX = -Infinity;
  let minY = Infinity,
    maxY = -Infinity;

  for (let x = 0; x < wallpaper.length; x++) {
    for (let y = 0; y < wallpaper[x].length; y++) {
      // 열에 파일이 없는 경우
      if (wallpaper[x][y] === ".") continue;

      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    }
  }

  return [minX, minY, maxX + 1, maxY + 1];
}

// 이전 답
// function solution(wallpaper) {
//   let _col_set = new Set();
//   let _row_set = new Set();

//   wallpaper.forEach((row, row_index) => {
//     const new_set = new Set([...row]);

//     if (new_set.has("#")) {
//       _row_set.add(row_index);

//       for (let col = 0; col < row.length; col++) {
//         if (row[col] == ".") continue;

//         _col_set.add(col);
//       }
//     }
//   });

//   const _col_arr = [..._col_set].sort((a, b) => a - b);
//   const _row_arr = [..._row_set].sort((a, b) => a - b);

//   return [_row_arr[0], _col_arr[0], _row_arr.pop() + 1, _col_arr.pop() + 1];
// }
