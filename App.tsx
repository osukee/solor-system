
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  ChevronDown, 
  MessageCircle, 
  FileText, 
  ShieldCheck, 
  Sun, 
  Building2, 
  Laptop,
  Menu,
  X,
  ArrowRight,
  Star,
  Check,
  Award,
  Quote,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Animation Components ---

interface FadeInProps {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "", direction = 'up' }) => {
  const directionOffset = {
    up: { y: 40, x: 0 },
    left: { y: 0, x: -40 },
    right: { y: 0, x: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }} // Custom spring-like ease
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Float = ({ children, delay = 0, duration = 6 }: { children?: React.ReactNode, delay?: number, duration?: number }) => (
  <motion.div
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: duration, repeat: Infinity, ease: "easeInOut", delay }}
  >
    {children}
  </motion.div>
);

// --- UI Components ---

const LineButton = ({ size = "md", text = "LINEで無料相談", subText = "" }: { size?: "sm" | "md" | "lg", text?: string, subText?: string }) => {
  const baseClasses = "bg-[#06C755] hover:bg-[#05b34c] text-white font-bold rounded-full transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(6,199,85,0.6)] hover:shadow-[0_15px_35px_-10px_rgba(6,199,85,0.7)] flex items-center justify-center gap-3 relative overflow-hidden group";
  const sizeClasses = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-8 py-5 text-lg md:text-xl w-full md:w-auto min-w-[300px]",
  };

  return (
    <a href="#contact" className={`${baseClasses} ${sizeClasses[size]}`}>
      {/* Glossy Effect */}
      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-[200%] transition-all duration-1000 ease-in-out"></div>
      
      <MessageCircle className={`${size === 'lg' ? 'w-7 h-7' : 'w-5 h-5'} fill-current relative z-10`} />
      <div className="flex flex-col items-start leading-none relative z-10">
        <span>{text}</span>
        {subText && size === 'lg' && (
          <span className="text-[10px] md:text-xs font-normal opacity-90 mt-1">{subText}</span>
        )}
      </div>
      <ArrowRight className={`relative z-10 w-5 h-5 transition-transform group-hover:translate-x-1 ${size === 'sm' ? 'hidden' : 'block'}`} />
    </a>
  );
};

