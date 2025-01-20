// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/155651

function solution(book_time) {
  // NOTE: 시간을 MM 단위 숫자로 변환 및 정렬 ([{ checkIn: 12345, checkOut:54321 }, ...])
  const 예약배열_체크인기준_오름차순 = book_time
    .map((time) => 변환해라_예약객체로(time))
    .sort((a, b) => 비교해라_체크인시간(a, b));

  // NOTE: 방 개수 구하기
  const 힙_체크아웃 = [];

  for (let 예약 of 예약배열_체크인기준_오름차순) {
    const { 체크인, 체크아웃 } = 예약;

    // 기존 방과 비교
    if (힙_체크아웃.length > 0 && 힙_체크아웃[0] <= 체크인) {
      힙_체크아웃.shift();
    }

    // 새로운 방 생성
    힙_체크아웃.push(체크아웃);

    // 힙 오름차순 정렬
    힙_체크아웃.sort((a, b) => a - b);
  }

  return 힙_체크아웃.length;
}

// NOTE: 계산함수
const 변환해라_예약객체로 = (time) => {
  const [체크인, 체크아웃] = time;

  return {
    체크인: 변환해라_MM단위숫자로(체크인),
    체크아웃: 변환해라_MM단위숫자로(체크아웃) + 10, // 청소시간 10분
  };
};

const 변환해라_MM단위숫자로 = (timeString) => {
  const [시간, 분] = timeString.split(":");
  return Number(시간) * 60 + Number(분);
};

const 비교해라_체크인시간 = (a, b) => {
  return a.체크인 - b.체크인;
};
