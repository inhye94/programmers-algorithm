// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/340213

function solution(video_len, pos, op_start, op_end, commands) {
  // NOTE: 입력 변환
  const videoLength = convertToSeconds(video_len);
  const initPosition = convertToSeconds(pos);
  const openingRange = {
    start: convertToSeconds(op_start),
    end: convertToSeconds(op_end),
  };

  // NOTE: 초기 위치 설정
  let curPosition = initPosition;

  if (isPositionInRange(curPosition, openingRange.start, openingRange.end)) {
    curPosition = openingRange.end;
  }

  // NOTE: 명령어 처리
  for (let command of commands) {
    curPosition = updatePosition(
      command,
      curPosition,
      videoLength,
      openingRange
    );
  }

  // NOTE: 결과 반환
  return formatTime(curPosition);
}

// NOTE: 비즈니스 로직
function updatePosition(command, curPosition, videoLength, openingRange) {
  let position = curPosition;
  const { start, end } = openingRange;

  if (command === "prev") {
    position = Math.max(0, position - 10);
  }

  if (command === "next") {
    position = Math.min(videoLength, position + 10);
  }

  if (isPositionInRange(position, start, end)) {
    position = end;
  }

  return position;
}

// NOTE: 계산 함수
function isPositionInRange(position, rangeStart, rangeEnd) {
  return rangeStart <= position && position <= rangeEnd;
}

function convertToSeconds(time) {
  const [min, sec] = time.split(":").map((v) => Number(v));

  return 60 * min + sec;
}

function formatTime(seconds) {
  const min = String(parseInt(seconds / 60));
  const sec = String(seconds % 60);

  return `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
}
