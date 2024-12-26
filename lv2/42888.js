// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/42888

// NOTE: 비즈니스 로직
class OpenChat {
  constructor() {
    this.userMap = {}; // 사용자 ID와 닉네임 매핑
    this.message = {
      Leave: "님이 나갔습니다.",
      Enter: "님이 들어왔습니다.",
    };
  }

  updateUserMap(id, nickname) {
    this.userMap[id] = nickname;
  }

  generateMessage(state, id) {
    if (state === "Change") return null;

    return this.userMap[id] + this.message[state];
  }
}

// NOTE: 풀이
function solution(record) {
  const openChat = new OpenChat();

  // userMap 업데이트
  for (let command of record) {
    const [state, id, nickname] = command.split(" ");

    if (state !== "Leave") {
      openChat.updateUserMap(id, nickname);
    }
  }

  // 메세지 출력
  return record
    .map((command) => {
      const [state, id] = command.split(" ");
      return openChat.generateMessage(state, id);
    })
    .filter(Boolean); // null 제거
}
