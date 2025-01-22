// NOTE; https://school.programmers.co.kr/learn/courses/30/lessons/86971

function solution(n, wires) {
  let minDiff = Infinity;

  for (let i = 0; i < wires.length; i++) {
    // 특정 간선을 제거한 트리 생성
    const remainingWires = [...wires.slice(0, i), ...wires.slice(i + 1)];
    const tree = buildTree(n, remainingWires);

    // 한쪽 노드의 개수 계산
    const [leftRoot] = wires[i];
    const count = countNodes(leftRoot, tree, n);

    // 두 트리의 노드 개수 차이 계산
    minDiff = Math.min(minDiff, Math.abs(count - (n - count)));
  }

  return minDiff;
}

// NOTE: 계산 함수
function countNodes(root, tree, n) {
  const visited = Array(n + 1).fill(false); // 방문: true, 미방문: false
  let count = 0;

  // root 방문 처리
  const queue = [root];
  visited[root] = true;

  while (queue.length > 0) {
    const currentNode = queue.shift();
    count += 1;

    for (let neighbor of tree.get(currentNode)) {
      if (visited[neighbor]) continue;

      visited[neighbor] = true;
      queue.push(neighbor);
    }
  }

  return count;
}

// NOTE: 데이터 함수
function buildTree(n, wires) {
  const tree = new Map();

  // 초기화
  for (let i = 1; i <= n; i++) {
    tree.set(i, []);
  }

  for (let [node1, node2] of wires) {
    tree.get(node1).push(node2);
    tree.get(node2).push(node1);
  }

  return tree;
}
