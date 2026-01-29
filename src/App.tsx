import { useState } from 'react';
import type { AssessmentInput, AssessmentResult } from './types';
import { calculateAssessment } from './utils/calculator';
import DataInput from './components/DataInput';
import Charts from './components/Charts';
import ReportDisplay from './components/ReportDisplay';
import ExportControls from './components/ExportControls';
import PricingPage from './components/PricingPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'assessment' | 'pricing'>('assessment');
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [chartRefs, setChartRefs] = useState<Array<{ name: string; ref: React.RefObject<any> }>>([]);

  const handleDataSubmit = (input: AssessmentInput) => {
    const assessmentResult = calculateAssessment(input);
    setResult(assessmentResult);
    // 滚动到结果区域
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setResult(null);
    setChartRefs([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadDemoData = async () => {
    try {
      const response = await fetch('/data/demo.json');
      const demoData = await response.json();
      handleDataSubmit(demoData);
    } catch (error) {
      alert('加载示例数据失败，请手动输入');
    }
  };

  // 如果是价格页面，直接渲染
  if (currentPage === 'pricing') {
    return <PricingPage />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F9FAFB' }}>
      {/* 头部 */}
      <header
        style={{
          backgroundColor: '#0EA5E9',
          color: 'white',
          padding: '30px 20px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <h1 style={{ margin: '0 0 10px 0', fontSize: '32px' }}>
          GlowPath 学生测评图表与报告生成器
        </h1>
        <p style={{ margin: 0, fontSize: '16px', opacity: 0.9 }}>
          RIASEC + Big Five + 价值观 综合测评系统
        </p>
        <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {!result && (
            <button
              onClick={loadDemoData}
              style={{
                padding: '10px 20px',
                backgroundColor: 'white',
                color: '#0EA5E9',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
              }}
            >
              加载示例数据
            </button>
          )}
          <button
            onClick={() => setCurrentPage('pricing')}
            style={{
              padding: '10px 20px',
              backgroundColor: '#F97316',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            查看产品方案
          </button>
        </div>
      </header>

      {/* 主内容 */}
      <main style={{ padding: '40px 20px' }}>
        {!result ? (
          <DataInput onSubmit={handleDataSubmit} />
        ) : (
          <div id="results">
            {/* 重新输入按钮 */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <button
                onClick={handleReset}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#6B7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                }}
              >
                ← 重新输入数据
              </button>
            </div>

            {/* 图表区域 */}
            <Charts result={result} onExportReady={setChartRefs} />

            {/* 导出控制 */}
            {chartRefs.length > 0 && (
              <ExportControls chartRefs={chartRefs} studentName={result.student.name} />
            )}

            {/* 报告区域 */}
            <div style={{ marginTop: '40px' }}>
              <ReportDisplay result={result} />
            </div>
          </div>
        )}
      </main>

      {/* 页脚 */}
      <footer
        style={{
          backgroundColor: '#1F2937',
          color: '#9CA3AF',
          padding: '20px',
          textAlign: 'center',
          marginTop: '60px',
        }}
      >
        <p style={{ margin: 0, fontSize: '14px' }}>
          GlowPath Assessment Tool © {new Date().getFullYear()} | 纯前端实现，数据仅存储于本地浏览器
        </p>
      </footer>
    </div>
  );
}

export default App;
