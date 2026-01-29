import type { AssessmentResult } from '../types';

/**
 * 根据 RIASEC Top3 生成方向簇建议
 */
function getRIASECDirections(top3: AssessmentResult['riasecTop3']): string {
  const codes = top3.map((t) => t.key);
  const topCode = codes.join('-').toUpperCase();

  // 方向簇映射（基于Holland理论的常见组合）
  const directionMap: Record<string, string> = {
    'realistic-investigative': '工程技术、数据科学、技术研发',
    'realistic-conventional': '工程管理、质量控制、技术运维',
    'investigative-artistic': '用户研究、设计科学、创新咨询',
    'investigative-social': '教育研究、公共卫生、心理咨询',
    'artistic-social': '内容创作、文化传播、用户体验设计',
    'artistic-enterprising': '创意策划、品牌营销、新媒体运营',
    'social-enterprising': '人力资源、组织发展、教育创业',
    'enterprising-conventional': '商业分析、金融管理、运营管理',
  };

  const key = `${codes[0]}-${codes[1]}`;
  const direction = directionMap[key] || '跨领域复合型方向';

  return `你的兴趣代码是 **${topCode}**，这类学生通常在 **${direction}** 等领域能找到较好的匹配。这不是职业建议，而是探索方向的参考坐标系。`;
}

/**
 * 根据 Big Five 生成行为风格解读
 */
function getBigFiveInsights(bigFive: AssessmentResult['bigFive']): {
  learning: string;
  execution: string;
  social: string;
  stress: string;
} {
  const { openness, conscientiousness, extraversion, emotionalStability } = bigFive;

  // 学习风格
  let learning = '';
  if (openness > 3.5) {
    learning = openness > 4.2
      ? '你倾向于探索式学习，喜欢新概念和非常规思路，但可能需要注意"想法太多、落地太少"的风险。建议：每个新想法都设定一个小验证实验。'
      : '你对新知识保持好奇，能接受不同观点。适合多元化的学习环境，但要警惕"什么都想学、什么都不精"。';
  } else {
    learning = '你更倾向实用主义，喜欢有明确应用场景的知识。优势是效率高，但可能会错过一些"现在看似无用、未来有价值"的积累。';
  }

  // 执行风格
  let execution = '';
  if (conscientiousness > 3.5) {
    execution = conscientiousness > 4.2
      ? '你的执行力很强，能系统推进任务。代价是可能过度追求完美，在快速试错场景下会感到不适。适合结构化强的环境。'
      : '你能按计划完成任务，自律性较好。在确定性强的项目中表现稳定。';
  } else {
    execution = '你更灵活、适应性强，但在需要长期坚持的任务中可能会中途放弃。补偿策略：用外部约束（deadline/同伴监督）替代意志力。';
  }

  // 社交风格
  let social = '';
  if (extraversion > 3.5) {
    social = extraversion > 4.2
      ? '你在群体中充电，擅长调动气氛和推动协作。风险：独立深度工作时可能会感到枯燥。建议：给自己留"社交缓冲区"。'
      : '你能适应团队协作，也能接受独立工作。在大多数场景下都能找到舒适位置。';
  } else {
    social = '你倾向于小规模或1对1的深度交流，大型社交场合可能消耗你的能量。优势是专注力强，适合需要持续深度工作的方向。';
  }

  // 压力模式
  let stress = '';
  if (emotionalStability > 3.5) {
    stress = emotionalStability > 4.2
      ? '你的情绪波动小，能在压力下保持稳定。但也要警惕"钝感"——可能会忽略需要及时调整的信号。'
      : '你能较好地管理情绪，在多数情况下保持冷静。这是职场和学业中的重要优势。';
  } else {
    stress = '你对环境和反馈比较敏感，容易受挫折影响。这意味着你需要更友好的支持系统和更及时的正向反馈。不是缺点，而是环境匹配度的问题。';
  }

  return { learning, execution, social, stress };
}

/**
 * 根据价值观Top2生成解读
 */
