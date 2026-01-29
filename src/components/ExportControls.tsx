import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface ExportControlsProps {
  chartRefs: Array<{ name: string; ref: React.RefObject<any> }>;
  studentName: string;
}

const ExportControls: React.FC<ExportControlsProps> = ({ chartRefs, studentName }) => {
  const [exporting, setExporting] = useState(false);

  const exportSingleChart = (chartRef: any, filename: string, format: 'png' | 'svg') => {
    if (!chartRef?.current) {
      console.error('Chart ref not available');
      return;
    }

    try {
      const echartsInstance = chartRef.current.getEchartsInstance();
      const dataUrl = echartsInstance.getDataURL({
        type: format,
        pixelRatio: 2,
        backgroundColor: '#fff',
      });

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `${filename}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert(`导出 ${filename} 失败`);
    }
  };

  const exportAllChartsAsZip = async (format: 'png' | 'svg') => {
    setExporting(true);
    try {
      const zip = new JSZip();
      const folder = zip.folder('charts');

      for (const { name, ref } of chartRefs) {
        if (!ref?.current) continue;

        const echartsInstance = ref.current.getEchartsInstance();
        const dataUrl = echartsInstance.getDataURL({
          type: format,
          pixelRatio: 2,
          backgroundColor: '#fff',
        });

        // 从 dataUrl 提取 base64 数据
        const base64Data = dataUrl.split(',')[1];
        folder?.file(`${name}.${format}`, base64Data, { base64: true });
      }

      const content = await zip.generateAsync({ type: 'blob' });
      const date = new Date().toISOString().split('T')[0];
      saveAs(content, `${studentName}_测评图表_${date}.zip`);
    } catch (error) {
      console.error('Batch export error:', error);
      alert('批量导出失败');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '20px auto',
        padding: '20px',
        backgroundColor: '#F3F4F6',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <h3 style={{ marginBottom: '15px', color: '#374151' }}>图表导出</h3>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={() => exportAllChartsAsZip('png')}
          disabled={exporting}
          style={{
            padding: '10px 20px',
            backgroundColor: exporting ? '#9CA3AF' : '#8B5CF6',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: exporting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {exporting ? '导出中...' : '导出所有图表为 PNG (ZIP)'}
        </button>

        <button
          onClick={() => exportAllChartsAsZip('svg')}
          disabled={exporting}
          style={{
            padding: '10px 20px',
            backgroundColor: exporting ? '#9CA3AF' : '#EC4899',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: exporting ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          {exporting ? '导出中...' : '导出所有图表为 SVG (ZIP)'}
        </button>
      </div>

      <div style={{ marginTop: '15px' }}>
        <details style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '500', color: '#6B7280' }}>
            或逐个导出图表
          </summary>
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {chartRefs.map(({ name, ref }, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px',
                  backgroundColor: 'white',
                  borderRadius: '4px',
                }}
              >
                <span style={{ fontSize: '14px' }}>{name}</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button
                    onClick={() => exportSingleChart(ref, `${studentName}_${name}`, 'png')}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#0EA5E9',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    PNG
                  </button>
                  <button
                    onClick={() => exportSingleChart(ref, `${studentName}_${name}`, 'svg')}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#10B981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '12px',
                    }}
                  >
                    SVG
                  </button>
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};

// 添加缺失的 React 导入
import { useState } from 'react';

export default ExportControls;
