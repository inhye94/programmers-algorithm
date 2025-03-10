// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/81302
function solution(places) {
  return places.map((room) => {
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (room[i][j] === "P" && isViolatingDistance(room, i, j)) {
          return 0; // 거리 위반
        }
      }
    }
    return 1; // 거리 준수
  });
}

// NOTE: 계산 함수 - 거리 위반 여부를 확인
function isViolatingDistance(room, x, y) {
  const dir1 = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ]; // 상하좌우
  const dir2 = [
    [2, 0],
    [0, 2],
    [-2, 0],
    [0, -2],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]; // 맨해튼 거리

  // 상하좌우에 P가 있는 경우
  for (let [dx, dy] of dir1) {
    const newX = x + dx,
      newY = y + dy;
    if (isInRoom(newX, newY) && room[newX][newY] === "P") {
      return true; // 거리 위반
    }
  }

  // 맨해튼 거리에 P가 있는 경우
  for (let [dx, dy] of dir2) {
    const newX = x + dx,
      newY = y + dy;
    if (!isInRoom(newX, newY) || room[newX][newY] !== "P") continue;

    // 맨해튼 거리가 2인데 벽이 있는 경우
    if (Math.abs(dx) === 2 && room[(x + newX) / 2][y] === "X") continue;
    if (Math.abs(dy) === 2 && room[x][(y + newY) / 2] === "X") continue;

    // 맨해튼 거리가 1인데 벽이 있는 경우
    if (
      Math.abs(dx) === 1 &&
      Math.abs(dy) === 1 &&
      room[x][newY] === "X" &&
      room[newX][y] === "X"
    ) {
      continue;
    }

    return true; // 거리 위반
  }

  return false; // 거리 준수
}

// NOTE: 계산 함수 - 범위 내에 있는지 확인
function isInRoom(x, y) {
  return x >= 0 && x < 5 && y >= 0 && y < 5;
}