const SectionHeading = ({ en, jp, align = "center", light = false }: { en: string, jp: React.ReactNode, align?: "center" | "left", light?: boolean }) => (
  <div className={`mb-16 md:mb-24 ${align === "center" ? "text-center" : "text-left"}`}>
    <span className={`font-bold tracking-widest text-xs md:text-sm uppercase block mb-3 ${light ? 'text-blue-200' : 'text-accent'}`}>
      {en}
    </span>
    <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight ${light ? 'text-white' : 'text-slate-800'}`}>
      {jp}
    </h2>
    <div className={`w-20 h-1.5 mt-6 rounded-full ${align === "center" ? "mx-auto" : ""} ${light ? 'bg-blue-400' : 'bg-gradient-to-r from-accent to-yellow-300'}`}></div>
  </div>
);

// --- Sections ---

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "お悩み", href: "#problems" },
    { name: "流れ", href: "#process" },
    { name: "強み", href: "#reasons" },
    { name: "実績", href: "#voice" },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-slate-200 py-3' : 'bg-transparent border-transparent py-5'}`}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className={`p-2 rounded-xl transition-colors ${isScrolled ? 'bg-slate-100 text-primary' : 'bg-white/10 backdrop-blur-md text-white'}`}>
              <Sun className="w-6 h-6" />
            </div>
            <div className={`flex flex-col leading-none transition-colors ${isScrolled ? 'text-slate-800' : 'text-white'}`}>
              <span className="text-[10px] font-bold opacity-80 tracking-wider">行政書士による一括代行</span>
              <span className="font-bold text-lg md:text-xl tracking-tight">太陽光名義変更サポート</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium hover:text-accent transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all hover:after:w-full ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}
              >
                {link.name}
              </a>
            ))}
            <LineButton size="sm" text="相談する" />
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[60] bg-white md:hidden flex flex-col"
          >
            <div className="p-5 flex justify-end border-b border-slate-100">
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-500 bg-slate-50 rounded-full">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col p-6 gap-6 text-center">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-slate-800 font-bold text-xl py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-8" onClick={() => setIsMenuOpen(false)}>
                <LineButton size="lg" text="LINEで相談する" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex items-center pt-24 overflow-hidden bg-[#0f172a]">
      {/* Background with Gradient Mesh */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072&auto=format&fit=crop"
          alt="Solar Panels" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-blue-950/90"></div>
        {/* Abstract Shapes */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="max-w-2xl">
          <FadeIn>
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/80 border border-slate-700 backdrop-blur-md text-white text-xs md:text-sm font-medium rounded-full">
                <ShieldCheck className="w-4 h-4 text-accent" />
                行政書士直営
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/80 border border-slate-700 backdrop-blur-md text-white text-xs md:text-sm font-medium rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                口コミ高評価
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-8 tracking-tight">
              太陽光の<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">名義変更</span>、<br />
              <span className="relative inline-block">
                プロに丸投げ。
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-lg">
              面倒な電子申請・相続書類・電力会社対応。<br />
              すべて行政書士が代行します。<br />
              あなたの手間は、<strong className="text-white">LINEで写真を送るだけ。</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <LineButton size="lg" text="LINEで今すぐ無料相談" subText="面倒な登録なし・1分で完了" />
            </div>
            <p className="mt-4 text-xs text-slate-400 opacity-80 pl-2">
              ※売買・相続・贈与などあらゆるケースに対応
            </p>
          </FadeIn>
        </div>

        {/* Floating UI Mock */}
        <div className="hidden lg:block relative perspective-[2000px]">
          <Float delay={0} duration={8}>
            <motion.div 
              initial={{ rotateY: -15, rotateX: 10, scale: 0.9 }}
              animate={{ rotateY: -12, rotateX: 5, scale: 0.95 }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              className="relative z-10 w-[320px] mx-auto"
            >
              {/* Phone Mockup Frame */}
              <div className="bg-slate-900 border-[8px] border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden h-[640px] relative ring-1 ring-white/10">
                {/* Screen Content */}
                <div className="bg-white h-full w-full flex flex-col">
                  {/* Header */}
                  <div className="bg-[#2c3e50] p-6 pt-12 text-white text-center">
                     <p className="text-sm opacity-80">名義変更サポート</p>
                     <p className="font-bold text-lg">手続き完了のお知らせ</p>
                  </div>
                  {/* Chat Bubbles */}
                  <div className="flex-1 p-4 bg-slate-100 space-y-4 overflow-hidden relative">
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] text-sm text-slate-700">
                      <p>名義変更の電子申請、すべて完了しました！</p>
                    </div>
                    <div className="bg-[#dcf8c6] p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%] ml-auto text-sm text-slate-800">
                      <p>ありがとうございます！こんなに早く終わるとは思いませんでした😭</p>
                    </div>
                    <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] text-sm text-slate-700 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-red-500" />
                      <span>完了通知書.pdf</span>
                    </div>
                    {/* Stamp */}
                    <motion.div 
                      initial={{ scale: 2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 1, type: "spring" }}
                      className="absolute bottom-10 right-4 w-24 h-24 border-4 border-red-500/30 rounded-full flex items-center justify-center -rotate-12"
                    >
                      <span className="text-red-500/30 font-bold text-xl uppercase border-y-2 border-red-500/30">COMPLETE</span>
                    </motion.div>
                  </div>
                  {/* Input area */}
                  <div className="h-16 bg-slate-50 border-t border-slate-200"></div>
                </div>
              </div>
            </motion.div>
          </Float>

          {/* Background Floating Elements */}
          <Float delay={1.5} duration={7}>
            <div className="absolute top-20 -right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-xl z-0 w-48">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"><Check className="w-5 h-5 text-white" /></div>
                <div className="h-2 w-20 bg-white/30 rounded-full"></div>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full mb-2"></div>
              <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
            </div>
          </Float>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hidden md:block"
      >
        <ChevronDown className="w-8 h-8" />
      </motion.div>
    </section>
  );
};

