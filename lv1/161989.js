// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/161989

function solution(n, m, section) {
  let wall = new Array(n).fill(1); // 1: 정상, 0: 빵꾸

  // 빵꾸 뚫기
  for (let index of section) {
    wall[index - 1] = 0;
  }

  let paintCount = 0;
  let index = 0;

  while (index < n) {
    if (wall[index] === 0) {
      paintCount += 1;
    }

    index += wall[index] ? 1 : m;
  }

  return paintCount;
}

// 벽에 집중하는 줄 알았는데, 포인터의 위치를 조정하는게 더 중요한 문제였음.
