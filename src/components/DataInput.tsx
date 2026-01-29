import React, { useState } from 'react';
import type { AssessmentInput, StudentInfo } from '../types';

interface DataInputProps {
  onSubmit: (data: AssessmentInput) => void;
}

const DataInput: React.FC<DataInputProps> = ({ onSubmit }) => {
  const [inputMode, setInputMode] = useState<'form' | 'json'>('json');
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: '',
    grade: '',
    track: '',
    target: '',
  });
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 验证学生信息
    if (!studentInfo.name || !studentInfo.grade || !studentInfo.track || !studentInfo.target) {
      setError('请填写完整的学生信息');
      return;
    }

    // 验证答案（1-56题）
    for (let i = 1; i <= 56; i++) {
      if (!answers[i] || answers[i] < 1 || answers[i] > 5) {
        setError(`请填写第 ${i} 题的答案（1-5分）`);
        return;
      }
    }

    onSubmit({ student: studentInfo, answers });
  };

  const handleJsonSubmit = () => {
    setError('');
    try {
      const data = JSON.parse(jsonInput) as AssessmentInput;

      // 验证数据结构
      if (!data.student || !data.answers) {
        throw new Error('JSON格式错误：缺少student或answers字段');
      }

      // 验证答案完整性
      for (let i = 1; i <= 56; i++) {
        const answer = data.answers[i.toString()];
        if (answer === undefined || answer < 1 || answer > 5) {
          throw new Error(`第 ${i} 题答案无效`);
        }
      }

      onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '解析JSON失败');
    }
  };

  const handleAnswerChange = (questionNum: number, value: string) => {
    const numValue = parseInt(value);
    if (numValue >= 1 && numValue <= 5) {
      setAnswers((prev) => ({ ...prev, [questionNum]: numValue }));
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#0EA5E9', marginBottom: '30px' }}>
        GlowPath 学生测评 - 数据输入
      </h2>

      {/* 输入模式切换 */}
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <button
          onClick={() => setInputMode('json')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: inputMode === 'json' ? '#0EA5E9' : '#E5E7EB',
            color: inputMode === 'json' ? 'white' : '#374151',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          JSON 导入（推荐）
        </button>
        <button
          onClick={() => setInputMode('form')}
          style={{
            padding: '10px 20px',
            backgroundColor: inputMode === 'form' ? '#0EA5E9' : '#E5E7EB',
            color: inputMode === 'form' ? 'white' : '#374151',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          表单输入
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: '15px',
            backgroundColor: '#FEE2E2',
            color: '#991B1B',
            borderRadius: '5px',
            marginBottom: '20px',
          }}
        >
          {error}
        </div>
      )}

      {inputMode === 'json' ? (
        <div>
          <h3 style={{ marginBottom: '15px' }}>粘贴 JSON 数据</h3>
          <p style={{ color: '#6B7280', marginBottom: '15px' }}>
            格式示例：
          </p>
          <pre
            style={{
              backgroundColor: '#F3F4F6',
              padding: '15px',
              borderRadius: '5px',
              fontSize: '13px',
              marginBottom: '15px',
              overflow: 'auto',
            }}
          >
{`{
  "student": {
    "name": "张同学",
    "grade": "高一",
    "track": "普高",
    "target": "香港本科"
  },
  "answers": {
    "1": 4, "2": 3, "3": 5, ... "56": 4
  }
}`}
          </pre>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder="在此粘贴 JSON 数据..."
            style={{
              width: '100%',
              height: '300px',
              padding: '15px',
              fontSize: '14px',
              border: '2px solid #E5E7EB',
              borderRadius: '5px',
              fontFamily: 'monospace',
              marginBottom: '15px',
            }}
          />
          <button
            onClick={handleJsonSubmit}
            style={{
              padding: '12px 30px',
              backgroundColor: '#0EA5E9',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            解析并生成报告
          </button>
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          {/* 学生信息 */}
          <div
            style={{
              backgroundColor: '#F9FAFB',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '30px',
            }}
          >
            <h3 style={{ marginBottom: '15px' }}>学生信息</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  姓名
                </label>
                <input
                  type="text"
                  value={studentInfo.name}
                  onChange={(e) =>
                    setStudentInfo((prev) => ({ ...prev, name: e.target.value }))
                  }
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  年级
                </label>
                <input
                  type="text"
                  value={studentInfo.grade}
                  onChange={(e) =>
                    setStudentInfo((prev) => ({ ...prev, grade: e.target.value }))
                  }
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                  }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  就读类型
                </label>
                <input
                  type="text"
                  value={studentInfo.track}
                  onChange={(e) =>
                    setStudentInfo((prev) => ({ ...prev, track: e.target.value }))
                  }
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                  }}
                  placeholder="如：普高、国际学校"
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  目标
                </label>
                <input
                  type="text"
                  value={studentInfo.target}
                  onChange={(e) =>
                    setStudentInfo((prev) => ({ ...prev, target: e.target.value }))
                  }
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                  }}
                  placeholder="如：香港本科、美国研究生"
                  required
                />
              </div>
            </div>
          </div>

          {/* 题目答案 */}
          <div>
            <h3 style={{ marginBottom: '15px' }}>题目答案（1-56题，每题1-5分）</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                gap: '15px',
              }}
            >
              {Array.from({ length: 56 }, (_, i) => i + 1).map((num) => (
                <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <label style={{ fontWeight: '500', minWidth: '60px' }}>题 {num}:</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={answers[num] || ''}
                    onChange={(e) => handleAnswerChange(num, e.target.value)}
                    style={{
                      width: '60px',
                      padding: '6px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '4px',
                      textAlign: 'center',
                    }}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            style={{
              marginTop: '30px',
              padding: '12px 30px',
              backgroundColor: '#0EA5E9',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
            }}
          >
            生成报告
          </button>
        </form>
      )}
    </div>
  );
};

export default DataInput;
