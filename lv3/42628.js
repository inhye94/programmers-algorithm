// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/42628

function solution(operations) {
  const queue = [];

  // NOTE: 명령어 처리의 확장성을 위한 상수
  const isDeleteMax = (value) => value === "1";
  const isDeleteMin = (value) => value === "-1";

  // NOTE: 명령어 처리의 확장성을 위한 객체
  const commandHandler = {
    I: (value) => {
      queue.push(Number(value));
      queue.sort((a, b) => a - b);
    },
    D: (value) => {
      if (isEmpty(queue)) return;

      if (isDeleteMax(value)) queue.pop();
      else if (isDeleteMin(value)) queue.shift();
    },
  };

  // NOTE: 명령어 처리
  for (let operation of operations) {
    const [command, value] = operation.split(" ");
    commandHandler[command]?.(value);
  }

  return isEmpty(queue) ? [0, 0] : [getMaxItem(queue), getMinItem(queue)];
}

// NOTE: 유틸 함수
const isEmpty = (array) => array.length === 0;
const getMaxItem = (array) => array[array.length - 1];
const getMinItem = (array) => array[0];
