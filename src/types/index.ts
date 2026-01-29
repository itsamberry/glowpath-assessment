// 学生信息
export interface StudentInfo {
  name: string;
  grade: string;
  track: string;
  target: string;
}

// 答案数据结构（1-56题）
export type Answers = Record<string, number>;

// 输入数据格式
export interface AssessmentInput {
  student: StudentInfo;
  answers: Answers;
}

// RIASEC 维度
export interface RIASECScores {
  realistic: number;      // 实际型（R）
  investigative: number;  // 研究型（I）
  artistic: number;       // 艺术型（A）
  social: number;         // 社会型（S）
  enterprising: number;   // 企业型（E）
  conventional: number;   // 常规型（C）
}

// Big Five 维度
export interface BigFiveScores {
  openness: number;           // 开放性
  conscientiousness: number;  // 尽责性
  extraversion: number;       // 外向性
  agreeableness: number;      // 宜人性
  emotionalStability: number; // 情绪稳定性
}

// 价值观维度
export interface ValueScores {
  achievement: number;        // 成就感
  autonomy: number;          // 独立自主
  recognition: number;       // 认可与声望
  relationships: number;     // 人际关系
  support: number;           // 支持体系
  workConditions: number;    // 工作条件/安全感
}

// 完整的评估结果
export interface AssessmentResult {
  student: StudentInfo;
  riasec: RIASECScores;
  bigFive: BigFiveScores;
  values: ValueScores;
  riasecTop3: Array<{ key: string; name: string; score: number }>;
  valuesTop2: Array<{ key: string; name: string; score: number }>;
}
