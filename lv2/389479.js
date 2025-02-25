// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/389479

function solution(players, m, k) {
  let count = 0;
  let timer = Array(k).fill(0); // 타이머 item = 현재 구동중인 서버 수, 타이머 길이 = k, queue로 사용(shift, push)
  let activeServers = 0;

  for (let player of players) {
    // 만료 처리
    activeServers -= timer.shift();

    // 필요한 서버 수 계산 (올림 처리)
    const requiredServers = player === 0 ? 0 : Math.floor(player / m);
    const additionalServers = Math.max(0, requiredServers - activeServers);

    // 서버 증설
    activeServers += additionalServers;
    count += additionalServers;

    // 타이머 갱신
    timer.push(additionalServers);
  }

  return count;
}
