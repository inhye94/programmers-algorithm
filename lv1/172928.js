// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/172928

// 2024 답
function solution(park, routes) {
  const WIDTH = park[0].length;
  const HEIGHT = park.length;

  let [curY, curX] = findStartPoint(park); // 상태: 현재 위치

  for (let route of routes) {
    const [op, n] = route.split(" ");
    let [nextX, nextY] = [curX, curY];

    if (op === "E") nextX += +n;
    if (op === "W") nextX -= +n;
    if (op === "N") nextY -= +n;
    if (op === "S") nextY += +n;

    // 유효성 검사
    if (
      isExceededRange(nextX, nextY, WIDTH, HEIGHT) ||
      isBlocked(park, curX, curY, nextX, nextY)
    ) {
      continue;
    }

    // 위치 이동
    [curX, curY] = [nextX, nextY];
  }

  return [curY, curX];
}

function isBlocked(park, curX, curY, x, y) {
  // 가로 이동
  if (curY === y) {
    const [min, max] = [Math.min(curX, x), Math.max(curX, x)];
    return park[curY].slice(min, max + 1).includes("X");
  }

  // 세로 이동
  if (curX === x) {
    const [min, max] = [Math.min(curY, y), Math.max(curY, y)];
    for (let i = min; i <= max; i++) {
      if (park[i][curX] === "X") return true;
    }
  }

  return false;
}

function isExceededRange(x, y, width, height) {
  return y < 0 || y >= height || x < 0 || x >= width;
}

function findStartPoint(park) {
  for (let y = 0; y < park.length; y++) {
    if (park[y].includes("S")) {
      const x = park[y].indexOf("S");
      return [y, x];
    }
  }

  return [0, 0];
}

// 이전 답 ========================================================
function before(park, routes) {
  let _pos = { i: 0, j: 0 };

  for (let i = 0; i < park.length; i++) {
    const j = park[i].indexOf("S");
    if (j > -1) {
      _pos = { i, j };
      break;
    }
  }

  for (let command of routes) {
    let [_dir, _move] = command.split(" ");
    const { i, j } = _pos;

    _move = +_move;
    let _flag = true;

    for (let k = 1; k <= _move; k++) {
      let [_new_i, _new_j] = [i, j];

      _dir == "N" && (_new_i = i - k);
      _dir == "S" && (_new_i = i + k);
      _dir == "W" && (_new_j = j - k);
      _dir == "E" && (_new_j = j + k);

      if (
        !park[_new_i] ||
        !park[_new_i][_new_j] ||
        park[_new_i][_new_j] == "X"
      ) {
        _flag = false;
        break;
      }
    }

    if (_flag) {
      _dir == "N" && (_pos.i -= _move);
      _dir == "S" && (_pos.i += _move);
      _dir == "W" && (_pos.j -= _move);
      _dir == "E" && (_pos.j += _move);
    }
  }

  return [_pos.i, _pos.j];
}
