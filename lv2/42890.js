// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/42890
// NOTE: 도움 받은 블로그 https://tesseractjh.tistory.com/247

function solution(relation) {
  const rowLen = relation.length;
  const colLen = relation[0].length;

  const bfs = () => {
    // 탐색 함수 정의
    const queue = [...Array(colLen)].map((_, index) => [index]); // [[0], [1], [2], ...]
    const candidate = []; // [[0], [2], [0, 1], ...]

    // 탐색 시작
    while (queue.length) {
      const indices = queue.shift(); // 지수

      // 최소성 검사 - 후보키가 indices의 부분집합인 경우, 최소성을 만족하지 못함
      const isMinimal = candidate.find((cand) =>
        cand.every((index) => indices.includes(index))
      );
      if (isMinimal) continue;

      // 유일성 검사 - set.size === rowLen이면, 모든 튜플이 유일함
      const set = new Set();
      for (let row = 0; row < rowLen; row++) {
        const keys = JSON.stringify(
          indices.map((index) => relation[row][index])
        );
        set.add(keys);
      }

      const isUnique = set.size === rowLen;
      if (isUnique) {
        // 유일성 만족
        candidate.push(indices);
      } else {
        // 유일성 만족하지 못하는 경우 - 새로운 조합 추가
        for (let i = indices[indices.length - 1] + 1; i < colLen; i++) {
          queue.push([...indices, i]);
        }
      }
    }

    return candidate.length;
  };

  return bfs();
}
