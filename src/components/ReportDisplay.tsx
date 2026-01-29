import React, { useState } from 'react';
import type { AssessmentResult } from '../types';
import { generateReport } from '../utils/reportGenerator';

interface ReportDisplayProps {
  result: AssessmentResult;
}

const ReportDisplay: React.FC<ReportDisplayProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);
  const report = generateReport(result);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert('复制失败，请手动复制');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([report], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.student.name}_测评报告_${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#0EA5E9', marginBottom: '30px' }}>
        测评报告解读
      </h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={handleCopy}
          style={{
            padding: '10px 20px',
            backgroundColor: copied ? '#10B981' : '#0EA5E9',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {copied ? '已复制!' : '复制报告'}
        </button>
        <button
          onClick={handleDownload}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6366F1',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          下载 Markdown
        </button>
      </div>

      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          lineHeight: '1.8',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            fontFamily: 'inherit',
            margin: 0,
            fontSize: '15px',
            color: '#1F2937',
          }}
        >
          {report}
        </pre>
      </div>
    </div>
  );
};

export default ReportDisplay;
