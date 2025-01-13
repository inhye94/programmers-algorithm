// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/42583

function solution(bridge_length, weight, truck_weights) {
  const waitingTrucks = [...truck_weights];
  const bridge = Array(bridge_length).fill(0);
  let time = 0;

  while (bridge.length) {
    time += 1;
    bridge.shift();

    // NOTE: 대기중인 트럭이 없는 경우
    if (waitingTrucks.length === 0 && bridge.every((truck) => truck === 0))
      break;

    // NOTE: 다리를 건너기
    const bridgeWeight = bridge.reduce((total, truck) => total + truck, 0);
    const isPermitted =
      waitingTrucks.length > 0 && bridgeWeight + waitingTrucks[0] <= weight;

    if (isPermitted) {
      bridge.push(waitingTrucks.shift()); // 트럭을 다리에 올림
    } else {
      bridge.push(0); // 빈 공간 유지
    }
  }

  return time;
}
