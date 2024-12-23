// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/17686

function solution(files) {
  // head, number, 순서가 필요
  return files
    .map((file) => {
      const match = file.match(/^([a-zA-Z .-]+)(\d+)/); // [ file명, head, number ]
      const head = match[1].toUpperCase(); // 대문자로 파싱
      const num = Number(match[2]); // 숫자로 파싱

      return { file, head, num };
    })
    .sort((a, b) => {
      if (a.head < b.head) return -1;
      if (a.head > b.head) return 1;

      if (a.head === b.head) {
        return a.num - b.num;
      }
    })
    .map(({ file }) => file);
}
