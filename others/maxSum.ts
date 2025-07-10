function solution(arr: number[]) {
  const sumMap = new Map();
  let maxSum = -1;

  // 자릿수 합 구하기
  for (let num of arr) {
    const digitSum = num
      .toString()
      .split("")
      .reduce((acc, cur) => acc + parseInt(cur), 0);

    if (!sumMap.has(digitSum)) {
      sumMap.set(digitSum, []);
    }

    sumMap.get(digitSum).push(num);
  }

  // 제일 큰 수 찾기
  for (let arr of sumMap.values()) {
    if (arr.length >= 2) {
      arr.sort((a, b) => b - a);

      if (maxSum < arr[0] + arr[1]) {
        maxSum = arr[0] + arr[1];
      }
    }
  }

  return maxSum;
}

let a = [53, 71, 18, 90];
console.log(solution(a)); // 124
