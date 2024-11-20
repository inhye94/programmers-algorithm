// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/12977

function solution(nums) {
  let answer = 0;

  for (let i = 0; i < nums.length - 2; i++) {
    const firstNum = nums[i];

    for (let j = i + 1; j < nums.length - 1; j++) {
      const secondNum = nums[j];

      for (let z = j + 1; z < nums.length; z++) {
        const thirdNum = nums[z];

        if (isPrime(firstNum + secondNum + thirdNum)) {
          answer += 1;
        }
      }
    }
  }

  return answer;
}

function isPrime(num) {
  // 제곱근이 정수인 경우, 소수가 아니다
  if (Number.isInteger(Math.sqrt(num))) {
    return false;
  }

  // 2~제곱근까지 순차대로 나눠서, 나머지가 0이면 소수가 아니다
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
      return false;
    }
  }

  return true;
}

// 중첩이 3개까지 되는 for문 > 총 경우의 수가 1,176이라 성능에 크게 영향을 주지 않을거라 판단
// (성능개선) isPrime for문 [범위] 1~sum >> 2~Math.sqrt(sum), [경우의 수] 4,492,488 >> 1,484
// (성능개선) isPrime early return >> 제곱근이 정수면, 소수 아니다
