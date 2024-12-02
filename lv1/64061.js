// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/64061

// 2024 답
function solution(board, moves) {
  // 상태: count 값, fliped + stack 배열

  const flipedMatrix = flipMatrix(board);
  const stacks = convertColumnsToStacks(flipedMatrix);
  let count = countMatchedDolls(stacks, moves);

  return count;
}

// 비즈니스 로직
function countMatchedDolls(stacks, moves) {
  let stack = [];
  let count = 0;

  for (let move of moves) {
    const col = move - 1;
    if (stacks[col].length === 0) continue;

    const pickedDoll = stacks[col].pop();
    if (stack.at(-1) === pickedDoll) {
      stack.pop();
      count += 2;
    } else {
      stack.push(pickedDoll);
    }
  }

  return count;
}

function convertColumnsToStacks(array) {
  return array.map((col) => col.filter((v) => v).reverse());
}

// 계산함수
function flipMatrix(array) {
  const newArray = Array.from({ length: array.length }, () => []);

  for (let col of array) {
    for (let i = 0; i < col.length; i++) {
      newArray[i].push(col[i]);
    }
  }

  return newArray;
}

// 이전 답
// function solution(board, moves) {
//   const _screen_arr = Array.from({ length: board.length + 1 }, () => []);
//   while (board.length) {
//     board.pop().forEach((v, i) => v && _screen_arr[i + 1].push(v));
//   }

//   let _count = 0;
//   let _basket_arr = [];
//   for (let column of moves) {
//     const _picked_item = _screen_arr[column].pop();
//     const _basket_top = _basket_arr.pop();

//     if (!_picked_item) {
//       _basket_arr.push(_basket_top, _picked_item);
//       continue;
//     }

//     if (_picked_item == _basket_top) {
//       _count += 2;
//     } else {
//       _basket_arr.push(_basket_top, _picked_item);
//     }
//   }

//   return _count;
// }