function getValuesInsights(top2: AssessmentResult['valuesTop2']): {
  interpretation: string;
  environment: string;
  parentAdvice: string;
} {
  const topValue = top2[0].key;
  const secondValue = top2[1]?.key;

  const interpretations: Record<string, string> = {
    achievement: '你看重"做成事"的满足感。这类学生通常不满足于按部就班，而是希望看到自己的努力带来可见的成果。',
    autonomy: '你重视自主权和决策空间。在被过度管控的环境中会感到压抑，更适合能发挥主动性的场景。',
    recognition: '你在意外部认可和社会评价。这能成为强大的动力，但也要警惕过度依赖他人评价而忽视内在标准。',
    relationships: '你看重团队氛围和人际连接。在有归属感的环境中能发挥最大潜力，但要避免因人际关系问题影响决策。',
    support: '你希望有清晰的指导和资源支持。这不是依赖，而是知道在有支撑的情况下能走得更快。',
    workConditions: '你看重环境的稳定性和可预测性。在快速变化、高不确定性的场景中可能会感到不安。',
  };

  const environments: Record<string, string> = {
    achievement: '适合有明确目标和反馈机制的环境（如项目制、竞赛导向的学习）。',
    autonomy: '适合开放式探索的环境，避免过度标准化的培养体系。',
    recognition: '适合有清晰晋升路径或荣誉体系的环境，但需要注意避免"唯排名论"。',
    relationships: '适合团队协作紧密、文化氛围好的环境。选专业时可以重点考察"学长学姐氛围"。',
    support: '适合资源丰富、导师制完善的环境。留学时要重点评估"support system"。',
    workConditions: '适合结构稳定、流程清晰的环境。对于快速迭代的行业要谨慎评估适应成本。',
  };

  const interpretation = interpretations[topValue] + (secondValue ? ` 同时，${interpretations[secondValue].toLowerCase()}` : '');
  const environment = environments[topValue];

  const parentAdvice = `家长可以这样支持：在保证基本安全感的前提下，优先满足"${top2[0].name}"这一底线需求。这不是溺爱，而是让学生在舒适区内建立信心，再逐步拓展。`;

  return { interpretation, environment, parentAdvice };
}

/**
 * 生成优势与风险
 */
function generateStrengthsAndRisks(result: AssessmentResult): {
  strengths: string[];
  risks: string[];
} {
  const { riasecTop3, bigFive, valuesTop2 } = result;

  const strengths: string[] = [];
  const risks: string[] = [];

  // 基于RIASEC Top3的优势
  const top1 = riasecTop3[0];
  if (top1.score > 4.0) {
    strengths.push(`**${top1.name}倾向明显**：在相关领域有天然的兴趣驱动，这是长期坚持的核心动力。`);
  } else if (riasecTop3[0].score - riasecTop3[2].score < 0.5) {
    strengths.push(`**兴趣均衡**：不局限于单一领域，适合跨界方向，但要警惕"什么都行=什么都不精"。`);
  }

  // 基于Big Five的优势与风险
  if (bigFive.conscientiousness > 4.0) {
    strengths.push(`**高自律**：能系统推进长期目标，这在留学申请和学业完成中是显著优势。`);
    risks.push(`**风险：过度追求完美**。触发条件：遇到开放式问题或快速试错场景。补偿策略：设定"够用即可"的标准，用"80分完成"替代"100分完美"。`);
  }

  if (bigFive.openness > 4.0 && bigFive.conscientiousness < 3.0) {
    risks.push(`**风险：想法多但落地少**。触发条件：缺乏外部监督和deadline。补偿策略：为每个想法设定小型验证实验，强制"从0到1"。`);
  }

  if (bigFive.emotionalStability < 3.0) {
    risks.push(`**风险：压力敏感**。触发条件：高强度竞争环境或频繁负面反馈。补偿策略：优先选择支持性强的环境，建立"情绪急救包"（运动/倾诉对象/暂停机制）。`);
  }

  // 基于价值观的风险
  if (valuesTop2[0].key === 'recognition' && bigFive.emotionalStability < 3.5) {
    risks.push(`**风险：过度依赖外部认可**。触发条件：进入"人人都很优秀"的环境后产生落差。补偿策略：建立内在评价标准，定期回顾"我为什么做这件事"。`);
  }

  return {
    strengths: strengths.slice(0, 3),
    risks: risks.slice(0, 2),
  };
}

/**
 * 生成近期探索建议
 */
function generateExplorationActions(): {
  twoWeeks: string[];
  oneMonth: string[];
  threeMonths: string[];
} {
  return {
    twoWeeks: [
      '**信息访谈**：找2-3个在目标方向学习的学长学姐，问他们"一天的时间分配""最喜欢和最不喜欢的部分"。',
      '**内容沉浸**：关注2-3个相关领域的优质博主/公众号，看30天内容，感受"这个领域的日常话题是否让你兴奋"。',
    ],
    oneMonth: [
      '**小型实践**：参加一个相关的短期项目/线上课程/志愿者活动，获得"身体记忆"而不只是想象。',
      '**反向验证**：列出3件"如果选这个方向，我必须长期做的事"，问自己能否接受。',
    ],
    threeMonths: [
      '**环境测试**：如果可能，参加一次相关的夏校/实习/竞赛，在真实场景中测试适配度。',
      '**方向收敛**：基于前两个月的探索，缩小到2-3个具体方向，开始深度准备（竞赛/作品集/先修课）。',
    ],
  };
}