const Problems = () => {
  const problems = [
    { title: "手続き先が不明", desc: "屋根の太陽光、誰に名義変更を頼めばいいか分からない" },
    { title: "相続手続きの漏れ", desc: "家の名義変更はしたが、太陽光パネルは放置していた" },
    { title: "電子申請が複雑", desc: "経産省のシステムが難解で、IDやパスワードも不明" },
    { title: "スケジュール切迫", desc: "売買決済までに急いで名義変更を済ませたい" },
  ];

  return (
    <section id="problems" className="py-24 md:py-32 bg-slate-50">
      <div className="container mx-auto px-4 md:px-8">
        <FadeIn>
          <SectionHeading 
            en="Check List" 
            jp={<>こんなお悩み、<br className="md:hidden" />抱えていませんか？</>} 
          />
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {problems.map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-100 h-full hover:border-red-200 transition-colors group relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-slate-200 group-hover:bg-red-400 transition-colors"></div>
                <div className="mb-6 w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 group-hover:bg-red-50 group-hover:text-red-500 flex items-center justify-center transition-colors">
                  <X className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-red-600 transition-colors">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-16 md:mt-24 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 max-w-4xl mx-auto text-center relative overflow-hidden">
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-60"></div>
             
             <div className="relative z-10">
               <p className="text-primary font-bold text-lg md:text-2xl mb-4">
                 その面倒な手続き、<span className="text-accent underline decoration-4 decoration-accent/30 underline-offset-4">丸投げでOK</span>です。
               </p>
               <p className="text-slate-500 mb-8 leading-relaxed">
                 手続きの遅延は、売電収入の停止や取引トラブルの原因になります。<br className="hidden md:block"/>
                 専門家に任せて、安心と時間を手に入れませんか？
               </p>
               <div className="inline-block">
                 <LineButton size="md" text="まずは無料で相談してみる" />
               </div>
             </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Process = () => {
  return (
    <section id="process" className="py-24 md:py-32 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <FadeIn>
          <SectionHeading en="Simple Flow" jp="ご依頼は3ステップ" />
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative mt-20">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-16 left-0 w-full h-1 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 -z-10"></div>

          {[
            {
              step: "01",
              title: "LINEで相談",
              desc: "まずはLINEでお友達登録。現状の書類や設備の写真をスマホで送るだけでOK。",
              icon: <MessageCircle className="w-8 h-8" />,
              color: "bg-[#06C755] text-white"
            },
            {
              step: "02",
              title: "署名・捺印",
              desc: "行政書士が作成した書類をご郵送します。内容を確認し、署名して返送してください。",
              icon: <FileText className="w-8 h-8" />,
              color: "bg-primary text-white"
            },
            {
              step: "03",
              title: "手続き完了",
              desc: "官公庁・電力会社への申請は全て代行。完了通知が届くのを待つだけです。",
              icon: <CheckCircle className="w-8 h-8" />,
              color: "bg-accent text-white"
            }
          ].map((item, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <div className="relative flex flex-col items-center text-center">
                {/* Number Badge */}
                <div className="absolute -top-12 text-6xl font-black text-slate-100 -z-10 select-none font-sans">
                  {item.step}
                </div>
                
                {/* Icon Circle */}
                <Float delay={index * 0.5} duration={5}>
                  <div className={`w-24 h-24 rounded-3xl ${item.color} flex items-center justify-center shadow-xl mb-6 rotate-3 hover:rotate-0 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                </Float>
                
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs">{item.desc}</p>
                
                {/* Mobile Arrow */}
                {index < 2 && (
                  <div className="md:hidden mt-8 text-slate-200">
                    <ArrowRight className="w-8 h-8 rotate-90" />
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Solution = () => {
  return (
    <section className="py-24 md:py-32 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1">
             <FadeIn>
               <span className="text-accent font-bold tracking-widest text-xs uppercase mb-3 block">Why Professional?</span>
               <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-8 leading-tight">
                 複雑な手続き、<br />
                 <span className="text-primary">ワンストップ</span>で解決。
               </h2>
               <p className="text-slate-600 text-lg leading-relaxed mb-10">
                 太陽光発電の名義変更には、電力会社、経済産業省（JPEA）、場合によっては法務局など、複数の機関への手続きが必要です。<br /><br />
                 これらをバラバラに依頼すると、手間も費用もかさみます。私たちは「行政書士」として、これら全てを一括で引き受けます。
               </p>

               <div className="space-y-6">
                 {[
                   { title: "経産省・電力会社への一括申請", sub: "ID/PW管理から代行します" },
                   { title: "相続書類（遺産分割協議書）作成", sub: "法的な書類もお任せください" },
                   { title: "全国対応・完全オンライン完結", sub: "ご来所不要で完了します" }
                 ].map((feat, i) => (
                   <div key={i} className="flex items-start gap-4">
                     <div className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center shrink-0 text-accent">
                       <Check className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="font-bold text-slate-800 text-lg">{feat.title}</h4>
                       <p className="text-slate-500 text-sm">{feat.sub}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </FadeIn>
          </div>

          <div className="order-1 lg:order-2 relative">
            <FadeIn direction="right">
              {/* Tilted Cards Stack */}
              <div className="relative w-full max-w-md mx-auto aspect-square">
                 {/* Decorative Blobs */}
                 <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                 <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full blur-3xl opacity-50"></div>

                 <motion.div 
                   animate={{ y: [0, -10, 0] }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute top-10 left-0 w-full bg-white p-6 rounded-3xl shadow-xl z-20 border border-slate-100"
                 >
                    <div className="flex items-center gap-4 mb-4 border-b border-slate-50 pb-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-primary"><Building2 className="w-5 h-5"/></div>
                      <div>
                        <p className="text-xs text-slate-400">提出先</p>
                        <p className="font-bold text-slate-800">経済産業省 (JPEA)</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                       <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                       <div className="h-2 w-3/4 bg-slate-100 rounded-full"></div>
                    </div>
                 </motion.div>

                 <motion.div 
                   animate={{ y: [0, -15, 0] }}
                   transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute top-32 left-8 w-full bg-white p-6 rounded-3xl shadow-xl z-30 border border-slate-100"
                 >
                    <div className="flex items-center gap-4 mb-4 border-b border-slate-50 pb-4">
                      <div className="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center text-accent"><Zap className="w-5 h-5"/></div>
                      <div>
                        <p className="text-xs text-slate-400">提出先</p>
                        <p className="font-bold text-slate-800">各電力会社</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                       <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                       <div className="h-2 w-5/6 bg-slate-100 rounded-full"></div>
                    </div>
                    <div className="absolute -right-2 -top-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">代行OK</div>
                 </motion.div>

              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

const Reasons = () => {
  return (
    <section id="reasons" className="py-24 md:py-32 bg-[#0f172a] text-white overflow-hidden relative">
      {/* Background noise/dots */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <FadeIn>
          <SectionHeading en="Our Strengths" jp="選ばれる4つの理由" align="center" light />
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "地域No.1の実績",
              desc: "長崎県内でトップクラスの口コミ評価を獲得。確かな信頼があります。",
              icon: <Award className="w-6 h-6" />,
              badge: "TRUST"
            },
            {
              title: "完全ワンストップ",
              desc: "面倒なID取得から書類作成まで、窓口ひとつで完結します。",
              icon: <CheckCircle className="w-6 h-6" />,
              badge: "EASY"
            },
            {
              title: "法的サポート",
              desc: "行政書士だからできる、遺産分割協議書などの権利義務書類の作成。",
              icon: <FileText className="w-6 h-6" />,
              badge: "LEGAL"
            },
            {
              title: "柔軟な対応",
              desc: "LINE・Zoom・郵送・出張。お客様のやりやすい方法で進めます。",
              icon: <MessageCircle className="w-6 h-6" />,
              badge: "FLEXIBLE"
            }
          ].map((item, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-[2rem] hover:bg-slate-800 transition-colors group h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest bg-slate-900 text-slate-400 px-3 py-1 rounded-full border border-slate-700">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const voices = [
    {
      name: "T.S 様",
      info: "50代男性 / 中古住宅購入",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=200&h=200",
      title: "屋根のことまで分からなくて…",
      content: "不動産の手続きは済んだけど、屋根にある太陽光発電の名義変更までは誰に相談していいのか分からず困っていました。ここにお願いしたら全部まとめてやってもらえて本当に助かりました。"
    },
    {
      name: "K.M 様",
      info: "60代女性 / 実家を相続",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=200&h=200",
      title: "相続書類がまた必要なんて",
      content: "家の名義変更は司法書士さんに頼みましたが、まさか太陽光パネルにまで相続書類が必要になるとは…。LINEで気軽に相談できて、戸籍集めから手続きまで全部やってもらえたので安心でした。"
    },
    {
      name: "Y.A 様",
      info: "40代女性 / 電子申請代行",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=200&h=200",
      title: "画面を見た瞬間、諦めました",
      content: "IDやパスワードの管理もできてなくて、電子申請の画面を開いた瞬間に無理だと思いました（笑） 全部お任せで、LINEだけでやりとりできたのがすごくラクでした！"
    }
  ];

  return (
    <section id="voice" className="py-24 md:py-32 bg-slate-50 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <FadeIn>
          <SectionHeading en="Testimonials" jp="お客様の声" />
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-20">
          {voices.map((voice, index) => (
            <FadeIn key={index} delay={index * 0.2}>
              <div className="relative group">
                <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 shadow-xl border border-slate-100 h-full flex flex-col transition-transform duration-300 hover:-translate-y-2">
                  
                  {/* Floating Avatar */}
                  <div className="absolute -top-10 left-10 w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
                    <img src={voice.image} alt={voice.name} className="w-full h-full object-cover" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6 justify-end text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>

                  <h3 className="font-bold text-lg md:text-xl text-slate-800 mb-4 leading-snug">
                    "{voice.title}"
                  </h3>
                  
                  <div className="relative flex-grow">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-slate-100 fill-current rotate-180 -z-10" />
                    <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                      {voice.content}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{voice.name}</p>
                      <p className="text-xs text-slate-400">{voice.info}</p>
                    </div>
                    <div className="bg-green-100 text-green-600 p-2 rounded-full">
                       <Check className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Story = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          
          <div className="relative">
            <FadeIn direction="left">
               <div className="relative rounded-[2rem] overflow-hidden shadow-2xl rotate-2">
                 <img 
                   src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop" 
                   alt="Consulting" 
                   className="w-full h-auto object-cover"
                 />
                 <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
               </div>
               {/* Accent Box */}
               <div className="absolute -bottom-6 -left-6 bg-accent text-white p-6 rounded-3xl shadow-lg max-w-[200px] hidden md:block">
                 <p className="font-bold text-lg">安心の<br/>専門窓口</p>
               </div>
            </FadeIn>
          </div>

          <div>
            <FadeIn direction="right">
              <span className="text-primary font-bold tracking-widest text-xs uppercase mb-3 block">Our Mission</span>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">
                「誰に聞けばいいか分からない」<br/>その不安を解消するために。
              </h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  「中古住宅を買ったけど、屋根のパネルはどうすれば？」「親から相続したけど手続きが分からない」
                </p>
                <p>
                  そんな声が、私たちのもとに数多く寄せられました。不動産の手続きは司法書士がいますが、太陽光設備は専門外とされることが多く、お客様は「たらい回し」にされがちです。
                </p>
                <p>
                  私たちは行政書士として、この<strong className="text-slate-800 bg-yellow-100 px-1">「隙間の手続き」を専門的にサポート</strong>する体制を整えました。
                </p>
                <p>
                  面倒なことは全てプロにお任せください。あなたが新しい生活を安心してスタートできるよう、全力でサポートいたします。
                </p>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-primary relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <FadeIn>
          <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 text-white font-medium">
            ＼ まずは無料相談から ／
          </div>
          
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            面倒な手続きは、<br/>
            LINEで<span className="text-accent">丸投げ</span>してください。
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            行政書士本人が直接対応します。<br/>
            「何から始めればいいか分からない」状態でも大丈夫です。
          </p>

          <div className="flex flex-col items-center gap-6">
             <motion.div 
               whileHover={{ scale: 1.05 }} 
               whileTap={{ scale: 0.95 }}
               className="w-full md:w-auto"
             >
                <LineButton size="lg" text="LINEで無料相談を始める" subText="24時間受付中・しつこい営業なし" />
             </motion.div>
             
             <div className="flex flex-col md:flex-row gap-4 md:gap-8 text-white/60 text-sm mt-4">
               <span className="flex items-center gap-2"><Check className="w-4 h-4" /> 全国対応（郵送）</span>
               <span className="flex items-center gap-2"><Check className="w-4 h-4" /> 相談無料</span>
               <span className="flex items-center gap-2"><Check className="w-4 h-4" /> 土日祝も受付</span>
             </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 text-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 mb-16 border-b border-slate-900 pb-16">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-6">
               <div className="bg-slate-800 p-2 rounded-lg"><Sun className="w-6 h-6 text-accent" /></div>
               <span>太陽光名義変更サポート</span>
            </div>
            <p className="text-slate-500 leading-relaxed mb-6">
              長崎県内を中心に、全国の太陽光発電設備の名義変更・相続手続きを専門に扱う行政書士事務所です。
            </p>
          </div>
          
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-500" />
              免責事項
            </h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li>• 電力会社や行政機関の判断により、手続きに時間を要する場合があります。</li>
              <li>• 必要に応じて、司法書士・税理士・弁護士等と連携して対応いたします。</li>
              <li>• 売電収入の確約や保証をするものではありません。</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} Solar Name Change Support. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
            <a href="#" className="hover:text-white transition-colors">特定商取引法に基づく表記</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const App = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 selection:bg-accent/30 selection:text-slate-900">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Problems />
        <Process />
        <Solution />
        <Reasons />
        <Testimonials />
        <Story />
        <CTA />
      </main>
      <Footer />
      
      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-slate-200 md:hidden z-40 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] pb-safe safe-area-bottom">
        <LineButton size="lg" text="LINEで無料相談" subText="1分で完了・相談無料" />
      </div>
    </div>
  );
};

export default App;
