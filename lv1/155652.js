// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/155652

// 2024 답
function solution(s, skip, index) {
  const table = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .filter((char) => !skip.includes(char));

  return [...s].map((char) => getNewChar(char, table, index)).join("");
}

function getNewChar(char, table, index) {
  const currentIndex = table.indexOf(char);
  const newIndex = (currentIndex + index) % table.length;
  return table[newIndex];
}
// '-' 대신 '%' 로 계산하는 이유 = skip 문자길이 10개, index 20일 때

// 이전 답
// function solution(s, skip, index) {
//   let _a_z = "abcdefghijklmnopqrstuvwxyz".repeat(3);

//   for (let char of skip) {
//     _a_z = _a_z.replaceAll(char, "");
//   }

//   return [...s].map((char) => _a_z[_a_z.indexOf(char) + index]).join("");
// }
