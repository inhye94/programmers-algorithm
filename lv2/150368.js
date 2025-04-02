// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/150368

function solution(users, emoticons) {
  let bestPlan = [0, 0];
  const discountCombinations = dfs([], emoticons.length); // 할인율 조합 구하기

  // 가입자수, 가격 비교
  for (let discounts of discountCombinations) {
    let totalMembers = 0;
    let totalRevenue = 0;

    for (let [minDiscount, maxBudget] of users) {
      let userSpent = 0;

      for (let j = 0; j < discounts.length; j++) {
        // 구매 금액 계산
        if (isUserBuy(discounts[j], minDiscount)) {
          userSpent += calcPrice(discounts[j], emoticons[j]);
        }
      }

      // 회원 전환 확인
      if (isPremiumMember(userSpent, maxBudget)) {
        totalMembers += 1;
      } else {
        totalRevenue += userSpent;
      }
    }

    // 가장 많은 가입자수, 많은 매출 비교
    const [prevCount, prevPurchase] = bestPlan;
    if (
      totalMembers > prevCount ||
      (totalMembers === prevCount && totalRevenue > prevPurchase)
    ) {
      bestPlan = [totalMembers, totalRevenue];
      continue;
    }
  }

  return bestPlan;
}

// NOTE: 정책 함수
// 사용자가 최소 할인율 조건을 충족하는지 확인
function isUserBuy(discount, minDiscount) {
  return discount >= minDiscount;
}

// 사용자가 프리미엄 멤버로 전환되는지 확인
function isPremiumMember(userSpent, maxBudget) {
  return userSpent >= maxBudget;
}

// NOTE: 계산 함수
function calcPrice(discount, emoticonPrice) {
  return (1 - discount / 100) * emoticonPrice;
}

// NOTE: 데이터 함수
function dfs(combArr, limit) {
  if (combArr.length === limit) {
    return [combArr];
  }

  const discount = [10, 20, 30, 40];
  let combinations = [];

  for (let sale of discount) {
    combinations = combinations.concat(dfs([...combArr, sale], limit));
  }

  return combinations;
}
