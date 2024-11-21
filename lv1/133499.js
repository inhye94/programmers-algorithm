// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/133499

function solution(babbling) {
  let _count = 0;
  const _wordArr = ["aya", "ye", "woo", "ma"];
  const _copiedBabbling = babbling.slice();

  for (let _item of _copiedBabbling) {
    for (let _word of _wordArr) {
      if (!_item.includes(_word)) continue;

      // NOTE: 중복되는 경우
      if (_item.replaceAll(_word, "*").includes("**")) break;

      _item = _item.replaceAll(_word, "_");
    }

    _item.replaceAll("_", "").length || _count++;
  }

  return _count;
}

// 첫번째 for문에 의해 완전 탐색
// 중첩된 for문은 조건에 따라 4번~1번으로 줄어듦
// 원본불변을 위해 _copiedBabbling 생성
