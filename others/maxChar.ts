// 입력된 문자열에서 소문자와 대문자가 동시에 나오는 알파벳을 찾고, 그 중 가장 아스키코드가 큰 대문자 반환하기
function solution(str: string): string {
  let maxChar: string = "";
  const characters: Set<string> = new Set(str);

  for (let char of str) {
    const lower = char.toLowerCase();
    const upper = char.toUpperCase();

    if (characters.has(lower) && characters.has(upper)) {
      maxChar = maxChar > upper ? maxChar : upper;
    }
  }

  return maxChar || "NO";
}

console.log(solution("WeTestCodErs")); // 'T'
console.log(solution("abcdefhJIO")); // 'NO'
