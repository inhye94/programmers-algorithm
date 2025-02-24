// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/17683

function solution(m, musicinfos) {
  const normalizedM = normalizeSheet(m);
  let answer = null;

  for (const info of musicinfos) {
    const [start, end, title, music] = info.split(",");
    const duration = getTotalMin(end) - getTotalMin(start);
    const normalizedSheet = normalizeSheet(music);

    // 악보를 재생 시간만큼 반복 후, 정확한 길이로 자름
    const playedSheet = normalizedSheet
      .repeat(Math.ceil(duration / normalizedSheet.length))
      .slice(0, duration);

    // 악보에 m이 포함되는 경우
    if (playedSheet.includes(normalizedM)) {
      if (!answer || duration > answer.duration) {
        answer = { title, duration };
      }
    }
  }

  return answer ? answer.title : "(None)";
}

// NOTE: 계산 함수
function getTotalMin(time) {
  const [hourAmount, minAmount] = time.split(":").map(Number);
  return 60 * hourAmount + minAmount;
}

// NOTE: 계산 함수
function normalizeSheet(sheet) {
  return sheet
    .replace(/C#/g, "c")
    .replace(/D#/g, "d")
    .replace(/F#/g, "f")
    .replace(/G#/g, "g")
    .replace(/A#/g, "a")
    .replace(/B#/g, "b");
}