/**
 * 生成完整的 Markdown 报告
 */
export function generateReport(result: AssessmentResult): string {
  const { student, riasecTop3, bigFive, valuesTop2 } = result;
  const { strengths, risks } = generateStrengthsAndRisks(result);
  const riasecDirections = getRIASECDirections(riasecTop3);
  const bigFiveInsights = getBigFiveInsights(bigFive);
  const valuesInsights = getValuesInsights(valuesTop2);
  const actions = generateExplorationActions();

  const suggestions: string[] = [];
  if (bigFive.conscientiousness < 3.0) {
    suggestions.push('建立外部约束机制（学习小组、定期check-in）来补偿自律性。');
  }
  if (bigFive.emotionalStability < 3.0) {
    suggestions.push('优先选择支持性强、反馈友好的环境，避免过度竞争的"内卷"场景。');
  }
  if (valuesTop2[0].key === 'recognition') {
    suggestions.push('建立内在评价标准，定期问自己"我为什么做这件事"。');
  }
  if (suggestions.length < 2) {
    suggestions.push('在探索期不要急于"确定方向"，允许自己试错。');
  }

  return `# GlowPath 学生测评报告

**学生信息**
- 姓名：${student.name}
- 年级：${student.grade}
- 就读类型：${student.track}
- 目标：${student.target}

---

## 0. 一页结论卡

### 🎯 三条核心优势
${strengths.map((s, i) => `${i + 1}. ${s}`).join('\n')}

### ⚠️ 两条需要注意的风险
${risks.map((r, i) => `${i + 1}. ${r}`).join('\n')}

### 💡 两条立即可行的建议
${suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}

---

## 1. 兴趣画像（RIASEC）

### 你的Top3 兴趣代码
${riasecTop3.map((t, i) => `${i + 1}. **${t.name}**：${t.score} 分`).join('\n')}

### 这意味着什么？
${riasecDirections}

**低分项的含义**：
如果某个维度低于2.5分，不代表"你不行"，而是"这类活动不是你的天然兴趣来源"。不要强迫自己在低分维度上长期投入，除非有明确的工具性目的。

**方向簇建议**：
- 不要直接跳到具体职业（如"金融分析师""UX设计师"），而是先锁定2-3个方向簇。
- 在大学前两年用通识课、实习、项目来细化方向。
- 记住：兴趣会变化，但底层倾向相对稳定。

---

## 2. 行为风格（Big Five）

### 五个维度的分数
- **开放性**：${bigFive.openness} 分
- **尽责性**：${bigFive.conscientiousness} 分
- **外向性**：${bigFive.extraversion} 分
- **宜人性**：${bigFive.agreeableness} 分
- **情绪稳定性**：${bigFive.emotionalStability} 分

### 在不同场景下，你可能是这样的

**学习风格**
${bigFiveInsights.learning}

**执行风格**
${bigFiveInsights.execution}

**社交与协作**
${bigFiveInsights.social}

**压力应对**
${bigFiveInsights.stress}

---

## 3. 价值观底线

### 你最看重的Top2
${valuesTop2.map((v, i) => `${i + 1}. **${v.name}**：${v.score} 分`).join('\n')}

### 解读
${valuesInsights.interpretation}

**环境匹配**
${valuesInsights.environment}

**给家长的一句话**
${valuesInsights.parentAdvice}

---

## 4. 近期探索行动

### 未来2周
${actions.twoWeeks.map((a, i) => `${i + 1}. ${a}`).join('\n')}

### 未来1个月
${actions.oneMonth.map((a, i) => `${i + 1}. ${a}`).join('\n')}

### 未来3个月
${actions.threeMonths.map((a, i) => `${i + 1}. ${a}`).join('\n')}

---

## 5. 最后的话

这份报告不是"算命"，而是"坐标系"。它告诉你：
- 你的倾向是什么（不是你"应该"成为什么）
- 在什么环境下你更可能舒适和高效
- 需要警惕哪些"看起来很好但可能不适合你"的陷阱

记住：**没有完美的方向，只有更适配的选择。** 允许自己在探索中调整，不要因为"已经投入了很多"而强行坚持错误的路径。

---

*报告生成时间：${new Date().toLocaleString('zh-CN')}*
*工具：GlowPath 学生测评系统*
`;
}
