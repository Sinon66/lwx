import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParticleBackground } from './components/ParticleBackground';
import { 
  User, 
  Target, 
  Wrench, 
  Palette, 
  Cpu, 
  Zap, 
  Globe, 
  Briefcase, 
  TrendingUp, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  ChevronRight,
  Sparkles,
  Search,
  MessageSquare,
  PenTool,
  Download,
  Save,
  RotateCcw,
  Share2,
  Lock,
  Unlock,
  Eye,
  Upload,
  Trash2
} from 'lucide-react';

// --- Context to handle global edit mode ---
const EditableContext = React.createContext(false);

// --- Generic Editable Component ---

const Editable = ({ 
  value, 
  onChange, 
  className = "" 
}: { 
  value: string, 
  onChange: (val: string) => void, 
  className?: string
}) => {
  const isEditMode = React.useContext(EditableContext);

  return (
    <div
      contentEditable={isEditMode}
      suppressContentEditableWarning
      onBlur={(e) => isEditMode && onChange(e.currentTarget.textContent || "")}
      className={`outline-none transition-all ${
        isEditMode 
          ? `focus:ring-1 focus:ring-hud-green/50 px-1 rounded cursor-text hover:bg-white/5 border-b border-dashed border-hud-green/30 ${className}` 
          : `cursor-default ${className}`
      }`}
    >
      {value}
    </div>
  );
};

// --- Components ---

const HUDBox = ({ children, title, className = "", icon: Icon, onTitleChange }: { children: React.ReactNode, title?: string, className?: string, icon?: any, onTitleChange?: (val: string) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`hud-border bg-hud-card/50 backdrop-blur-sm p-6 ${className}`}
  >
    {title && (
      <div className="flex items-center gap-2 mb-6 border-b border-hud-border pb-2">
        <div className="w-1.5 h-6 bg-hud-green" />
        {Icon && <Icon className="w-5 h-5 text-hud-green" />}
        <h2 className="text-xl font-display font-bold uppercase tracking-wider text-white">
          <Editable value={title} onChange={onTitleChange || (() => {})} />
        </h2>
        <div className="flex-1" />
        <div className="flex gap-1">
          <div className="w-1 h-1 bg-hud-border" />
          <div className="w-1 h-1 bg-hud-border" />
          <div className="w-10 h-1 bg-hud-border" />
        </div>
      </div>
    )}
    {children}
  </motion.div>
);

interface ProgressBarProps {
  key?: React.Key;
  label: string;
  value: number;
  subLabel?: string;
  onLabelChange: (val: string) => void;
  onSubLabelChange?: (val: string) => void;
}

const ProgressBar = ({ label, value, subLabel, onLabelChange, onSubLabelChange }: ProgressBarProps) => (
  <div className="mb-4">
    <div className="flex justify-between text-xs font-mono mb-1 uppercase text-gray-400">
      <span className="flex items-center gap-1">
        <div className="w-2 h-2 bg-hud-green" />
        <Editable value={label} onChange={onLabelChange} />
      </span>
      <span>{value}%</span>
    </div>
    <div className="h-1.5 bg-hud-border w-full relative overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-hud-green" 
      />
    </div>
    {subLabel && (
      <Editable 
        value={subLabel} 
        onChange={onSubLabelChange || (() => {})} 
        className="text-[10px] text-gray-500 mt-1 uppercase font-mono"
      />
    )}
  </div>
);

