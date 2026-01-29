import React from 'react';
import { Check, Clock, FileText, Users, Crown, Zap, MessageCircle, Target } from 'lucide-react';

export default function GlowPathPricing() {
  const plans = [
    {
      name: '基础定位款',
      subtitle: 'ToB 专用',
      price: '¥1,000',
      description: '职业方向定位体检',
      features: [
        { icon: <FileText className="w-5 h-5" />, text: '专业测评报告' },
        { icon: <Clock className="w-5 h-5" />, text: '30分钟资深HR线上咨询' },
      ],
      highlighted: false,
      color: 'gray',
    },
    {
      name: '深度陪伴款',
      subtitle: '爆款推荐',
      price: '¥4,200',
      description: '全年度就业"保险"方案',
      features: [
        { icon: <Target className="w-5 h-5" />, text: 'HR五阶定制定岗' },
        { icon: <Users className="w-5 h-5" />, text: '1次60分钟行业在职老师辅导' },
        { icon: <Zap className="w-5 h-5" />, text: '365天全年度社群陪伴答疑' },
        { icon: <MessageCircle className="w-5 h-5" />, text: '简历/面试专项复盘' },
      ],
      highlighted: true,
      color: 'orange',
    },
    {
      name: '领航精英款',
      subtitle: '高端定制',
      price: '¥7,000',
      description: '决策者认知升维',
      features: [
        { icon: <Check className="w-5 h-5" />, text: '包含4200元全部服务内容' },
        { icon: <Crown className="w-5 h-5" />, text: '大厂总裁/CXO级别导师' },
        { icon: <Clock className="w-5 h-5" />, text: '1对1战略咨询（60分钟）' },
      ],
      highlighted: false,
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {/* Logo Placeholder - 替换为实际Logo路径 */}
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-[#f97316] to-[#10b981] p-6 rounded-2xl">
              <h1 className="text-3xl font-bold text-white">GlowPath Lab</h1>
            </div>
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#f97316] to-[#10b981] bg-clip-text text-transparent">
            产品方案对比
          </h2>
          <p className="text-gray-400 text-lg">专业 · 科学 · 可信赖</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-gradient-to-br from-[#1e293b] to-[#334155] border-2 border-[#f97316] shadow-2xl shadow-[#f97316]/20 scale-105'
                  : 'bg-[#1e293b] border border-gray-700 hover:border-gray-600'
              }`}
            >
              {/* Recommended Badge */}
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ 最受欢迎
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-6 pt-2">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-sm ${plan.highlighted ? 'text-[#f97316]' : 'text-gray-400'} mb-4`}>
                  {plan.subtitle}
                </p>
                <div className="mb-4">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-400 ml-2">/ 人</span>
                </div>
                <div className={`inline-block px-4 py-2 rounded-lg ${
                  plan.highlighted
                    ? 'bg-[#f97316]/20 text-[#f97316] border border-[#f97316]/50'
                    : 'bg-gray-800 text-gray-300'
                }`}>
                  {plan.description}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-700 my-6"></div>

              {/* Features */}
              <div className="space-y-4">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 mt-1 ${
                      plan.highlighted ? 'text-[#f97316]' : 'text-[#10b981]'
                    }`}>
                      {feature.icon}
                    </div>
                    <span className="text-gray-300 leading-relaxed">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full mt-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white hover:shadow-xl hover:shadow-[#f97316]/50 hover:scale-105'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                选择方案
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Slogan */}
        <div className="text-center py-12 border-t border-gray-800">
          <p className="text-2xl font-light text-gray-300 mb-2">
            不只是选专业
          </p>
          <p className="text-3xl font-bold bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#10b981] bg-clip-text text-transparent">
            是预见未来 10 年的竞争优势
          </p>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            GlowPath Lab © 2024 | 专业测评 · 科学决策 · 职业护航
          </p>
        </div>
      </div>
    </div>
  );
}
