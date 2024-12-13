// NOTE: https://school.programmers.co.kr/learn/courses/30/lessons/92334

// 2024 답
function solution(id_list, report, k) {
  const uniqueReports = [...new Set(report)];
  const { reportMap, reportCounts } = processReports(uniqueReports); // 상태

  return id_list.map((id) => {
    if (!reportMap[id]) return 0;
    return reportMap[id].filter((villain) => reportCounts[villain] >= k).length;
  });
}

function processReports(report) {
  const reportMap = {}; // 누가 누구 신고했게
  const reportCounts = {}; // 빌런이 받은 누적신고 횟수

  report.forEach((item) => {
    const [reporter, villain] = item.split(" ");

    // reportMap 업데이트
    if (!reportMap[reporter]) {
      reportMap[reporter] = [];
    }

    reportMap[reporter].push(villain);

    // reportCounts 업데이트
    reportCounts[villain] = (reportCounts[villain] || 0) + 1;
  });

  return { reportMap, reportCounts };
}

// 이전 답
function before(id_list, report, k) {
  const _report_only = [...new Set(report)];
  const _reporter_map = new Map(id_list.map((id) => [id, new Set()]));
  const _score_heap = {};

  for (let item of _report_only) {
    const [_reporter, _villain] = item.split(" ");

    _reporter_map.get(_reporter).add(_villain);
    _score_heap[_villain] = (_score_heap[_villain] || 0) + 1;
  }

  const _mail_arr = id_list.map((_reporter) => {
    return [..._reporter_map.get(_reporter)].filter(
      (_villain) => _score_heap[_villain] >= k
    ).length;
  });

  return _mail_arr;
}