export default function App() {
  const DEFAULT_DATA = {
    name: "明日方舟",
    subtitle: "AI 内容创作 / 二次元内容策划 / 视频剪辑方向",
    location: "浙江 · 杭州",
    email: "mrfz.resume@outlook.com",
    phone: "138-0000-0000",
    intro: "7-8年ACG/二次元文化研究经历，长期关注游戏、漫画、动画、电影等领域，具备扎实的内容理解力与审美判断力。 擅长二次创作实践（视频剪辑、文案撰写、选曲、角色/剧情分析），熟悉AI漫画/剧情内容生态与用户偏好。 具备快速学习能力、强执行力与跨领域整合能力，对AI视频的独立制作（脚本-分镜-概念-成片）有浓厚兴趣与实践意愿。",
    skills: [
      { label: "设计建模", value: 85, sub: "CAD / Blender (建模 / 动画)" },
      { label: "视频剪辑", value: 95, sub: "剪映 / 特效 / 字幕 / 调色" },
      { label: "AI 能力", value: 90, sub: "Gemini / ChatGPT / 豆包 等AI工具应用" },
      { label: "办公数据", value: 80, sub: "WPS / Excel (函数 / 数据透视 / 可视化)" },
      { label: "创作能力", value: 92, sub: "分镜脚本 / 文案撰写 / 剧情分析" },
    ],
    experience: {
      role: "亚马逊运营实习生",
      company: "大型跨境电商公司 (杭州)",
      period: "2024.05 - PRESENT",
      scope: [
        "负责亚马逊平台日常运营支持，包括商品上架、数据监控、库存跟踪等；",
        "进行竞品分析与市场调研，输出数据报表与优化建议；",
        "协助团队完成广告投放监控与效果分析；",
        "使用Excel进行数据整理、透视分析与可视化，提升运营效率。"
      ],
      outcome: [
        "优化商品信息与关键词，提升Listing曝光率与转化效率；",
        "建立数据监控模型，减少人工统计时间，提升决策效率；",
        "优化并监控店铺日常客诉与满意度反馈，维持产品好评率；",
        "协助团队制定亚马逊广告投放策略，提升广告产出比(ROAS)。"
      ]
    },
    creativeExp: [
      {
        id: "01",
        title: "二次创作实践",
        content: "独立完成多个ACG向视频剪辑作品（剧情向 / 混剪 / 解说向），内容策划、素材处理、节奏把控与成片输出全流程实践。撰写ACG相关解析、设定考据、角色解读等文章，擅长结构化表达。"
      },
      {
        id: "02",
        title: "绘画与角色/剧情分析",
        content: "长期进行角色绘制、同人插画创作，掌握人物设定、场景构图与色彩表达；深度分析作品世界观、剧情逻辑与角色高光。"
      },
      {
        id: "03",
        title: "AI 内容研究与实践",
        content: "研究AI视频/AI剧情内容的生产逻辑与受众偏好，使用AI工具进行脚本生成、分镜辅助、图像生成等质量分析。对AI视频的独立制作流程有清晰规划：脚本 → 分镜 → 概念设计 → AI生成 → 后期剪辑 → 成片输出。"
      }
    ],
    industryViews: [
      { title: "内容趋势", content: "AI将成为内容生产的重要生产力工具，ACG文化与AI融合将诞生更多新形态与商业机会。" },
      { title: "用户偏好", content: "受众更偏好有情感共鸣、世界观完整、视觉风格鲜明的内容，细分圈层需求持续增长。" },
      { title: "个人方向", content: "持续深耕ACG内容理解，结合AI技术与创作能力，打造高质量、具备竞争力的AI视频内容。" }
    ],
    metaLine1Left: "ACG · AI · CONTENT",
    metaLine1Center: "CREATE THE FUTURE",
    metaLine1CenterZh: "创造未来",
    metaLine1Right: "2025 // [TERMINAL ACTIVE]",
    metaLine2Left: "ACG · 人工智能 · 内容",
    metaLine2Right: "2025 // [终端活跃]",
    footerUid: "MRFZ-0708-ACG-AI",
    footerVersion: "2.0.5",
    footerBtn1: "RETHINK",
    footerBtn2: "RECREATE",
    footerBtn3: "REALITY",
    footerBtn4: "REIMAGINED",
    footerCopyright: "© 2025 TOMORROW'S ARK CREATIVE [TERMINAL_01]",
    cardGeminiTitle: "Gemini",
    cardGeminiLabelEn: "USAGE SCENARIO",
    cardGeminiLabelZh: "使用场景",
    cardGeminiContent: "创意发散 / 内容结构梳理 / 多语言翻译 / 市场调研",
    cardGeminiStatusEn: "STATUS: OPTIMIZED",
    cardGeminiStatusZh: "状态: 优化",
    cardChatgptTitle: "ChatGPT",
    cardChatgptLabelEn: "USAGE SCENARIO",
    cardChatgptLabelZh: "使用场景",
    cardChatgptContent: "文案撰写 / 脚本生成 / 逻辑优化 / 问题解决",
    cardChatgptStatusEn: "STATUS: ACTIVE",
    cardChatgptStatusZh: "状态: 活跃",
    cardDoubaoTitle: "豆包",
    cardDoubaoLabelEn: "USAGE SCENARIO",
    cardDoubaoLabelZh: "使用场景",
    cardDoubaoContent: "素材查找 / 摘要整理 / 灵感参考 / 日常辅助",
    cardDoubaoStatusEn: "STATUS: CONNECTED",
    cardDoubaoStatusZh: "状态: 已连接",
    neuralLinkEn: "NEURAL LINK ESTABLISHED",
    neuralLinkZh: "神经链接建立",
    statusLabelEn: "STATUS",
    statusLabelZh: "现状",
    statusValueZh: "求职意向",
    statusValueEn: "RESUME_ACTIVE",
    avatarImg: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000",
    avatarId: "A-07",
    avatarLabel: "RESUME_2025",
    avatarName: "Li·Wei·Xi"
  };

  const [data, setData] = useState(DEFAULT_DATA);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isEditMode, setIsEditMode] = useState(true);
  const [shareCopied, setShareCopied] = useState(false);
  const [isSharedMode, setIsSharedMode] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setData((prev) => ({ ...prev, avatarImg: event.target!.result as string }));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setData((prev) => ({ ...prev, avatarImg: event.target!.result as string }));
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // Helper functions for sharing serialized data in URL
  const serialize = (obj: any) => {
    try {
      return btoa(encodeURIComponent(JSON.stringify(obj)));
    } catch (e) {
      console.error("Serialization failed", e);
      return "";
    }
  };

  const deserialize = (str: string) => {
    try {
      return JSON.parse(decodeURIComponent(atob(str)));
    } catch (e) {
      console.error("Deserialization failed", e);
      return null;
    }
  };

  const normalizeData = (loaded: any) => {
    // Securely merge loaded keys with DEFAULT_DATA to keep default values for any newly introduced fields
    const normalized = { ...DEFAULT_DATA, ...loaded };
    
    // Ensure nested experience object is fully normalized
    normalized.experience = {
      ...DEFAULT_DATA.experience,
      ...(loaded.experience || {})
    };

    // Guarantee that scope always has at least 4 items
    const defaultScope = DEFAULT_DATA.experience.scope;
    const currentScope = [...(normalized.experience.scope || [])];
    while (currentScope.length < 4) {
      const idx = currentScope.length;
      currentScope.push(defaultScope[idx] || "");
    }
    normalized.experience.scope = currentScope;

    // Guarantee that outcome always has at least 4 items
    const defaultOutcome = DEFAULT_DATA.experience.outcome;
    const currentOutcome = [...(normalized.experience.outcome || [])];
    while (currentOutcome.length < 4) {
      const idx = currentOutcome.length;
      currentOutcome.push(defaultOutcome[idx] || "");
    }
    normalized.experience.outcome = currentOutcome;

    return normalized;
  };

  // Load from URL or localStorage on mount
  useEffect(() => {
    // Check hash first (highly recommended as browser never sends hash to server, bypassing Nginx 414 limits)
    let sharedDataParam = null;
    if (window.location.hash && window.location.hash.startsWith('#share=')) {
      sharedDataParam = window.location.hash.substring(7);
    } else {
      // Fallback to legacy query parameters if any
      const params = new URLSearchParams(window.location.search);
      sharedDataParam = params.get('share');
    }

    if (sharedDataParam) {
      const decoded = deserialize(sharedDataParam);
      if (decoded) {
        setData(normalizeData(decoded));
        setIsEditMode(false); // Default to read-only mode on shared links
        setIsSharedMode(true);
        return;
      }
    }

    const saved = localStorage.getItem('resume_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setData(normalizeData(parsed));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  const handleSave = () => {
    setSaveStatus('saving');
    localStorage.setItem('resume_data', JSON.stringify(data));
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const handleReset = () => {
    if (confirm("确定要重置所有修改吗？")) {
      setData(DEFAULT_DATA);
      localStorage.removeItem('resume_data');
    }
  };

  const handleShare = () => {
    const serialized = serialize(data);
    const shareUrl = `${window.location.origin}${window.location.pathname}#share=${serialized}`;
    
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy", err);
        alert("分享链接已生成！请手动选择并复制下方地址：\n\n" + shareUrl);
      });
  };

  const updateSkill = (index: number, field: 'label' | 'sub', value: string) => {
    const newSkills = [...data.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setData({ ...data, skills: newSkills });
  };

  const updateExpList = (type: 'scope' | 'outcome', index: number, value: string) => {
    const newList = [...data.experience[type]];
    newList[index] = value;
    setData({ ...data, experience: { ...data.experience, [type]: newList } });
  };

  const updateCreativeExp = (index: number, field: 'title' | 'content', value: string) => {
    const newList = [...data.creativeExp];
    newList[index] = { ...newList[index], [field]: value };
    setData({ ...data, creativeExp: newList });
  };

  const updateIndustryView = (index: number, field: 'title' | 'content', value: string) => {
    const newList = [...data.industryViews];
    newList[index] = { ...newList[index], [field]: value };
    setData({ ...data, industryViews: newList });
  };

  return (
    <EditableContext.Provider value={isEditMode}>
      <ParticleBackground />
      <div className="min-h-screen p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-8 pb-24 relative overflow-hidden">
      {/* Top Meta Bar */}
      <div className="flex flex-col gap-1.5 text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em] mb-8 relative z-10 border-b border-hud-border/20 pb-4">
        {/* Row 1 */}
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex gap-4 items-center flex-wrap">
            <Editable value={data.metaLine1Left || "ACG · AI · CONTENT"} onChange={(v) => setData({...data, metaLine1Left: v})} />
            <span className="text-hud-green">
              <Editable value={data.metaLine1Center || "CREATE THE FUTURE"} onChange={(v) => setData({...data, metaLine1Center: v})} />
            </span>
            <span className="text-hud-green/80">
              <Editable value={data.metaLine1CenterZh || "创造未来"} onChange={(v) => setData({...data, metaLine1CenterZh: v})} />
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-8 h-px bg-hud-border hidden sm:block" />
            <Editable value={data.metaLine1Right || "2025 // [TERMINAL ACTIVE]"} onChange={(v) => setData({...data, metaLine1Right: v})} />
          </div>
        </div>
        {/* Row 2 */}
        <div className="flex justify-between items-center opacity-85 flex-wrap gap-2">
          <div className="flex gap-4 items-center">
            <Editable value={data.metaLine2Left || "ACG · 人工智能 · 内容"} onChange={(v) => setData({...data, metaLine2Left: v})} />
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-8 h-px bg-hud-border/50 hidden sm:block" />
            <Editable value={data.metaLine2Right || "2025 // [终端活跃]"} onChange={(v) => setData({...data, metaLine2Right: v})} />
          </div>
        </div>
      </div>

      {/* Mode Alert and Info Banner */}
      <div className="relative z-10 mb-8 no-print font-mono uppercase tracking-wider text-xs">
        {!isEditMode ? (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-hud-green/30 bg-hud-green/5 text-hud-green py-2.5 px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-hud-green animate-pulse rounded-full shrink-0" />
              <span>[PRISTINE_VIEW] 当前为「只读/预览模式」：此时不支持他人在这台设备修改网页。您可以直接打印另存为PDF。若要修改，请点击右下角锁定图标解锁密码或模式。</span>
            </div>
            <div className="text-[10px] opacity-75 font-bold shrink-0">[SECURED SYSTEM]</div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-hud-orange/40 bg-hud-orange/5 text-hud-orange py-2.5 px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-hud-orange animate-pulse rounded-full shrink-0" />
              <span>[EDITOR_ACTIVE] 当前为「实时编辑中」：点击页面上的任意文字字段直接修改，修改后请保存并分享您的专属链接！</span>
            </div>
            <div className="text-[10px] opacity-75 font-bold shrink-0">[WRITABLE SYSTEM]</div>
          </motion.div>
        )}
      </div>

      {/* Decorative Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <motion.div 
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="w-full h-[50%] bg-gradient-to-b from-transparent via-hud-green/5 to-transparent opacity-30"
        />
      </div>

      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-8"
        >
          <div className="flex items-baseline gap-4 mb-2">
            <div className="flex items-center gap-2">
              <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-white uppercase italic">
                <Editable value={data.name} onChange={(v) => setData({...data, name: v})} />
              </h1>
              <span className="text-6xl md:text-8xl font-display font-bold tracking-tighter text-hud-green">×</span>
            </div>
            <div className="h-1 bg-hud-green flex-1 hidden md:block" />
          </div>
          
          <Editable 
            value={data.subtitle} 
            onChange={(v) => setData({...data, subtitle: v})} 
            className="text-xl md:text-2xl font-display font-medium text-gray-400 uppercase tracking-widest bg-hud-green/10 inline-block px-4 py-1 mt-2"
          />
          
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono uppercase text-gray-400">
            <div className="flex flex-col gap-1 border-l border-hud-green/30 pl-4 py-1">
              <span className="text-hud-green">Location</span>
              <Editable value={data.location} onChange={(v) => setData({...data, location: v})} className="text-white" />
            </div>
            <div className="flex flex-col gap-1 border-l border-hud-green/30 pl-4 py-1">
              <span className="text-hud-green">Email</span>
              <Editable value={data.email} onChange={(v) => setData({...data, email: v})} className="text-white" />
            </div>
            <div className="flex flex-col gap-1 border-l border-hud-green/30 pl-4 py-1">
              <span className="text-hud-green">Phone</span>
              <Editable value={data.phone} onChange={(v) => setData({...data, phone: v})} className="text-white" />
            </div>
            <div className="flex flex-col gap-1 border-l border-hud-green/30 pl-4 py-1">
              <span className="text-hud-green flex items-center gap-1.5 flex-wrap">
                <Editable value={data.statusLabelEn || "STATUS"} onChange={(v) => setData({...data, statusLabelEn: v})} />
                <span className="text-hud-green/80 font-sans">
                  <Editable value={data.statusLabelZh || "现状"} onChange={(v) => setData({...data, statusLabelZh: v})} />
                </span>
              </span>
              <span className="flex items-center gap-2 text-white flex-wrap">
                <div className="w-2 h-2 rounded-full bg-hud-green animate-pulse" />
                <Editable value={data.statusValueZh || "求职意向"} onChange={(v) => setData({...data, statusValueZh: v})} />
                <span className="text-hud-green/20">|</span>
                <Editable value={data.statusValueEn || "RESUME_ACTIVE"} onChange={(v) => setData({...data, statusValueEn: v})} />
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-4 relative group flex justify-center lg:justify-end"
        >
          <div 
            style={{ width: '295px', height: '413px' }}
            className={`bg-hud-card overflow-hidden relative hud-border shadow-2xl shadow-hud-green/10 select-none flex flex-col justify-between transition-all duration-300 ${
              isDragging ? 'border-hud-green/80 bg-hud-green/5' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {data.avatarImg ? (
              <img 
                src={data.avatarImg} 
                alt="Profile" 
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" 
              />
            ) : (
              <div className="absolute inset-0 bg-hud-card/60 flex items-center justify-center opacity-70">
                <span className="text-xs font-mono text-gray-500">IMAGE NOT MOUNTED</span>
              </div>
            )}
            <div className="absolute inset-0 scanline pointer-events-none" />

            {/* Clear/Delete Image Button */}
            {data.avatarImg && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setData((prev) => ({ ...prev, avatarImg: "" }));
                }}
                className="absolute top-4 left-4 z-30 p-1.5 bg-black/80 hover:bg-red-950/80 border border-hud-green/30 hover:border-red-500/50 text-hud-green hover:text-red-400 rounded transition-all duration-200 flex items-center gap-1 text-[9px] font-mono tracking-wider shadow pointer-events-auto"
                title="删除照片 / Delete Photo"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>DELETE</span>
              </button>
            )}
            
            {/* Transparent file upload overlay */}
            <label 
              htmlFor="avatar-image-upload" 
              className={`absolute inset-0 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 z-20 ${
                isDragging ? 'bg-hud-green/15 border-2 border-dashed border-hud-green/50' : 'bg-transparent hover:bg-black/40'
              }`}
            >
              <input 
                type="file" 
                id="avatar-image-upload" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
              <div className="opacity-0 group-hover:opacity-100 flex flex-col items-center gap-1.5 text-hud-green transition-opacity duration-300 pointer-events-none bg-black/80 px-3 py-2.5 rounded border border-hud-green/20">
                <Upload className="w-5 h-5 animate-pulse" />
                <span className="text-[9px] font-mono tracking-[0.15em] uppercase">UPLOAD NEW IMAGE</span>
                <span className="text-[8px] font-sans text-gray-400">支持拖拽或点击上传</span>
              </div>
            </label>

            <div className="absolute top-4 right-4 text-right z-10">
              <div className="text-2xl font-display font-bold text-hud-green">
                <Editable value={data.avatarId || "A-07"} onChange={(v) => setData({...data, avatarId: v})} />
              </div>
              <div className="text-[10px] font-mono text-gray-400">
                <Editable value={data.avatarLabel || "RESUME_2025"} onChange={(v) => setData({...data, avatarLabel: v})} />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 z-10 w-[calc(100%-2rem)]">
               <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-1 bg-hud-green" />)}
               </div>
               <div className="text-[10px] font-mono text-gray-300 flex items-center justify-between w-full flex-wrap gap-2 pr-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <Editable value={data.neuralLinkEn || "NEURAL LINK ESTABLISHED"} onChange={(v) => setData({...data, neuralLinkEn: v})} />
                    <span className="text-gray-400 font-sans">
                      <Editable value={data.neuralLinkZh || "神经链接建立"} onChange={(v) => setData({...data, neuralLinkZh: v})} />
                    </span>
                  </div>
                  <div className="text-hud-green text-[10px] font-mono border-b border-dashed border-hud-green/40">
                    <Editable value={data.avatarName || "Li·Wei·Xi"} onChange={(v) => setData({...data, avatarName: v})} />
                  </div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 text-white">
        
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-8">
          <HUDBox title="个人简介" icon={User}>
            <Editable 
              value={data.intro} 
              onChange={(v) => setData({...data, intro: v})} 
              className="text-sm text-gray-300 leading-relaxed font-sans"
            />
          </HUDBox>

          <HUDBox title="核心优势" icon={Target}>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-hud-bg/50 border border-hud-border rounded group hover:border-hud-green transition-colors cursor-default">
                <Globe className="w-5 h-5 text-hud-green mb-2" />
                <div className="text-sm font-bold mb-1">ACG深度理解</div>
                <div className="text-[10px] text-gray-500 uppercase font-mono">7-8年文化累积</div>
              </div>
              <div className="p-3 bg-hud-bg/50 border border-hud-border rounded group hover:border-hud-green transition-colors cursor-default">
                <Zap className="w-5 h-5 text-hud-green mb-2" />
                <div className="text-sm font-bold mb-1">创作执行力</div>
                <div className="text-[10px] text-gray-500 uppercase font-mono">多维创作经验</div>
              </div>
              <div className="p-3 bg-hud-bg/50 border border-hud-border rounded group hover:border-hud-green transition-colors cursor-default">
                <Search className="w-5 h-5 text-hud-green mb-2" />
                <div className="text-sm font-bold mb-1">AI内容洞察</div>
                <div className="text-[10px] text-gray-500 uppercase font-mono">精准把握偏好</div>
              </div>
              <div className="p-3 bg-hud-bg/50 border border-hud-border rounded group hover:border-hud-green transition-colors cursor-default">
                <Cpu className="w-5 h-5 text-hud-green mb-2" />
                <div className="text-sm font-bold mb-1">学习与迭代</div>
                <div className="text-[10px] text-gray-500 uppercase font-mono">快速适应工具</div>
              </div>
            </div>
          </HUDBox>

          <HUDBox title="技能工具" icon={Briefcase}>
            {data.skills.map((skill, idx) => (
              <ProgressBar 
                key={idx}
                label={skill.label} 
                value={skill.value} 
                subLabel={skill.sub} 
                onLabelChange={(v) => updateSkill(idx, 'label', v)}
                onSubLabelChange={(v) => updateSkill(idx, 'sub', v)}
              />
            ))}
          </HUDBox>
        </div>

        {/* Center/Right Column */}
        <div className="lg:col-span-8 space-y-8">
          
          <HUDBox title="创作与 AI 经验" icon={Palette}>
            <div className="space-y-6">
              {data.creativeExp.map((item, idx, arr) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 border border-hud-green flex items-center justify-center font-display font-bold text-hud-green group-hover:bg-hud-green group-hover:text-black transition-all">
                      {item.id}
                    </div>
                    {idx !== arr.length - 1 && <div className="w-px h-full bg-hud-border mt-2" />}
                  </div>
                  <div className="pb-6 w-full">
                    <Editable 
                      value={item.title} 
                      onChange={(v) => updateCreativeExp(idx, 'title', v)} 
                      className="text-lg font-bold text-white mb-2 uppercase tracking-tight group-hover:text-hud-green transition-colors"
                    />
                    <Editable 
                      value={item.content} 
                      onChange={(v) => updateCreativeExp(idx, 'content', v)} 
                      className="text-sm text-gray-400 leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </HUDBox>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <HUDBox 
              className="!p-4 border-l-4 border-l-hud-green" 
              title={data.cardGeminiTitle || "Gemini"} 
              icon={Sparkles}
              onTitleChange={(v) => setData({...data, cardGeminiTitle: v})}
            >
              <div className="text-[10px] font-mono mb-2 uppercase flex items-center gap-1.5 flex-wrap">
                <span className="text-hud-green">
                  <Editable value={data.cardGeminiLabelEn || "USAGE SCENARIO"} onChange={(v) => setData({...data, cardGeminiLabelEn: v})} />
                </span>
                <span className="text-hud-green/80 font-sans">
                  <Editable value={data.cardGeminiLabelZh || "使用场景"} onChange={(v) => setData({...data, cardGeminiLabelZh: v})} />
                </span>
              </div>
              <Editable 
                value={data.cardGeminiContent || "创意发散 / 内容结构梳理 / 多语言翻译 / 市场调研"} 
                onChange={(v) => setData({...data, cardGeminiContent: v})}
                className="text-xs text-gray-300 min-h-[3rem]"
              />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1.5 flex-wrap">
                  <Editable value={data.cardGeminiStatusEn || "STATUS: OPTIMIZED"} onChange={(v) => setData({...data, cardGeminiStatusEn: v})} />
                  <Editable value={data.cardGeminiStatusZh || "状态: 优化"} onChange={(v) => setData({...data, cardGeminiStatusZh: v})} />
                </span>
                <div className="w-2 h-2 bg-hud-green rounded-full shadow-[0_0_8px_rgba(190,255,5,0.6)]" />
              </div>
            </HUDBox>
            
            <HUDBox 
              className="!p-4 border-l-4 border-l-blue-500" 
              title={data.cardChatgptTitle || "ChatGPT"} 
              icon={MessageSquare}
              onTitleChange={(v) => setData({...data, cardChatgptTitle: v})}
            >
              <div className="text-[10px] font-mono mb-2 uppercase flex items-center gap-1.5 flex-wrap">
                <span className="text-blue-400">
                  <Editable value={data.cardChatgptLabelEn || "USAGE SCENARIO"} onChange={(v) => setData({...data, cardChatgptLabelEn: v})} />
                </span>
                <span className="text-blue-400/80 font-sans">
                  <Editable value={data.cardChatgptLabelZh || "使用场景"} onChange={(v) => setData({...data, cardChatgptLabelZh: v})} />
                </span>
              </div>
              <Editable 
                value={data.cardChatgptContent || "文案撰写 / 脚本生成 / 逻辑优化 / 问题解决"} 
                onChange={(v) => setData({...data, cardChatgptContent: v})}
                className="text-xs text-gray-300 min-h-[3rem]"
              />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1.5 flex-wrap">
                  <Editable value={data.cardChatgptStatusEn || "STATUS: ACTIVE"} onChange={(v) => setData({...data, cardChatgptStatusEn: v})} />
                  <Editable value={data.cardChatgptStatusZh || "状态: 活跃"} onChange={(v) => setData({...data, cardChatgptStatusZh: v})} />
                </span>
                <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              </div>
            </HUDBox>

            <HUDBox 
              className="!p-4 border-l-4 border-l-purple-500" 
              title={data.cardDoubaoTitle || "豆包"} 
              icon={PenTool}
              onTitleChange={(v) => setData({...data, cardDoubaoTitle: v})}
            >
              <div className="text-[10px] font-mono mb-2 uppercase flex items-center gap-1.5 flex-wrap">
                <span className="text-purple-400">
                  <Editable value={data.cardDoubaoLabelEn || "USAGE SCENARIO"} onChange={(v) => setData({...data, cardDoubaoLabelEn: v})} />
                </span>
                <span className="text-purple-400/80 font-sans">
                  <Editable value={data.cardDoubaoLabelZh || "使用场景"} onChange={(v) => setData({...data, cardDoubaoLabelZh: v})} />
                </span>
              </div>
              <Editable 
                value={data.cardDoubaoContent || "素材查找 / 摘要整理 / 灵感参考 / 日常辅助"} 
                onChange={(v) => setData({...data, cardDoubaoContent: v})}
                className="text-xs text-gray-300 min-h-[3rem]"
              />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-gray-500 font-mono flex items-center gap-1.5 flex-wrap">
                  <Editable value={data.cardDoubaoStatusEn || "STATUS: CONNECTED"} onChange={(v) => setData({...data, cardDoubaoStatusEn: v})} />
                  <Editable value={data.cardDoubaoStatusZh || "状态: 已连接"} onChange={(v) => setData({...data, cardDoubaoStatusZh: v})} />
                </span>
                <div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              </div>
            </HUDBox>
          </div>

          <HUDBox title="行业观点" icon={TrendingUp}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.industryViews.map((view, idx) => (
                <div key={idx} className="space-y-3 p-4 bg-hud-bg/30 border border-hud-border hover:bg-hud-bg/50 transition-all rounded">
                  <div className="text-hud-green font-display font-bold uppercase text-sm tracking-widest flex items-center gap-2">
                    <div className="w-3 h-3 border border-hud-green" />
                    <Editable value={view.title} onChange={(v) => updateIndustryView(idx, 'title', v)} />
                  </div>
                  <Editable 
                    value={view.content} 
                    onChange={(v) => updateIndustryView(idx, 'content', v)} 
                    className="text-xs text-gray-400 leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </HUDBox>

          {/* Experience Section */}
          <HUDBox title="工作经历" icon={Briefcase}>
            <div className="border-l border-hud-border pl-6 relative">
              <div className="absolute left-[-5px] top-0 w-2 h-2 bg-hud-green rounded-full shadow-[0_0_8px_rgba(190,255,5,0.8)]" />
              <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                <div className="w-full">
                  <Editable 
                    value={data.experience.role} 
                    onChange={(v) => setData({...data, experience: {...data.experience, role: v}})} 
                    className="text-xl font-bold text-white"
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <Editable 
                      value={data.experience.company} 
                      onChange={(v) => setData({...data, experience: {...data.experience, company: v}})} 
                      className="text-xs text-hud-green font-mono uppercase bg-hud-green/10 px-2 py-0.5 inline-block"
                    />
                  </div>
                </div>
                <Editable 
                  value={data.experience.period} 
                  onChange={(v) => setData({...data, experience: {...data.experience, period: v}})} 
                  className="text-xs font-mono text-gray-500 bg-hud-border px-2 py-1 whitespace-nowrap"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs font-mono font-bold text-gray-300 uppercase mb-3 flex items-center gap-2">
                    <div className="w-1 h-3 bg-hud-green/50" />
                    工作内容 | SCOPE
                  </h4>
                  <ul className="text-xs text-gray-400 space-y-2 list-none">
                    {data.experience.scope.map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-hud-green">»</span>
                        <Editable 
                          value={item} 
                          onChange={(v) => updateExpList('scope', idx, v)} 
                          className="flex-1"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-gray-300 uppercase mb-3 flex items-center gap-2">
                    <div className="w-1 h-3 bg-hud-green/50" />
                    工作成果 | OUTCOME
                  </h4>
                  <ul className="text-xs text-gray-400 space-y-2 list-none">
                    {data.experience.outcome.map((item, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-hud-green">»</span>
                        <Editable 
                          value={item} 
                          onChange={(v) => updateExpList('outcome', idx, v)} 
                          className="flex-1"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </HUDBox>

        </div>
      </div>

      <footer className="pt-12 border-t border-hud-border flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-gray-500 uppercase tracking-widest relative z-10 pb-8">
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <span className="text-gray-400 flex items-center gap-1">
            <span>UID:</span>
            <Editable value={data.footerUid || "MRFZ-0708-ACG-AI"} onChange={(v) => setData({...data, footerUid: v})} />
          </span>
          <div className="w-px h-4 bg-hud-border" />
          <span className="flex items-center gap-1">
            <span>SYSTEM_VERSION:</span>
            <Editable value={data.footerVersion || "2.0.5"} onChange={(v) => setData({...data, footerVersion: v})} />
          </span>
        </div>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <motion.span whileHover={{ color: "#BEFF05" }} className="cursor-pointer">
            <Editable value={data.footerBtn1 || "RETHINK"} onChange={(v) => setData({...data, footerBtn1: v})} />
          </motion.span>
          <motion.span whileHover={{ color: "#BEFF05" }} className="cursor-pointer">
            <Editable value={data.footerBtn2 || "RECREATE"} onChange={(v) => setData({...data, footerBtn2: v})} />
          </motion.span>
          <motion.span whileHover={{ color: "#BEFF05" }} className="cursor-pointer">
            <Editable value={data.footerBtn3 || "REALITY"} onChange={(v) => setData({...data, footerBtn3: v})} />
          </motion.span>
          <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-hud-green">
            <Editable value={data.footerBtn4 || "REIMAGINED"} onChange={(v) => setData({...data, footerBtn4: v})} />
          </motion.span>
        </div>
        <div className="text-center md:text-right">
          <Editable value={data.footerCopyright || "© 2025 TOMORROW'S ARK CREATIVE [TERMINAL_01]"} onChange={(v) => setData({...data, footerCopyright: v})} />
        </div>
      </footer>

      {/* Action Buttons */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-3 no-print">
        {/* Toggle Edit Mode Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 px-4 py-2.5 font-display font-medium text-xs uppercase tracking-wider transition-all shadow-lg border ${
            isEditMode 
              ? 'bg-hud-orange/20 hover:bg-hud-orange/30 border-hud-orange text-hud-orange animate-pulse' 
              : 'bg-hud-card hover:bg-hud-card/80 border-hud-border text-gray-400 hover:text-white'
          }`}
          title={isEditMode ? "切换为只读预览模式" : "切换为实时编辑模式"}
        >
          {isEditMode ? (
            <>
              <Unlock className="w-4 h-4" />
              <span>编辑中 [ACTIVE]</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 text-hud-green" />
              <span className="text-hud-green">只读模式 [READONLY]</span>
            </>
          )}
        </motion.button>

        {/* Generate Share View Link Button */}
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className={`flex items-center gap-2 px-4 py-2.5 font-display font-medium text-xs uppercase tracking-wider transition-all shadow-lg border ${
            shareCopied 
              ? 'bg-hud-green text-black border-hud-green font-bold' 
              : 'bg-hud-card hover:bg-hud-card/80 border-hud-border text-gray-400 hover:text-white'
          }`}
          title="生成专属在线只读简历网页链接"
        >
          <Share2 className="w-4 h-4" />
          <span>{shareCopied ? "已复制只读链接！" : "生成网页分享链接"}</span>
        </motion.button>

        <div className="flex gap-2">
          {/* Reset Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="bg-hud-card border border-hud-border text-gray-400 p-2.5 shadow-xl hover:text-white transition-colors"
            title="重置数据"
          >
            <RotateCcw className="w-4 h-4" />
          </motion.button>

          {/* Save Button */}
          {isEditMode && (
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className={`flex items-center gap-1.5 px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                saveStatus === 'saved' ? 'bg-blue-500 text-white' : 'bg-hud-green text-black'
              }`}
            >
              {saveStatus === 'saving' ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Save className="w-4 h-4" />
                </motion.div>
              ) : saveStatus === 'saved' ? (
                <>Saved!</>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  保存修改
                </>
              )}
            </motion.button>
          )}

          {/* Print PDF Button */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.print()}
            className="flex items-center gap-1.5 bg-hud-green text-black px-4 py-2.5 font-display text-xs font-bold uppercase tracking-wider shadow-md hover:bg-hud-green/80"
          >
            <Download className="w-4 h-4" />
            另存为 PDF
          </motion.button>
        </div>
      </div>
    </div>
    </EditableContext.Provider>
  );
}
