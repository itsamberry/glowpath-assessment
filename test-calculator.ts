// 简单的测试脚本，验证计算逻辑是否正确
import { calculateAssessment } from './src/utils/calculator';
import type { AssessmentInput } from './src/types';

// 测试数据
const testData: AssessmentInput = {
  student: {
    name: "测试学生",
    grade: "高一",
    track: "普高",
    target: "美国本科",
  },
  answers: {
    // RIASEC (1-30)
    "1": 3, "2": 3, "3": 2, "4": 3, "5": 2,
    "6": 4, "7": 5, "8": 4, "9": 5, "10": 4,
    "11": 4, "12": 3, "13": 4, "14": 3, "15": 4,
    "16": 4, "17": 5, "18": 4, "19": 4, "20": 5,
    "21": 3, "22": 4, "23": 3, "24": 3, "25": 4,
    "26": 2, "27": 3, "28": 2, "29": 3, "30": 2,
    // Big Five (31-44)
    "31": 4, "32": 5, "33": 4,
    "34": 3, "35": 4, "36": 3,
    "37": 4, "38": 3, "39": 4,
    "40": 4, "41": 5,
    "42": 2, "43": 3, "44": 2,
    // Values (45-56)
    "45": 5, "46": 4,
    "47": 4, "48": 5,
    "49": 3, "50": 3,
    "51": 4, "52": 4,
    "53": 3, "54": 4,
    "55": 3, "56": 3,
  },
};

// 执行计算
const result = calculateAssessment(testData);

console.log('=== 测试结果 ===\n');
console.log('学生信息:', result.student);
console.log('\nRIASEC 分数:', result.riasec);
console.log('RIASEC Top3:', result.riasecTop3);
console.log('\nBig Five 分数:', result.bigFive);
console.log('\n价值观分数:', result.values);
console.log('价值观 Top2:', result.valuesTop2);

// 验证分数是否在合理范围内
const allScores = [
  ...Object.values(result.riasec),
  ...Object.values(result.bigFive),
  ...Object.values(result.values),
];

const valid = allScores.every(score => score >= 1 && score <= 5);
console.log('\n✅ 所有分数都在 1-5 范围内:', valid);
