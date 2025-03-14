// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/62048
// NOTE: 대각선이 지나가는 단위 정사각형의 개수를 구하는 수학적인 공식 https://hyem-study.tistory.com/45

/**
 * 문제 해석
 *
 * w = a * b;
 * h = a * c;
 * (a는 최대공약수)
 *
 * w * h의 직사각형은 b * c 의 네모가 a^2번 오는 것과 같다.
 * b와 c를 지나가는 대각선은 b + c - 이다. (서로소이기 때문)
 *
 * 그럼 대각선이 지나는 정사각형의 개수는
 * 대각선은 (b * c) 네모 a개 만큼이다
 * (b + c - 1) * a = a*b + a*c - a = w + h - a
 *
 * 그래서 답은 w * h - (w + h - a)가 된다.
 */

function solution(w, h) {
  const [b, a] = [w, h].sort();
  return w * h - (w + h - gcd(a, b));
}

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}
