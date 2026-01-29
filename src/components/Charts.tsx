import React, { useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption } from 'echarts';
import type { AssessmentResult } from '../types';

interface ChartsProps {
  result: AssessmentResult;
  onExportReady?: (chartRefs: Array<{ name: string; ref: React.RefObject<any> }>) => void;
}

const Charts: React.FC<ChartsProps> = ({ result, onExportReady }) => {
  const riasecRadarRef = useRef<any>(null);
  const riasecBarRef = useRef<any>(null);
  const bigFiveRadarRef = useRef<any>(null);
  const bigFiveBarRef = useRef<any>(null);
  const valuesBarRef = useRef<any>(null);

  React.useEffect(() => {
    if (onExportReady) {
      onExportReady([
        { name: 'RIASEC雷达图', ref: riasecRadarRef },
        { name: 'RIASEC柱状图', ref: riasecBarRef },
        { name: 'BigFive雷达图', ref: bigFiveRadarRef },
        { name: 'BigFive条形图', ref: bigFiveBarRef },
        { name: '价值观柱状图', ref: valuesBarRef },
      ]);
    }
  }, [onExportReady]);

  // RIASEC 雷达图配置
  const riasecRadarOption: EChartsOption = {
    title: {
      text: 'RIASEC 兴趣类型雷达图',
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 'bold' },
    },
    tooltip: { trigger: 'item' },
    radar: {
      indicator: [
        { name: '实际型(R)', max: 5 },
        { name: '研究型(I)', max: 5 },
        { name: '艺术型(A)', max: 5 },
        { name: '社会型(S)', max: 5 },
        { name: '企业型(E)', max: 5 },
        { name: '常规型(C)', max: 5 },
      ],
      splitNumber: 5,
      axisLine: { lineStyle: { color: '#ddd' } },
      splitLine: { lineStyle: { color: '#ddd' } },
      splitArea: {
        areaStyle: {
          color: ['rgba(14, 165, 233, 0.05)', 'rgba(14, 165, 233, 0.1)'],
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [
              result.riasec.realistic,
              result.riasec.investigative,
              result.riasec.artistic,
              result.riasec.social,
              result.riasec.enterprising,
              result.riasec.conventional,
            ],
            name: 'RIASEC',
            areaStyle: { color: 'rgba(14, 165, 233, 0.3)' },
            lineStyle: { color: '#0EA5E9', width: 2 },
            itemStyle: { color: '#0EA5E9' },
          },
        ],
      },
    ],
  };

  // RIASEC 柱状图配置
  const riasecBarOption: EChartsOption = {
    title: {
      text: 'RIASEC 兴趣类型柱状图',
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 'bold' },
    },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: ['实际型(R)', '研究型(I)', '艺术型(A)', '社会型(S)', '企业型(E)', '常规型(C)'],
      axisLabel: { interval: 0, rotate: 0 },
    },
    yAxis: { type: 'value', max: 5, splitLine: { lineStyle: { type: 'dashed' } } },
    series: [
      {
        type: 'bar',
        data: [
          result.riasec.realistic,
          result.riasec.investigative,
          result.riasec.artistic,
          result.riasec.social,
          result.riasec.enterprising,
          result.riasec.conventional,
        ],
        itemStyle: { color: '#0EA5E9' },
        label: { show: true, position: 'top', formatter: '{c}' },
        barWidth: '50%',
      },
    ],
  };

  // Big Five 雷达图配置
  const bigFiveRadarOption: EChartsOption = {
    title: {
      text: 'Big Five 行为风格雷达图',
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 'bold' },
    },
    tooltip: { trigger: 'item' },
    radar: {
      indicator: [
        { name: '开放性', max: 5 },
        { name: '尽责性', max: 5 },
        { name: '外向性', max: 5 },
        { name: '宜人性', max: 5 },
        { name: '情绪稳定性', max: 5 },
      ],
      splitNumber: 5,
      axisLine: { lineStyle: { color: '#ddd' } },
      splitLine: { lineStyle: { color: '#ddd' } },
      splitArea: {
        areaStyle: {
          color: ['rgba(16, 185, 129, 0.05)', 'rgba(16, 185, 129, 0.1)'],
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [
              result.bigFive.openness,
              result.bigFive.conscientiousness,
              result.bigFive.extraversion,
              result.bigFive.agreeableness,
              result.bigFive.emotionalStability,
            ],
            name: 'Big Five',
            areaStyle: { color: 'rgba(16, 185, 129, 0.3)' },
            lineStyle: { color: '#10B981', width: 2 },
            itemStyle: { color: '#10B981' },
          },
        ],
      },
    ],
  };

  // Big Five 横向条形图配置
  const bigFiveBarOption: EChartsOption = {
    title: {
      text: 'Big Five 行为风格条形图',
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 'bold' },
    },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: '15%', right: '10%' },
    xAxis: { type: 'value', max: 5, splitLine: { lineStyle: { type: 'dashed' } } },
    yAxis: {
      type: 'category',
      data: ['情绪稳定性', '宜人性', '外向性', '尽责性', '开放性'],
    },
    series: [
      {
        type: 'bar',
        data: [
          result.bigFive.emotionalStability,
          result.bigFive.agreeableness,
          result.bigFive.extraversion,
          result.bigFive.conscientiousness,
          result.bigFive.openness,
        ],
        itemStyle: { color: '#10B981' },
        label: { show: true, position: 'right', formatter: '{c}' },
        barWidth: '40%',
      },
    ],
  };

  // 价值观柱状图配置
  const valuesBarOption: EChartsOption = {
    title: {
      text: '价值观维度柱状图',
      left: 'center',
      textStyle: { fontSize: 18, fontWeight: 'bold' },
    },
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    xAxis: {
      type: 'category',
      data: ['成就感', '独立自主', '认可与声望', '人际关系', '支持体系', '工作条件'],
      axisLabel: { interval: 0, rotate: 20 },
    },
    yAxis: { type: 'value', max: 5, splitLine: { lineStyle: { type: 'dashed' } } },
    series: [
      {
        type: 'bar',
        data: [
          result.values.achievement,
          result.values.autonomy,
          result.values.recognition,
          result.values.relationships,
          result.values.support,
          result.values.workConditions,
        ],
        itemStyle: { color: '#F59E0B' },
        label: { show: true, position: 'top', formatter: '{c}' },
        barWidth: '50%',
      },
    ],
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#0EA5E9', marginBottom: '30px' }}>
        测评结果可视化
      </h2>

      {/* Top Code 卡片 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          marginBottom: '40px',
        }}
      >
        <div
          style={{
            backgroundColor: '#EFF6FF',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #0EA5E9',
          }}
        >
          <h3 style={{ color: '#0EA5E9', marginBottom: '15px' }}>RIASEC Top3</h3>
          {result.riasecTop3.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '8px', fontSize: '16px' }}>
              <strong>{item.name}</strong>: {item.score} 分
            </div>
          ))}
        </div>

        <div
          style={{
            backgroundColor: '#FEF3C7',
            padding: '20px',
            borderRadius: '8px',
            border: '2px solid #F59E0B',
          }}
        >
          <h3 style={{ color: '#F59E0B', marginBottom: '15px' }}>价值观 Top2</h3>
          {result.valuesTop2.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '8px', fontSize: '16px' }}>
              <strong>{item.name}</strong>: {item.score} 分
            </div>
          ))}
        </div>
      </div>

      {/* 图表网格 */}
      <div style={{ display: 'grid', gap: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <ReactECharts ref={riasecRadarRef} option={riasecRadarOption} style={{ height: '400px' }} />
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <ReactECharts ref={riasecBarRef} option={riasecBarOption} style={{ height: '400px' }} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <ReactECharts ref={bigFiveRadarRef} option={bigFiveRadarOption} style={{ height: '400px' }} />
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <ReactECharts ref={bigFiveBarRef} option={bigFiveBarOption} style={{ height: '400px' }} />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <ReactECharts ref={valuesBarRef} option={valuesBarOption} style={{ height: '400px' }} />
        </div>
      </div>
    </div>
  );
};

export default Charts;
