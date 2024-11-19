// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/12901

function solution(a, b) {
  const day = new Date(`2016-${a}-${b}`).getDay();
  // const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const week = "SUN,MON,TUE,WED,THU,FRI,SAT".split(",");

  return week[day];
}

// Date API
