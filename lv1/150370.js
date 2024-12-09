// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/150370

// 2024 답
function solution(today, terms, privacies) {
  const TODAY = new Date(today);

  const docTerm = terms.reduce((acc, term) => {
    const [doc, month] = term.split(" ");
    acc[doc] = Number(month);
    return acc;
  }, {});

  return privacies
    .map((privacy, i) => {
      const [start, doc] = privacy.split(" ");
      const expirationDate = calcExpirationDate(start, docTerm[doc]);

      return isPrivacyExpired(TODAY, expirationDate) ? i + 1 : null;
    })
    .filter((v) => v);
}

function calcExpirationDate(start, plus) {
  const expirationDate = new Date(start);
  expirationDate.setMonth(expirationDate.getMonth() + plus);

  return expirationDate;
}

function isPrivacyExpired(today, endDate) {
  return today >= endDate;
}

// 이전 답
function solution(today, terms, privacies) {
//   const _today = new Date(today);
//   const _terms_map = new Map(terms.map((item) => item.split(" ")));

//   let _remove_arr = [];
//   privacies.forEach((item, index) => {
//     const [_collect_date, _type] = item.split(" ");

//     const _date = new Date(_collect_date);
//     const _end_date = _date.setMonth(_date.getMonth() + +_terms_map.get(_type));

//     _end_date <= _today && _remove_arr.push(index + 1);
//   });

//   return _remove_arr;
// }
