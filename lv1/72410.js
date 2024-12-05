// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/72410

// 2024 답
function solution(new_id) {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 15;

  const filteredId = normalizeId(new_id, MAX_LENGTH);

  return filteredId.length < MIN_LENGTH
    ? repeatLastChar(filteredId, MIN_LENGTH)
    : filteredId;
}

// 비즈니스 로직
function normalizeId(new_id, maxLength) {
  return new_id
    .toLowerCase()
    .replace(/[^0-9a-z\-\_\.]/g, "")
    .replace(/\.{2,}/g, ".")
    .replace(/^\.|\.$/g, "")
    .replace(/^$/g, "a")
    .slice(0, maxLength)
    .replace(/\.$/g, "");
}

// 계산 함수
function repeatLastChar(str, length) {
  const lastChar = str.at(-1);
  return str.padEnd(length, lastChar);
}

// 이전 답
// function solution(new_id) {
//   const MIN_LENGTH = 3;
//   const MAX_LENGTH = 15;

//   const _id = new_id
//     .toLowerCase() // 1 소문자
//     .replace(/[^\w-.]/g, "") // 2 특수문자 제거
//     .replace(/\.{2,}/g, ".") // 3 . 중복 제거
//     .replace(/^\.|\.$/, "") // 4 처음과 끝 . 제거
//     .padEnd(1, "a") // 5 빈문자열에 a 대입
//     .slice(0, MAX_LENGTH) // 6 최대 15글자
//     .replace(/\.$/, ""); // 6 끝 . 제거

//   return _id.length < 3 ? _id.padEnd(MIN_LENGTH, _id[_id.length - 1]) : _id;
// }

// 옛날 답
// function solution(new_id) {
//   const MIN_LENGTH = 3;
//   const MAX_LENGTH = 15;

//   const _step1 = new_id.toLowerCase();

//   const _reg = /[~!@#$%^&*()=+\[\{\]\}:?,<>\/]/gim;
//   const _step2_arr = _step1.replace(_reg, "").split("");

//   let _dot_count = 0;
//   const _step3_arr = _step2_arr.filter((char, index) => {
//     return !(char == "." && _step2_arr[index - 1] == ".");
//   });

//   const _step4_arr = [..._step3_arr];
//   _step3_arr[0] == "." && _step4_arr.shift();
//   _step3_arr[_step3_arr.length - 1] == "." && _step4_arr.pop();

//   const _step5_arr = _step4_arr.length ? [..._step4_arr] : ["a"];

//   const _step6_arr = _step5_arr.slice(0, MAX_LENGTH);
//   _step6_arr[_step6_arr.length - 1] == "." && _step6_arr.pop();

//   let _step7 = [..._step6_arr].join("");

//   if (_step7.length < MIN_LENGTH) {
//     _step7 = _step7.padEnd(MIN_LENGTH, _step7[_step7.length - 1]);
//   }

//   return _step7;
// }
