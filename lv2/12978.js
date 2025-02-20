// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/12978?language=javascript

function solution(N, road, K) {
  const minDistArr = Array(N + 1).fill(Infinity);
  minDistArr[1] = 0;

  let tree = getTree(road);
  const queue = [{ to: 1, dist: 0 }];

  while (queue.length) {
    queue.sort((a, b) => a.dist - b.dist); // 정렬 (최적화하려고 > dist 크기 비교하고 넘기거나 계산하거나)
    const { to, dist } = queue.shift(); // 가까운 노드

    // 이미 최소값이면 넘기기
    if (dist > minDistArr[to]) continue;

    const mid = to;

    // 최소 거리 구하기
    tree.get(mid).forEach(({ to: next, dist: nextDist }) => {
      // 기존 (1 → next) 최단 거리 vs 새로운 경로 (1 → mid → next) 거리 비교
      if (minDistArr[next] > minDistArr[mid] + nextDist) {
        minDistArr[next] = minDistArr[mid] + nextDist;
        queue.push({ to: next, dist: minDistArr[next] });
      }
    });
  }

  return minDistArr.filter((v) => v <= K).length;
}

// 트리 생성 함수 (데이터 함수)
function getTree(road) {
  const roadMap = new Map();

  // 더 짧은 간선으로 교체하는 함수 (계산 함수)
  // 메모리 최적화를 위해 로컬 함수로 구현. roadMap이 매개변수로 넘어가면 얕은 복사 발생.
  function updateRoad(from, to, dist) {
    const linkedEdges = roadMap.get(from);
    const foundEdge = linkedEdges.find((edge) => edge.to === to);

    if (foundEdge) {
      foundEdge.dist = Math.min(foundEdge.dist, dist); // 더 짧은 간선으로 교체
    } else {
      linkedEdges.push({ to, dist });
    }
  }

  // roadMap 생성
  for (let [node1, node2, dist] of road) {
    if (!roadMap.has(node1)) roadMap.set(node1, []);
    if (!roadMap.has(node2)) roadMap.set(node2, []);

    updateRoad(node1, node2, dist);
    updateRoad(node2, node1, dist);
  }

  return roadMap;
}
