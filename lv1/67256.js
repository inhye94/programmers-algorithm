// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/67256

function solution(numbers, hand) {
  let _pos_left = "*";
  let _pos_right = "#";
  const _hand_side = [null, "L", null, "R", "L", null, "R", "L", null, "R"];
  const _key_pad = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
    "*": [3, 0],
    0: [3, 1],
    "#": [3, 2],
  };

  const calcDiff = (input_key, comp_key) => {
    const _row = Math.abs(_key_pad[input_key][0] - _key_pad[comp_key][0]);
    const _col = Math.abs(_key_pad[input_key][1] - _key_pad[comp_key][1]);
    return _row + _col;
  };

  const matchHand = (key) => {
    const _diff_left = calcDiff(key, _pos_left);
    const _diff_right = calcDiff(key, _pos_right);

    if (_diff_left == _diff_right) {
      hand == "left" && (_pos_left = key);
      hand == "right" && (_pos_right = key);
      return hand == "left" ? "L" : "R";
    } else {
      _diff_left < _diff_right && (_pos_left = key);
      _diff_left > _diff_right && (_pos_right = key);
      return _diff_left < _diff_right ? "L" : "R";
    }
  };

  return numbers
    .map((key) => {
      _hand_side[key] == "L" && (_pos_left = key);
      _hand_side[key] == "R" && (_pos_right = key);
      return _hand_side[key] || matchHand(key);
    })
    .join("");
}
