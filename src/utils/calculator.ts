import type {
  Answers,
  AssessmentInput,
  AssessmentResult,
  RIASECScores,
  BigFiveScores,
  ValueScores,
} from '../types';

/**
 * 计算题目的平均分
 */
function calculateAverage(answers: Answers, questions: number[]): number {
  const sum = questions.reduce((acc, q) => acc + (answers[q] || 0), 0);
  return parseFloat((sum / questions.length).toFixed(2));
}

/**
 * 计算反向计分题目的平均分（6 - 分数）
 */
function calculateReverseAverage(answers: Answers, questions: number[]): number {
  const sum = questions.reduce((acc, q) => acc + (6 - (answers[q] || 0)), 0);
  return parseFloat((sum / questions.length).toFixed(2));
}

/**
 * 计算 RIASEC 分数
 * 题号 1-30，每个维度 5 题
 */
export function calculateRIASEC(answers: Answers): RIASECScores {
  return {
    realistic: calculateAverage(answers, [1, 2, 3, 4, 5]),
    investigative: calculateAverage(answers, [6, 7, 8, 9, 10]),
    artistic: calculateAverage(answers, [11, 12, 13, 14, 15]),
    social: calculateAverage(answers, [16, 17, 18, 19, 20]),
    enterprising: calculateAverage(answers, [21, 22, 23, 24, 25]),
    conventional: calculateAverage(answers, [26, 27, 28, 29, 30]),
  };
}

/**
 * 计算 Big Five 分数
 * 题号 31-44
 */
export function calculateBigFive(answers: Answers): BigFiveScores {
  return {
    openness: calculateAverage(answers, [31, 32, 33]),
    conscientiousness: parseFloat(
      (
        (calculateAverage(answers, [34, 35]) +
          calculateReverseAverage(answers, [36])) /
        2
      ).toFixed(2)
    ),
    extraversion: calculateAverage(answers, [37, 38, 39]),
    agreeableness: calculateAverage(answers, [40, 41]),
    emotionalStability: calculateReverseAverage(answers, [42, 43, 44]),
  };
}

/**
 * 计算价值观分数
 * 题号 45-56，每个维度 2 题
 */
export function calculateValues(answers: Answers): ValueScores {
  return {
    achievement: calculateAverage(answers, [45, 46]),
    autonomy: calculateAverage(answers, [47, 48]),
    recognition: calculateAverage(answers, [49, 50]),
    relationships: calculateAverage(answers, [51, 52]),
    support: calculateAverage(answers, [53, 54]),
    workConditions: calculateAverage(answers, [55, 56]),
  };
}

/**
 * 获取 RIASEC Top3
 */
export function getRIASECTop3(scores: RIASECScores) {
  const nameMap: Record<string, string> = {
    realistic: '实际型(R)',
    investigative: '研究型(I)',
    artistic: '艺术型(A)',
    social: '社会型(S)',
    enterprising: '企业型(E)',
    conventional: '常规型(C)',
  };

  const entries = Object.entries(scores).map(([key, score]) => ({
    key,
    name: nameMap[key],
    score,
  }));

  // 按分数降序排序，分数相同按定义顺序
  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return Object.keys(scores).indexOf(a.key) - Object.keys(scores).indexOf(b.key);
  });

  return entries.slice(0, 3);
}

/**
 * 获取价值观 Top2
 */
export function getValuesTop2(scores: ValueScores) {
  const nameMap: Record<string, string> = {
    achievement: '成就感',
    autonomy: '独立自主',
    recognition: '认可与声望',
    relationships: '人际关系',
    support: '支持体系',
    workConditions: '工作条件/安全感',
  };

  const entries = Object.entries(scores).map(([key, score]) => ({
    key,
    name: nameMap[key],
    score,
  }));

  // 按分数降序排序，分数相同按定义顺序
  entries.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return Object.keys(scores).indexOf(a.key) - Object.keys(scores).indexOf(b.key);
  });

  return entries.slice(0, 2);
}

/**
 * 主函数：计算完整的评估结果
 */
export function calculateAssessment(input: AssessmentInput): AssessmentResult {
  const riasec = calculateRIASEC(input.answers);
  const bigFive = calculateBigFive(input.answers);
  const values = calculateValues(input.answers);

  return {
    student: input.student,
    riasec,
    bigFive,
    values,
    riasecTop3: getRIASECTop3(riasec),
    valuesTop2: getValuesTop2(values),
  };
}
