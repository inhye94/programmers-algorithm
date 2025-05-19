// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/388352

function solution(n, q, ans) {
  const TOTAL_COUNT = 5;
  let candidates = getCandidates(n, q, ans); // 숫자 범위 줄이기 - 최적화
  let result = 0;

  // 조합 조건 정의
  const condition = {
    isPossibleCombination(matchCount, i) {
      return matchCount <= ans[i];
    },
    isMatch(matchCount, i) {
      return matchCount === ans[i];
    },
  };

  // 제일 많이 일치하는 것 위주로 조합 찾기 - 최적화
  const maxMatch = Math.max(...ans);
  const index = ans.indexOf(maxMatch);
  const combinations = dfs(q[index], maxMatch).filter((comb) =>
    isValid(comb, q, condition.isPossibleCombination)
  );

  // 정수 조합 개수 찾기
  const remainingCount = TOTAL_COUNT - maxMatch;

  for (let comb of combinations) {
    const restCandidates = candidates.filter((num) => !comb.includes(num));
    const restCombinations = dfs(restCandidates, remainingCount);

    for (let rest of restCombinations) {
      const fullCombination = [...comb, ...rest];
      if (isValid(fullCombination, q, condition.isMatch)) result++;
    }
  }

  return result;
}

// 숫자 후보 찾기
function getCandidates(n, q, ans) {
  let temp = Array(n + 1).fill(true);
  let numbers = [];

  q.forEach((arr, i) => {
    for (let num of arr) {
      if (temp[num] === null) continue;
      if (ans[i] === 0) temp[num] = null;
    }
  });

  for (let i = 1; i < temp.length; i++) {
    if (temp[i]) numbers.push(i);
  }

  return numbers;
}

// 유효성 확인
function isValid(combination, q, condition) {
  return q.every((arr, i) => {
    const matchCount = arr.filter((num) => combination.includes(num)).length;

    if (condition(matchCount, i)) {
      return true;
    } else {
      return false;
    }
  });
}

// 조합찾기
function dfs(combArr, limit) {
  let result = [];
  if (limit === 1) return combArr.map((item) => [item]);

  combArr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = dfs(rest, limit - 1);
    const attached = combinations.map((el) => [fixed, ...el]);
    result.push(...attached);
  });

  return result;
}
