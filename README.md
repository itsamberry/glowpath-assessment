# GlowPath 学生测评图表与报告生成器

一个专业的学生测评系统，支持 RIASEC（霍兰德职业兴趣）、Big Five（大五人格）、价值观三维度综合评估，自动生成可视化图表和专业解读报告。

## 功能特性

✅ **三维度测评体系**
- RIASEC 兴趣类型（6个维度，30题）
- Big Five 行为风格（5个维度，14题）
- 价值观底线（6个维度，12题）

✅ **专业图表可视化**
- 雷达图、柱状图、条形图多种展示
- 支持导出 PNG/SVG 格式
- 一键批量下载所有图表（ZIP打包）

✅ **智能报告生成**
- 动态生成结构化报告文案
- 基于分数的个性化解读
- 支持复制和导出 Markdown 格式

✅ **纯前端实现**
- 无需后端服务器
- 数据本地处理，隐私安全
- 支持离线使用

## 技术栈

- **框架**: Vite + React + TypeScript
- **图表**: ECharts (echarts-for-react)
- **导出**: JSZip + FileSaver
- **样式**: 内联样式（无需额外CSS框架）

## 安装与运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

项目将在 `http://localhost:5173` 启动。

### 3. 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist/` 目录。

### 4. 预览生产版本

```bash
npm run preview
```

## 使用方法

### 方式一：JSON 导入（推荐）

1. 准备 JSON 格式的数据（参考 `public/data/demo.json`）
2. 点击"JSON 导入"标签
3. 粘贴数据并点击"解析并生成报告"

**JSON 格式示例：**

```json
{
  "student": {
    "name": "张同学",
    "grade": "高一",
    "track": "国际学校",
    "target": "香港本科"
  },
  "answers": {
    "1": 4,
    "2": 3,
    "3": 5,
    ...
    "56": 4
  }
}
```

### 方式二：表单输入

1. 点击"表单输入"标签
2. 填写学生信息
3. 逐题输入 1-56 题的答案（1-5分）
4. 点击"生成报告"

### 方式三：加载示例数据

直接点击首页的"加载示例数据"按钮快速体验。

## 计算逻辑说明

### RIASEC（题号 1-30）
- 实际型(R): 题 1-5
- 研究型(I): 题 6-10
- 艺术型(A): 题 11-15
- 社会型(S): 题 16-20
- 企业型(E): 题 21-25
- 常规型(C): 题 26-30

每个维度取 5 题的平均分。

### Big Five（题号 31-44）
- 开放性: 题 31-33
- 尽责性: 题 34-36（第36题反向计分）
- 外向性: 题 37-39
- 宜人性: 题 40-41
- 情绪稳定性: 题 42-44（全部反向计分）

反向计分公式：6 - 原分数

### 价值观（题号 45-56）
- 成就感: 题 45-46
- 独立自主: 题 47-48
- 认可与声望: 题 49-50
- 人际关系: 题 51-52
- 支持体系: 题 53-54
- 工作条件/安全感: 题 55-56

每个维度取 2 题的平均分。

## 项目结构

```
glowpath-assessment/
├── public/
│   └── data/
│       └── demo.json           # 示例数据
├── src/
│   ├── components/
│   │   ├── DataInput.tsx       # 数据输入组件
│   │   ├── Charts.tsx          # 图表展示组件
│   │   ├── ReportDisplay.tsx   # 报告展示组件
│   │   └── ExportControls.tsx  # 导出控制组件
│   ├── utils/
│   │   ├── calculator.ts       # 核心计算逻辑
│   │   └── reportGenerator.ts  # 报告生成逻辑
│   ├── types/
│   │   └── index.ts            # TypeScript 类型定义
│   ├── App.tsx                 # 主应用组件
│   └── main.tsx                # 应用入口
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 导出功能

### 导出图表
1. **批量导出**: 点击"导出所有图表为 PNG/SVG (ZIP)"一键下载所有图表
2. **单个导出**: 展开"或逐个导出图表"，选择需要的图表单独下载

### 导出报告
- 点击"复制报告"按钮复制 Markdown 格式文本
- 点击"下载 Markdown"按钮下载 `.md` 文件
- 可直接粘贴到 Word、Notion 等工具

## 自定义与扩展

### 修改计算公式
编辑 `src/utils/calculator.ts` 文件，修改对应函数：
- `calculateRIASEC()` - RIASEC 计算
- `calculateBigFive()` - Big Five 计算
- `calculateValues()` - 价值观计算

### 调整报告文案
编辑 `src/utils/reportGenerator.ts` 文件，修改：
- `getRIASECDirections()` - 兴趣方向建议
- `getBigFiveInsights()` - 行为风格解读
- `getValuesInsights()` - 价值观解读
- `generateReport()` - 整体报告模板

### 修改图表样式
编辑 `src/components/Charts.tsx` 文件，修改 ECharts 配置对象。

## 常见问题

**Q: 如何更改题目数量？**
A: 修改 `src/utils/calculator.ts` 中的题号范围，并更新 `src/components/DataInput.tsx` 中的表单验证逻辑。

**Q: 可以添加更多维度吗？**
A: 可以。在 `src/types/index.ts` 添加新类型，在 `calculator.ts` 添加计算函数，在 `Charts.tsx` 添加图表配置。

**Q: 如何部署到服务器？**
A: 运行 `npm run build`，将 `dist/` 目录部署到任何静态服务器（Nginx、Apache、Vercel、Netlify 等）。

**Q: 数据会被上传吗？**
A: 不会。所有计算均在浏览器本地完成，无任何网络请求（除非加载示例数据）。

## 开发说明

### 添加新的测评维度
1. 在 `src/types/index.ts` 定义新的分数接口
2. 在 `src/utils/calculator.ts` 实现计算函数
3. 在 `src/components/Charts.tsx` 添加对应图表
4. 在 `src/utils/reportGenerator.ts` 添加文案生成逻辑

### 调试技巧
- 使用浏览器开发者工具的 Console 查看计算结果
- 使用 React DevTools 查看组件状态
- 检查 `public/data/demo.json` 确保数据格式正确

## 许可证

MIT License - 可自由使用、修改和分发。

## 致谢

- **ECharts**: 强大的图表库
- **React**: 优秀的前端框架
- **Vite**: 快速的构建工具

---

**作者**: Claude Code
**版本**: 1.0.0
**更新**: 2026-01-28
