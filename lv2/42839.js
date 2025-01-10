// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/42839

function solution(numbers) {
  // 숫자 조합 > 순열
  const cards = [...numbers].sort();
  const tempArr = [];

  for (let i = 1; i <= cards.length; i++) {
    tempArr.push(...getPermutation(cards, i).map((el) => Number(el)));
  }

  // prime 구하기 > 에라토스테네스의 체
  const permArr = [...new Set(tempArr)];
  const primeArr = getPrimeNumber(permArr.at(-1));

  // 개수 구하기
  return permArr.reduce((acc, cur) => (primeArr[cur] ? acc + 1 : acc), 0);
}

function getPermutation(arr, selectAmount) {
  const results = [];
  if (selectAmount === 1) {
    return arr.map((el) => el);
  }

  arr.forEach((fixed, index, origin) => {
    const rest = [...origin.slice(0, index), ...origin.slice(index + 1)];
    const permutations = getPermutation(rest, selectAmount - 1);
    const attached = permutations.map((el) => [fixed, ...el].join(""));
    results.push(...attached);
  });

  return results;
}

function getPrimeNumber(max) {
  const arr = Array(max + 1).fill(true);

  arr[0] = false;
  arr[1] = false;

  for (let i = 2; i <= Math.sqrt(max); i++) {
    if (!arr[i]) continue;
    for (let j = 2; j * i <= max; j++) {
      arr[i * j] = false;
    }
  }

  return arr;
}
