// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/176962

function solution(plans) {
  const finished = [];
  const stack = [];
  const sortedPlans = [...plans]
    .map(([name, start, playtime]) => ({
      start: convertToMin(start),
      playtime: Number(playtime),
      end: convertToMin(start) + Number(playtime),
      name,
    }))
    .sort((a, b) => a.start - b.start);

  for (let i = 0; i < sortedPlans.length; i++) {
    const cur = sortedPlans[i];
    const next = sortedPlans[i + 1];

    if (!next) {
      finished.push(cur.name);
      break;
    }

    if (cur.end > next.start) {
      // NOTE: 현재 plan 끝나기 전에 다음 plan이 시작되는 경우
      cur.playtime -= next.start - cur.start;
      stack.push(cur);
    } else {
      // NOTE: 현재 plan이 끝나고 다음 plan이 시작되는 경우
      let restTime = next.start - cur.end;
      finished.push(cur.name);

      // NOTE: 진행중이던 과제 정리
      while (restTime > 0 && stack.length > 0) {
        let prev = stack.pop();
        let availableTime = Math.min(restTime, prev.playtime);

        prev.playtime -= availableTime;
        restTime -= availableTime;

        if (prev.playtime === 0) {
          finished.push(prev.name);
        } else {
          stack.push(prev);
        }
      }
    }
  }

  // NOTE: 진행중이던 과제 처리
  while (stack.length > 0) {
    finished.push(stack.pop().name);
  }

  return finished;
}

function convertToMin(time) {
  const [hour, min] = time.split(":");
  return parseInt(hour) * 60 + parseInt(min);
}
