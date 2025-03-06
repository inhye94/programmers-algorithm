// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/12936

function solution(n, k) {
  const numArr = getNumberArray(n);
  const factorial = getFactorialArray(n);

  const result = [];
  let newK = k - 1; // 1부터 시작하는 k를 0부터 시작되게 수정

  // 팩토리얼 순열 구하기 - 각 자리수에 해당하는 숫자를 구함
  while (numArr.length) {
    // 자리수에 해당하는 숫자가 몇 번째 숫자인지 계산
    let factorialIndex = numArr.length - 1;
    const index = Math.floor(newK / factorial[factorialIndex]);

    // 결과 배열에 추가
    result.push(numArr[index]);

    // numArr 갱신 - 사용한 숫자 제거
    numArr.splice(index, 1);

    // k 갱신 - 남은 숫자들로 몇 번째 순열인지 계산
    newK %= factorial[factorialIndex];
  }

  return result;
}

// NOTE: 계산 함수 - 팩토리얼 배열 구하기, (n -1)! 까지 구함.
function getFactorialArray(n) {
  const factorial = Array(n).fill(1);

  for (let i = 1; i < n; i++) {
    factorial[i] = factorial[i - 1] * i;
  }

  return factorial;
}

// NOTE: 계산 함수 - 1부터 n까지 숫자 배열 구하기
function getNumberArray(n) {
  return Array.from({ length: n }, (_, i) => i + 1);
}
