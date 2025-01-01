// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/77885

function solution(numbers) {
  return numbers.map((n) => {
    const binary = n.toString(2).split(""); // 이진수로 변환
    const lastZeroIndex = binary.lastIndexOf("0");

    if (lastZeroIndex === -1) {
      // NOTE: 모두 1인 경우, 두 번째 자리에 '0' 삽입 (111 => 1011)
      binary.splice(1, 0, "0");
    } else if (binary.length - 1 === lastZeroIndex) {
      // NOTE: 마지막이 0인 경우, 0을 1로 변경 (100 => 101)
      binary[lastZeroIndex] = "1";
    } else {
      // NOTE: 중간에 0이 있는 경우, 0과 오른쪽의 숫자를 변경 (101 => 110)
      [binary[lastZeroIndex], binary[lastZeroIndex + 1]] = ["1", "0"];
    }

    return parseInt(binary.join(""), 2); // 10진수로 변환
  });
}
