// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/77485

function solution(rows, columns, queries) {
  const answer = [];
  const table = makeTable(rows, columns);

  for (let query of queries) {
    const [rowS, colS, rowE, colE] = query.map((v) => v - 1);

    // 가장 작은 수 구하기
    answer.push(getMin(table, rowS, colS, rowE, colE));

    // 테이블 회전
    const temp = {
      leftTop: table[rowS][colS],
      rightBottom: table[rowE][colE],
    };

    // 왼쪽 세로
    for (let i = rowS; i < rowE; i++) {
      table[i][colS] = table[i + 1][colS];
    }

    // 오른쪽 세로
    for (let i = rowE; i > rowS; i--) {
      table[i][colE] = table[i - 1][colE];
    }

    // 아래쪽 가로
    for (let j = colE; j > colS; j--) {
      table[rowS][j] = table[rowS][j - 1];
    }

    // 위쪽 가로
    for (let j = colS; j < colE; j++) {
      table[rowE][j] = table[rowE][j + 1];
    }

    table[rowS][colS + 1] = temp.leftTop;
    table[rowE][colE - 1] = temp.rightBottom;
  }

  return answer;
}

// NOTE: 데이터 함수
function makeTable(rows, columns) {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: columns }, (_, col) => row * columns + col + 1)
  );
}

// NOTE: 계산 함수 - 최소 값 구하기
function getMin(table, rowS, colS, rowE, colE) {
  const moveCell = [
    ...table[rowS].slice(colS + 1, colE),
    ...table[rowE].slice(colS + 1, colE),
  ];

  for (let i = rowS; i <= rowE; i++) {
    moveCell.push(table[i][colS]);
    moveCell.push(table[i][colE]);
  }

  return Math.min(...moveCell);
}
