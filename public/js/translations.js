/**
 * translations.js
 * Translation dictionary mapping English text strings to Simplified Chinese (中文).
 * Covers: navigation, all page banners/heroes, stats, intro sections, capabilities,
 *         feature value props, industries marquee, CTA band, footer, forms and UI.
 * Provides the global window.setLang function and dynamic DOM translation walk.
 */
window.translations = {
  // ─── Navigation & Utility Bar ───────────────────────────────────────────────
  Home: '首页',
  'About Us': '关于我们',
  Services: '服务',
  Industries: '行业',
  Quality: '质量',
  Facilities: '设施',
  Products: '产品',
  Careers: '职业',
  Contact: '联系',
  'Contact Us': '联系我们',
  'Request a Quote': '申请报价',
  'Shah Alam, Selangor': '雪兰莪州莎阿南',

  // ─── About Us Mega Menu ──────────────────────────────────────────────────────
  'About Company': '公司简介',
  'Company overview, who we are, and our manufacturing capabilities.': '公司概述、我们是谁以及我们的制造能力。',
  'Company History': '公司历史',
  'Our founding story and growth from tool shop to regional contract manufacturer.':
    '我们的创立故事以及从工具车间成长为区域合同制造商的历程。',
  Milestones: '里程碑',
  'Key achievements, certifications, and expansion milestones since 2003.':
    '自2003年以来的主要成就、认证和扩张里程碑。',
  'Vision, Mission & Values': '愿景、使命与价值观',
  'The principles driving every decision at Top Precision.': '推动Top Precision每项决策的原则。',
  'Environmental Responsibility': '环境责任',
  'Our commitment to sustainable and responsible manufacturing practices.': '我们对可持续和负责任制造实践的承诺。',

  // ─── Services Mega Menu ──────────────────────────────────────────────────────
  'CNC Machining': 'CNC机加工',
  '3-, 4- & 5-axis milling, turning, grinding': '三轴、四轴和五轴铣削、车削、磨削',
  '3-, 4-, and 5-axis high-speed milling and turning centers.': '3轴、4轴和5轴高速铣削和车削加工中心。',
  'Precision Turning': '精密车削',
  'Swiss-type turning and multitasking spindle lathes.': '瑞士型车削和多任务主轴车床。',
  'Sheet Metal Fabrication': '钣金加工',
  'Precision fabrication of custom sheet metal components and enclosures.': '定制钣金部件和外壳的精密制造。',
  'Laser cutting, CNC bending, and welding assemblies.': '激光切割、CNC折弯和焊接组件。',
  'Assembly & Integration': '装配与集成',
  'Box Build Assembly': '整机装配',
  'Integrated assembly of mechanical and electrical components into complete finished products.':
    '将机械和电气组件集成装配成完整的成品。',
  'Sub-assembly and full-system cleanroom integration.': '洁净室内的子组件和全系统集成。',
  'Engineering Support': '工程支持',
  'DFM analysis, toolpath programming, and prototyping.': 'DFM分析、刀具路径编程和原型制作。',
  'Surface Finishing': '表面处理',
  'Professional finishing processes to improve appearance, durability, and protection.':
    '专业的表面处理工艺，提升外观、耐用性和防护性能。',
  'Quality Inspection': '质量检测',

  // ─── Hero / Banner Section ───────────────────────────────────────────────────
  'ISO 9001:2015 Certified Manufacturer': 'ISO 9001:2015 认证制造商',
  'Precision.': '精密。',
  'Engineered.': '匠心制造。',
  'Delivered on time, every time.': '准时交货，每次如此。',
  'Top Precision Manufacturing Sdn Bhd is a Tier-1 contract manufacturer specialising in CNC machining, precision fabrication, and sub-assembly for the aerospace, semiconductor, medical, and oil & gas industries.':
    'Top Precision Manufacturing Sdn Bhd是一级合同制造商，专注于CNC机加工、精密制造以及为航空航天、半导体、医疗和石油天然气行业提供组装服务。',
  'Explore Services': '探索服务',
  Scroll: '滚动',

  // ─── Stats Bar ───────────────────────────────────────────────────────────────
  'Years in Operation': '运营年数',
  'Established 2003, Shah Alam': '创立于2003年，莎阿南',
  'sq ft Facility': '平方英尺厂房',
  'Climate-controlled production floor': '恒温恒湿生产车间',
  Employees: '员工',
  'Skilled engineers & technicians': '技术工程师和技术人员',

  // ─── Intro Split — Who We Are ────────────────────────────────────────────────
  'Who We Are': '我们是谁',
  'Your Trusted Partner in': '您值得信赖的伙伴 —',
  'Precision Manufacturing': '精密制造',
  "Founded in 2003, Top Precision Manufacturing Sdn Bhd has grown from a modest tool-and-die shop into one of Malaysia's leading contract manufacturers — serving customers across the aerospace, semiconductor, medical device, oil & gas, and industrial automation sectors.":
    '成立于2003年，Top Precision Manufacturing Sdn Bhd已从一家小型模具车间发展成为马来西亚领先的合同制造商之一，为航空航天、半导体、医疗器械、石油天然气及工业自动化等领域的客户提供服务。',
  'Our 45,000 sq ft climate-controlled facility in Shah Alam houses over 60 late-model CNC machining centres, a dedicated metrology laboratory, and fully equipped assembly cells. Every component we produce is backed by a rigorous ISO 9001:2015 quality management system.':
    '我们位于莎阿南的45,000平方英尺恒温厂房内配备了60余台最新型CNC加工中心、专用计量实验室和完整的装配单元。我们生产的每个零件均通过严格的ISO 9001:2015质量管理体系保障。',
  'Learn About Us': '了解我们',

  // ─── Capabilities Grid ───────────────────────────────────────────────────────
  'What We Do': '我们的业务',
  'Our Manufacturing': '我们的制造',
  'From single prototype to high-volume production runs — we deliver precision at every stage of the manufacturing process.':
    '从单件原型到大批量生产——我们在制造过程的每个阶段都精益求精。',
  'View Service': '查看服务',

  // ─── Feature / Value Props ───────────────────────────────────────────────────
  'Why Top Precision': '为何选择Top Precision',
  'Comprehensive Engineering &': '全面的工程与',
  'Manufacturing Solutions': '制造解决方案',
  'We partner with OEMs and Tier-1 suppliers across the most demanding sectors, delivering components and sub-assemblies to exacting specifications — on time, with full traceability.':
    '我们与各大行业的OEM和一级供应商合作，按照严格的规格要求准时交付零部件和子组件，并提供完整的可追溯性。',
  '5-Axis CNC Machining': '五轴CNC机加工',
  'Complex geometries held to +/-0.005mm — every time.': '复杂几何形状精度控制在±0.005mm——每次如此。',
  'ISO 9001:2015 Certified': 'ISO 9001:2015 认证',
  'Documented QMS with CMM-verified inspection reports.': '带有CMM验证检测报告的文件化质量管理体系。',
  '5-7 Day Prototypes': '5至7天原型交付',
  'NPI rapid turnaround without sacrificing tolerances.': '快速新产品导入，不牺牲公差要求。',
  'In-House DFM Review': '内部DFM审查',
  'Resident engineers review drawings before cutting begins.': '专驻工程师在加工开始前审查图纸。',
  'ERP-Driven Scheduling': 'ERP驱动排产',
  'Real-time order tracking with milestone notifications.': '实时订单跟踪并推送节点通知。',
  '98.6% On-Time Delivery': '98.6% 准时交货率',
  'Accurate commit dates — and we meet them.': '精准承诺交期——并切实履行。',
  'View All Services': '查看全部服务',

  // ─── Industries Section Headline ─────────────────────────────────────────────
  'Industries We Serve': '我们服务的行业',
  'Precision Engineered for Demanding Industries': '为严苛行业精密制造',
  'Top Precision delivers advanced manufacturing solutions for high-tolerance, mission-critical applications across global B2B sectors.':
    'Top Precision为全球B2B行业中高精度、使命关键型应用提供先进制造解决方案。',
  Explore: '探索',

  // ─── Industry Names ───────────────────────────────────────────────────────────
  'Aerospace & Defence': '航空航天与国防',
  'Oil & Gas': '石油与天然气',
  'Semiconductor Equipment': '半导体设备',
  Semiconductor: '半导体',
  'Medical Devices': '医疗器械',
  Automotive: '汽车',
  'Marine & Offshore': '船舶与海洋',
  'Industrial Machinery': '工业机械',
  'Industrial Automation': '工业自动化',
  'Electronics & Robotics': '电子与机器人',

  // ─── Industry Card Descriptions ───────────────────────────────────────────────
  'Structural engine components, landing gear components, and complex avionics enclosures.':
    '结构发动机部件、起落架组件及复杂航电外壳。',
  'Vacuum chambers, gas manifolds, and precision wafer-handling elements.': '真空腔体、气体管汇及精密晶圆处理元件。',
  'Surgical instrumentation, implantable housings, and metrology-tested components.':
    '手术器械、植入式外壳及经计量测试的部件。',
  'Downhole drilling valves, high-pressure flow manifolds, and connectors.': '井下钻探阀门、高压流量管汇及连接器。',
  'High-volume components for electric drivetrains and suspension mounts.': '电驱动系统和悬架安装座的大批量零部件。',
  'Custom actuators, robotic joints, and material-handling tool components.':
    '定制执行器、机器人关节及物料搬运工具部件。',
  'Heavy-duty corrosion-resistant marine winches, shaft locks, and gearsets.': '重型耐腐蚀船用绞盘、轴锁及齿轮组。',
  'Precision heat sinks, sensors, and structural robotic chassis elements.':
    '精密散热器、传感器及结构性机器人底盘元件。',

  // ─── Industry Detailed Descriptions (Industries page) ────────────────────────
  'Structural components, engine housings, and landing gear linkages machined from titanium and Inconel with full AS9102 FAIR documentation.':
    '由钛和Inconel合金加工的结构部件、发动机外壳和起落架连杆，附带完整的AS9102 FAIR文件。',
  'Surgical instruments, orthopaedic implants, and diagnostic equipment enclosures requiring ISO 13485 compliance and mirror-finish polishing.':
    '需要符合ISO 13485标准并进行镜面抛光的手术器械、骨科植入物和诊断设备外壳。',
  'Vacuum chambers, wafer-handling end effectors, and critical fluid control manifolds built in cleanroom environments.':
    '在洁净室环境中制造的真空腔体、晶圆处理末端执行器和关键流体控制管汇。',

  // ─── CTA Band ────────────────────────────────────────────────────────────────
  'Start a Project Today': '立即启动项目',
  'REQUEST.': '立即询价。',
  'WE DELIVER.': '我们准时交付。',
  'Send us your drawings, STEP files, or specifications. Our engineering team responds within one business day with a detailed quotation, DFM notes, and lead-time commitment.':
    '发送您的图纸、STEP文件或规格说明，我们的工程团队将在一个工作日内回复详细报价、DFM备注和交货期承诺。',

  // ─── Page Heroes & Breadcrumbs ───────────────────────────────────────────────
  'Manufacturing Services': '制造服务',
  'Quality & Certification': '质量与认证',
  'Facilities & Equipment': '设施与设备',
  'Products / Projects': '产品 / 项目',
  'About Top Precision Manufacturing': '关于Top Precision制造',
  'Manufacturing Capabilities': '制造能力',
  'Sectors We Supply': '我们供应的领域',

  // ─── Footer ──────────────────────────────────────────────────────────────────
  'Engineering Precision. Delivering Excellence.': '精密工程，卓越交付。',
  'Top Precision Manufacturing Sdn Bhd is a leading tier-1 contract manufacturer specialising in high-precision CNC machining, complex assemblies, and sheet metal fabrication.':
    'Top Precision Manufacturing Sdn Bhd是领先的一级合同制造商，专注于高精度CNC机加工、复杂装配和钣金加工。',
  'Quick Links': '快速链接',
  'Contact Info': '联系信息',
  'All Rights Reserved.': '版权所有。',
  'Privacy Policy': '隐私政策',
  'Terms of Service': '服务条款',
  Sitemap: '网站地图',

  // ─── General UI / Buttons ────────────────────────────────────────────────────
  'Read More': '阅读更多',
  'Learn More': '了解更多',
  'View All': '查看全部',
  Download: '下载',
  Submit: '提交',
  Send: '发送',
  Close: '关闭',
  Back: '返回',
  Next: '下一步',
  Previous: '上一步',
  Search: '搜索',

  // ─── Form Labels & Placeholders ──────────────────────────────────────────────
  Name: '姓名',
  Email: '电子邮件',
  Phone: '电话',
  Message: '留言',
  Company: '公司',
  Country: '国家',
  'Your name': '您的姓名',
  'Your email': '您的电子邮件',
  'Your phone number': '您的电话号码',
  'Your company name': '您的公司名称',
  'Your message': '您的留言',
  'Select country': '选择国家',

  // ─── About Page ──────────────────────────────────────────────────────────────
  'Our Story': '我们的故事',
  'Leadership Team': '管理团队',
  'Our Values': '我们的价值观',
  Certifications: '认证',
  'Quality Policy': '质量政策',
  'ISO Certified': 'ISO认证',

  // ─── Capabilities Page ───────────────────────────────────────────────────────
  'Our Capabilities': '我们的能力',
  Tolerances: '公差',
  Materials: '材料',
  Equipment: '设备',
  Capacity: '产能',

  // ─── Quality Page ────────────────────────────────────────────────────────────
  'Quality Assurance': '质量保证',
  'Inspection Equipment': '检测设备',
  'CMM Inspection': '三坐标检测',
  'First Article Inspection': '首件检验',
  'Material Traceability': '材料可追溯性',

  // ─── Facilities Page ─────────────────────────────────────────────────────────
  'Production Floor': '生产车间',
  'Metrology Lab': '计量实验室',
  'Clean Room': '洁净室',

  // ─── Products Page ───────────────────────────────────────────────────────────
  'Featured Projects': '精选项目',
  'Case Studies': '案例研究',

  // ─── Careers Page ────────────────────────────────────────────────────────────
  'Job Openings': '职位空缺',
  'Apply Now': '立即申请',
  'Join Our Team': '加入我们',
  'Why Work With Us': '为什么加入我们',

  // ─── About Page — Hero & Company Overview ────────────────────────────────────
  'About Top Precision': '关于 Top Precision',
  'A Legacy of': '传承',
  Precision: '精密',
  'Founded in 2003 by a team of precision engineering veterans, Top Precision Manufacturing Sdn Bhd began as a specialist tool-and-die shop serving the growing electronics manufacturing base in Selangor. Today, we have evolved into a full-service Tier-1 and Tier-2 contract manufacturer serving the most demanding industries globally.':
    'Top Precision Manufacturing Sdn Bhd由一批精密工程资深人士于2003年创立，最初是一家服务于雪兰莪州电子制造业的专业模具车间。如今，我们已发展成为一家全方位一级和二级合同制造商，为全球最严苛的行业提供服务。',
  'Our philosophy is simple: invest in the best technology, develop the best people, and never compromise on quality. This commitment has allowed us to grow to a 45,000 sq ft climate-controlled facility housing over 60 advanced CNC machining centres, a dedicated metrology laboratory, and ISO Class 7 cleanroom assembly cells.':
    '我们的理念很简单：投资最好的技术，培养最好的人才，绝不妥协于质量。这一承诺使我们发展成为拥有45,000平方英尺恒温厂房、60余台先进CNC加工中心、专用计量实验室和ISO Class 7洁净室装配单元的企业。',
  "We act as a seamless extension of our customers' manufacturing supply chains — from initial DFM consultation through volume production and inspection.":
    '我们作为客户制造供应链的无缝延伸——从最初的DFM咨询到批量生产和检测。',

  // ─── About Page — Vision / Mission / Values ──────────────────────────────────
  'What Drives Us': '驱动我们的力量',
  'Core Values': '核心价值观',
  'Our Vision': '我们的愿景',
  "To be recognized globally as Southeast Asia's premier engineering partner for complex, mission-critical component manufacturing and precision assembly.":
    '成为全球公认的东南亚顶级工程合作伙伴，专注于复杂关键部件制造和精密装配。',
  'Our Mission': '我们的使命',
  'To deliver uncompromised precision and reliability to our partners, acting as a seamless extension of their manufacturing supply chain through continuous innovation and stringent quality control.':
    '为合作伙伴提供毫不妥协的精度和可靠性，通过持续创新和严格的质量控制，成为他们制造供应链的无缝延伸。',
  'Quality First': '质量第一',
  "We embed quality at every process step. Zero defects is not an aspiration — it's a standard.":
    '我们将质量融入每一个工序。零缺陷不是目标，而是标准。',
  'Continuous Innovation': '持续创新',
  "We invest in the latest machining technology and processes to stay ahead of our customers' needs.":
    '我们投资最新的加工技术和工艺，始终领先于客户的需求。',
  'Customer Partnership': '客户伙伴关系',
  'We work alongside our customers as an engineering partner, not just a supplier. Every project gets our full attention.':
    '我们作为工程合作伙伴与客户并肩工作，而不仅仅是供应商。每个项目都获得我们的全力关注。',

  // ─── About Page — Company History / Timeline ─────────────────────────────────
  'Our Journey': '我们的历程',
  'History & Milestones': '历史与里程碑',
  'Company Established': '公司成立',
  'Top Precision Manufacturing Sdn Bhd incorporated in Shah Alam, Selangor. Initial operations focus on tool-and-die support for local electronics manufacturers.':
    'Top Precision Manufacturing Sdn Bhd在雪兰莪州莎阿南注册成立。初期业务专注于为本地电子制造商提供模具支持。',
  'First CNC Expansion': '首次CNC扩张',
  'Investment in our first 4 VMCs and a dedicated turning cell. Headcount grows to 40. First aerospace sub-contract work begins.':
    '投资首批4台立式加工中心和专用车削单元，员工人数增至40人，首批航空航天分包工作启动。',
  'ISO 9001 Certification': 'ISO 9001认证',
  'Achieved ISO 9001:2008 certification. First dedicated metrology lab established. On-time delivery record hits 96%.':
    '获得ISO 9001:2008认证，建立第一个专用计量实验室，准时交货率达96%。',
  '5-Axis & Semiconductor Entry': '五轴加工与半导体领域进入',
  'Addition of first 5-axis machining centres and Swiss-type auto lathes. Qualified as a semiconductor equipment component supplier for a major US OEM.':
    '引进首批五轴加工中心和瑞士型自动车床，成为美国某大型OEM的半导体设备零件合格供应商。',
  'New Facility & Cleanroom': '新厂房与洁净室',
  'Moved to current 45,000 sq ft headquarters. ISO Class 7 cleanroom assembly cell commissioned for medical and semiconductor customers.':
    '迁入现有45,000平方英尺总部，为医疗和半导体客户投入使用ISO Class 7洁净室装配单元。',
  'Industry 4.0 Integration': '工业4.0整合',
  'ERP system with real-time machine monitoring deployed. Target: AS 9100D certification by end of year. Over 200 employees, 2M+ parts annually.':
    '部署带实时机器监控的ERP系统，目标是年底前获得AS 9100D认证。员工超过200人，年产零件超过200万件。',

  // ─── About Page — Sustainability ─────────────────────────────────────────────
  Sustainability: '可持续发展',
  Environmental: '环境',
  Responsibility: '责任',
  'Top Precision Manufacturing is committed to responsible manufacturing practices that minimize our environmental footprint while delivering world-class precision components.':
    'Top Precision Manufacturing致力于负责任的制造实践，在交付世界级精密部件的同时最大程度减少环境影响。',
  'Coolant and metal swarf fully recycled through licensed waste management contractors.':
    '切削液和金属碎屑通过持牌废物管理承包商全面回收处理。',
  'LED lighting and variable-speed drives on all major equipment reduce energy consumption by 28% vs. 2019 baseline.':
    '所有主要设备配备LED照明和变频驱动，能耗较2019年基准降低28%。',
  'REACH and RoHS compliance maintained across all finishing processes.': '所有表面处理工序均符合REACH和RoHS法规要求。',
  'Ongoing assessment for ISO 14001 Environmental Management System certification.':
    '持续推进ISO 14001环境管理体系认证评估。',

  // ─── Dedicated Service Pages ────────────────────────────────────────────────
  'Key Metrics': '关键指标',
  'Tolerance:': '公差:',
  'CNC Centers:': 'CNC加工中心:',
  'Quality System:': '质量体系:',
  'Bar Feed Size:': '最大棒料尺寸:',
  'Lathe Type:': '车床类型:',
  'Tooling:': '刀具:',
  'Standard:': '标准:',
  'Compliance:': '合规性:',
  'Plating:': '电镀:',
  'CAM Software:': 'CAM软件:',
  'Prototyping:': '原型制作:',
  'Eng Engagement:': '工程参与:',
  'Contact Us Today': '立即联系我们',
  'Advanced 3-, 4- & 5-Axis Milling and Turning': '先进的3轴、4轴和5轴铣削与车削',
  'Swiss-Type Turning & Live Tooling Lathes': '瑞士型车削与动力刀具车床',
  'Precision Laser Cutting, Bending & Structural Welding': '精密激光切割、折弯与结构焊接',
  'Turnkey Mechanical, Electro-Mechanical & Cleanroom Assembly': '集成机械、机电与洁净室装配',
  'Corrosion Protection, Anodizing & Electro-Plating': '防腐保护、阳极氧化与电镀',
  'Design for Manufacturability (DFM) & NPI Programming': '可制造性设计 (DFM) 与 NPI 编程',
  'Learn More →': '了解更多 →',

  // ─── Careers Page ───────────────────────────────────────────────────────────
  'Build Precision With Us': '与我们共筑精密',
  "At Top Precision, we don't just manufacture parts — we shape the future of advanced technology. We invest in late-model equipment and, most importantly, in our people. Join a team where craftsmanship, safety, and continuous learning are at the core of everything we do.":
    '在 Top Precision，我们不仅制造零件，我们还塑造先进技术的未来。我们投资于最新型的设备，最重要的是，我们投资于员工。加入一个以精湛工艺、安全和持续学习为核心的团队。',
  'View Open Positions': '查看开放职位',
  'Life at Top Precision': '在 Top Precision 的生活',
  'Craftsmanship & Precision': '精湛工艺与精密',
  'We hold our work to the highest standards. In a +/-0.005mm tolerance world, details matter. We nurture a pride in craftsmanship that translates to world-class quality.':
    '我们以最高标准开展工作。在±0.005mm公差的世界里，细节决定成败。我们培养对工艺的自豪感，并将其转化为世界一流的品质。',
  'Safety & Wellbeing': '安全与健康',
  'Our climate-controlled facility is kept clean, organized, and safe. We believe that a clean environment is a productive and safe environment.':
    '我们恒温恒湿的厂房保持清洁、有序和安全。我们相信，清洁的环境就是高效和安全的环境。',
  'Continuous Growth': '持续成长',
  'We support your growth. From internal training programs to external certifications, we help technicians develop into senior programmers and engineering leaders.':
    '我们支持您的成长。从内部培训计划到外部认证，我们帮助技术人员成长为高级编程人员和工程领袖。',
  'Average Employee Tenure': '平均员工任期',
  'Dedicated Employees': '敬业员工',
  'Annual Training Hours': '年人均培训小时',
  'per Employee': '人均',
  '8.5 Years': '8.5 年',
  '40+ Hours': '40+ 小时',
  'Why Join Our Team': '为什么加入我们的团队',
  'Hands-On Training': '实操培训',
  'Learn to program and operate late-model multi-axis CNC machines.': '学习如何对最新型的多轴 CNC 机床进行编程和操作。',
  'Career Advancement': '职业晋升',
  'Real pathways to grow from machine operator to lead engineer.': '从机床操作员成长为首席工程师的真实通道。',
  'Modern Facility': '现代化厂房',
  'Work in a clean, fully air-conditioned 45,000 sq ft manufacturing plant.':
    '在干净、全空调的 45,000 平方英尺制造工厂中工作。',
  'Comprehensive Benefits': '全面福利',
  'Competitive pay, medical coverage, overtime opportunities, and performance bonuses.':
    '竞争力的薪资、医疗保险、加班机会和绩效奖金。',
  'Advanced Machinery': '先进机械',
  'Get hands-on with programmable Zeiss CMMs, DMG Mori machines, and Swiss-type lathes.':
    '亲自操作可编程蔡司 CMM、DMG Mori 机床和瑞士型车床。',
  'Team-First Culture': '团队优先文化',
  'Collaborate with experienced professionals in a supportive, friendly environment.':
    '在支持和友好的环境中与经验丰富的专业人员合作。',
  'Hear From Our People': '听听我们员工的心声',
  'CNC Team Lead': 'CNC 团队主管',
  'Quality Assurance Inspector': '质量保证检验员',
  'Sales & DFM Engineer': '销售与 DFM 工程师',
  "I started as an apprentice operator in 2018. Through Top Precision's training program, I learned 5-axis programming on Mastercam. Today, I lead a team of 8 machinists on the night shift.":
    '我于2018年开始做学徒操作员。通过 Top Precision 的培训计划，我学会了在 Mastercam 上进行五轴编程。今天，我带领着夜班的8名机械师团队。',
  "The focus on quality here is incredible. Working with Zeiss CMMs and inspecting aerospace components keeps me on my toes. It's a clean, safe, and highly professional workshop.":
    '这里对质量的关注是不可思议的。操作蔡司 CMM 并检验航空航天零部件让我保持专注。这是一个干净、安全且高度专业的车间。',
  "What I love about Top Precision is the teamwork. If you face a difficult DFM challenge or an offset issue, there's always a senior engineer ready to help you solve it.":
    '我喜欢 Top Precision 的一点是团队合作。如果您面临棘手的 DFM 挑战或偏置问题，总会有一位资深工程师准备好帮助您解决。',
  'Search by job title...': '按职位名称搜索...',
  'All Departments': '所有部门',
  Machining: '机加工',
  Quality: '质量',
  'Sales & Admin': '销售与行政',
  'Location:': '位置:',
  'Type:': '类型:',
  'Department:': '部门:',
  'Apply Now': '立即申请',
  'Kuala Lumpur': '吉隆坡',
  'Full-Time': '全职',
  'No current openings match your search — check back soon.': '没有符合您搜索条件的职位 — 请稍后查看。',
  'CNC Programmer (5-Axis)': 'CNC 编程员（五轴）',
  'Quality Assurance Inspector (CMM)': '质量保证检验员（CMM）',
  'Sales Engineer': '销售工程师',
  'Production Supervisor (Machining)': '生产主管（机加工）',
  'Requires 3+ years experience with Mastercam/NX for 5-axis simultaneous milling.':
    '需要3年以上使用 Mastercam/NX 进行五轴联动铣削的经验。',
  'Requires experience operating programmable coordinate measuring machines (Zeiss CMM preferred) and reading GD&T drawings.':
    '需要有操作可编程三坐标测量机（蔡司 CMM 优先）和阅读 GD&T 图纸的经验。',
  'Requires engineering background and experience in semiconductor or aerospace contract manufacturing sales.':
    '需要有工程背景以及半导体或航空航天合同制造销售经验。',
  'Requires 5+ years shop floor supervision experience and strong background in CNC setup and scheduling.':
    '需要5年以上车间管理经验，以及在 CNC 设置和排产方面的深厚背景。',
  "Don't see a role that fits?": '没有找到合适的职位？',
  'We are always on the lookout for talented machinists, engineers, and manufacturing professionals. Send us your resume and we will contact you when an opportunity arises.':
    '我们一直在寻找优秀的机械师、工程师 and 制造专业人才。请把您的简历发送给我们，一有合适的机会，我们会与您联系。',
  'Send General Application': '发送通用申请',
  // ─── Bulk Addition of Missing Translations ───
  'Precision CNC Machining': '精密CNC机加工',
  'We provide precision CNC machining services for the production of high-quality components and parts, from raw material preparation through to finished products. Our machining processes are carried out according to customer drawings, engineering specifications, and defined quality requirements, delivering reliable and repeatable results for both custom and production components.':
    '我们提供精密CNC机加工服务，用于生产高质量组件和零件，涵盖从原材料准备到成品的整个过程。我们的加工过程严格按照客户图纸、工程规范和规定的质量要求进行，为定制和量产组件提供可靠和一致的结果。',
  'Precision CNC Milling': '精密CNC铣削',
  'Accurate CNC milling for the production of complex and precision-engineered components, manufactured according to customer drawings, CAD models, and technical specifications.':
    '精确的CNC铣削，用于生产复杂和精密工程组件，严格按照客户图纸、CAD模型和技术规范制造。',
  'Aluminium Machining': '铝材加工',
  'Efficient machining of aluminium components for applications requiring lightweight construction, dimensional accuracy, and consistent production quality.':
    '高效加工铝制组件，适用于要求轻量化结构、尺寸精度和一致生产质量的应用。',
  'Custom Component Manufacturing': '定制零部件制造',
  'Production of custom-machined components tailored to specific dimensions, geometries, and application requirements across a range of industrial applications.':
    '生产根据特定尺寸、几何形状和应用需求量身定制的加工组件，适用于各种工业应用。',
  'Manufacturing Focus': '制造重点',
  'Our CNC machining capabilities support the production of precision components across different sizes, geometries, and production requirements. From individual custom parts to repeat production, we focus on dimensional accuracy, process consistency, and efficient manufacturing to meet the requirements of each project.':
    '我们的CNC机加工能力支持生产各种尺寸、几何形状和生产要求的精密组件。从单个定制零件到批量生产，我们专注于尺寸精度、工艺一致性和高效制造，以满足每个项目的需求。',
  'Integrated Box Build Assembly': '集成整机装配',
  'We provide integrated box build assembly services that bring together mechanical, electrical, and fabricated components into complete finished products. From component preparation and mechanical integration to electrical assembly and final inspection, our assembly processes are carried out according to customer drawings, specifications, and quality requirements.':
    '我们提供集成的整机装配服务，将机械、电气和制造组件组合成完整的成品。从组件准备和机械集成到电气装配和最终检查，我们的装配过程均按照客户图纸、规范和质量要求进行。',
  'Mechanical Assembly': '机械装配',
  'Assembly and integration of enclosures, brackets, fasteners, mechanical components, and fabricated parts into complete assemblies.':
    '外壳、支架、紧固件、机械部件和制造零件的装配和集成。',
  'Electrical Assembly': '电气装配',
  'Installation and integration of electrical components, wiring, cables, connectors, and related components according to specified requirements.':
    '根据特定要求安装和集成电气组件、布线、电缆、连接器和相关组件。',
  'Component Integration': '组件集成',
  'Integration of mechanical and electrical components into complete box build assemblies, following defined assembly procedures and customer specifications.':
    '将机械和电气组件集成为完整的整机装配，遵循定义的装配程序和客户规范。',
  'Final Assembly & Inspection': '最终装配与检查',
  'Final assembly and inspection to verify component installation, workmanship, configuration, and compliance with the required specifications.':
    '最终装配和检查以验证组件安装、工艺、配置以及是否符合所需规范。',
  'Complete Assembly from Components to Finished Products': '从组件到成品的完整装配',
  'Our box build capabilities support the integration of multiple components into complete assemblies, helping streamline the manufacturing process from individual parts to finished products. Each assembly is handled with attention to component fit, workmanship, configuration, and overall quality, with inspection and testing performed according to project requirements.':
    '我们的整机装配能力支持将多个组件集成为完整的装配件，帮助简化从单个零件到成品的制造过程。每件装配件都注重组件匹配、工艺、配置和整体质量，并根据项目要求进行检查和测试。',
  'ASSEMBLY CAPACITY / MONTH': '每月装配产能',
  'ASSEMBLY TYPES': '装配类型',
  'Quality Control': '质量控制',
  'Professional Surface Finishing Solutions': '专业的表面处理解决方案',
  'We provide surface finishing solutions to enhance the appearance, durability, and surface quality of manufactured components. Our finishing processes are selected according to material, application, appearance requirements, and customer specifications, helping deliver components with a consistent and professional finish.':
    '我们提供表面处理解决方案，以增强制造组件的外观、耐用性和表面质量。我们的表面处理工艺根据材料、应用、外观要求和客户规范进行选择，帮助交付具有一致和专业表面光洁度的组件。',
  'Surface Preparation': '表面准备',
  'Preparation of component surfaces to create a clean, uniform condition suitable for subsequent finishing processes and treatments.':
    '准备组件表面以创造清洁、均匀的状态，适合后续的表面处理工艺。',
  'Protective Finishing': '保护性表面处理',
  'Finishing processes designed to improve surface durability and provide additional protection against wear, environmental exposure, and application-specific conditions.':
    '旨在提高表面耐用性并提供针对磨损、环境暴露和特定应用条件的额外保护的表面处理工艺。',
  'Appearance & Surface Quality': '外观与表面质量',
  'Controlled finishing procesControlled finishing processes help achieve a consistent surface appearance and professional presentation across individual components and production batches.ses help maintain a uniform surface appearance and consistent quality across manufactured components and production batches.':
    '受控的表面处理工艺有助于在各个组件和生产批次中实现一致的表面外观和专业的展示效果，并保持一致的质量。',
  'Customer-Specified Finishes': '客户指定的表面处理',
  'Finishing requirements can be tailored to customer drawings and specifications, including required appearance, surface characteristics, and application needs.':
    '表面处理要求可根据客户的图纸和规格进行定制，包括所需的外观、表面特性和应用需求。',
  'Enhancing Surface Quality, Durability & Appearance': '提升表面质量、耐用性和外观',
  'Surface finishing is an essential stage in achieving the desired appearance and performance of fabricated and machined components. Our finishing capabilities support different production requirements, from surface preparation and treatment to final finishing, helping improve protection, consistency, and overall product presentation.':
    '表面处理是实现加工组件所需外观和性能的关键阶段。我们的表面处理能力支持不同的生产要求，从表面准备和处理到最终处理，帮助提高保护性、一致性和整体产品展示效果。',
  'Finishing Processes': '表面处理工艺',
  'Finishing Capacity / Month': '每月表面处理产能',
  'Material Compatibility': '材料兼容性',
  'Precision Steel Metal Fabrication': '精密钣金加工',
  'We provide precision sheet metal fabrication services for the production of custom components, enclosures, brackets, panels, and assemblies. From material preparation and cutting to forming, joining, and finishing, our fabrication processes are carried out according to customer drawings, technical specifications, and application requirements, with a strong focus on accuracy, durability, and consistent workmanship.':
    '我们提供精密的钣金加工服务，用于生产定制组件、外壳、支架、面板和装配件。从材料准备和切割到成型、连接和表面处理，我们的加工过程根据客户图纸、技术规范和应用要求进行，非常注重准确性、耐用性和一致的工艺。',
  'Precision Cutting': '精密切割',
  'Accurate cutting of sheet metal materials according to specified dimensions and component designs, preparing parts for subsequent fabrication processes.':
    '根据指定尺寸和组件设计准确切割钣金材料，为后续的加工工艺准备零件。',
  'Forming & Bending': '成型与折弯',
  'Controlled forming and bending processes create the required angles, profiles, and geometries while maintaining dimensional consistency throughout production.':
    '受控的成型和折弯工艺创造所需的角度、轮廓和几何形状，同时在整个生产过程中保持尺寸一致性。',
  'Welding & Joining': '焊接与连接',
  'Reliable joining of fabricated components to produce strong and durable assemblies according to engineering drawings and customer requirements.':
    '可靠地连接制造的组件，根据工程图纸和客户要求生产坚固耐用的装配件。',
  'Custom Fabrication': '定制制造',
  'Manufacturing of custom panels, brackets, enclosures, frames, and other sheet metal components to meet specific application and production requirements.':
    '制造定制的面板、支架、外壳、框架和其他钣金组件，以满足特定的应用和生产要求。',
  'From Sheet Metal to Finished Components': '从钣金到成品组件',
  'Our fabrication capabilities support the complete transformation of sheet metal into functional and precisely formed components. By combining controlled cutting, forming, joining, and finishing processes, we deliver fabricated parts and assemblies tailored to specific dimensions, designs, and production requirements.':
    '我们的制造能力支持将钣金完全转化为功能性且形状精确的组件。通过结合受控的切割、成型、连接和表面处理工艺，我们交付根据特定尺寸、设计和生产要求量身定制的制造零件和装配件。',
  'Material Thickness': '材料厚度',
  'XX mm': 'XX 毫米',
  'Fabrication Capacity  / Month': '每月加工产能',
  'Fabrication Processes': '加工工艺',
  'Bureau Veritas': '必维国际检验集团',
  'Quality Management System certification for precision manufacturing.': '精密制造质量管理体系认证。',
  "Lloyd's Register": '劳氏质量认证',
  'Aerospace Quality Management System standard.': '航空航天质量管理体系标准。',
  SGS: 'SGS通标标准技术服务',
  'Environmental Management System certification.': '环境管理体系认证。',
  'Top Precision Manufacturing Sdn Bhd is committed to consistently providing precision-engineered components and services that meet or exceed customer requirements. We achieve this through a robust ISO 9001:2015-certified quality management system, continuous employee development, and ongoing investment in state-of-the-art manufacturing technology.':
    'Top Precision Manufacturing Sdn Bhd致力于持续提供满足或超越客户要求的精密制造组件和服务。我们通过经过ISO 9001:2015认证的强大质量管理体系、持续的员工发展以及对最先进制造技术的持续投资来实现这一目标。',
  'Environmental Policy': '环境政策',
  'We are committed to conducting all manufacturing operations in an environmentally responsible manner. This includes minimising waste, reducing energy consumption, complying with all applicable environmental regulations, and continually improving our environmental performance.':
    '我们承诺以对环境负责的方式进行所有制造业务。这包括减少废弃物、降低能耗、遵守所有适用的环境法规，并不断改善我们的环境绩效。',
  'Health & Safety Policy': '健康与安全政策',
  'The health, safety, and welfare of our employees, contractors, and visitors is our highest priority. We maintain a safe working environment through regular risk assessments, safety training, and strict adherence to occupational safety and health regulations.':
    '员工、承包商和访客的健康、安全和福祉是我们的首要任务。我们通过定期的风险评估、安全培训和严格遵守职业安全与健康法规来维持安全的工作环境。',
  'CNC Machinist': 'CNC操作员',
  Manufacturing: '制造',
  'Bayan Lepas, Pulau Pinang': '槟城峇六拜',
  'Operate and program CNC machining centres (milling and turning).': '操作并对CNC加工中心（铣削和车削）进行编程。',
  'Diploma in Mechanical Engineering or equivalent. Fanuc/Siemens controller experience preferred.':
    '机械工程大专文凭或同等学历。优先考虑具有Fanuc/Siemens控制器经验者。',
  'Mechanical Assembly Technician': '机械装配技术员',
  'Responsible for assembling, fitting, and testing mechanical components and assemblies according to technical drawings, specifications, and quality standards.':
    '负责根据技术图纸、规范和质量标准组装、安装和测试机械组件及装配件。',
  'Dilpoma or Degree in Engineering or Manufacturing.': '工程或制造大专或学士学位。',
  'Electrical Assembly Technician': '电气装配技术员',
  'Responsible for assembling, wiring, and testing electrical components and systems according to technical drawings, specifications, and quality standa':
    '负责根据技术图纸、规范和质量标准组装、接线和测试电气组件及系统。',
  'Diploma or Degree in Electrical and related': '电气及相关专业大专或学士学位',
  'Quality Inspector': '质量检查员',
  'Maintain and improve the QMS. Conduct incoming inspection, in-process QC, and final inspection.':
    '维护和改进质量管理体系。进行进货检验、过程质量控制和最终检验。',
  'Degree in Engineering. ISO 9001 internal auditor experience preferred.':
    '工程学位。优先考虑具有ISO 9001内审员经验者。',
  'General Internship (Engineering / Ops)': '通用实习（工程/运营）',
  Internship: '实习',
  Various: '各种',
  'Hands-on internship programme covering CNC operations, quality control, and production planning.':
    '涵盖CNC操作、质量控制和生产计划的实操实习计划。',
  'Current students in Mechanical, Electrical, or related field.': '目前就读机械、电气或相关领域的学生。',
  'Established as a small tool-and-die workshop in Bayan Lepas, Pulau Pinang.': '在槟城峇六拜成立为一家小型模具车间。',
  Kindness: '善良',
  'Treating every customer, partner and colleague with integrity and goodwill. Honesty in every transaction to build long-term trust.':
    '以诚信和善意对待每一位客户、合作伙伴和同事。在每一次交易中保持诚实，以建立长期的信任。',
  Action: '行动',
  'Translating intent into measurable results. Delivering quality products and responsive service that bring real benefits to our clients and communities.':
    '将意图转化为可衡量的结果。交付优质的产品和响应迅速的服务，为我们的客户和社区带来真正的利益。',
  Learning: '学习',
  'Investing in technology, skills and processes to stay ahead of industry demands and offer ever-better solutions to our manufacturing partners.':
    '投资于技术、技能和工艺，以保持在行业需求的前沿，并为我们的制造合作伙伴提供更好的解决方案。',
  Success: '成功',
  'Our success is defined by the success of our clients. We are committed to growing together through innovation, reliability and mutual respect.':
    '我们的成功取决于客户的成功。我们致力于通过创新、可靠性和相互尊重共同成长。',
  'Comprehensive Engineering & <span class="accent">Manufacturing Solutions</span>':
    '全面的工程与 <span class="accent">制造解决方案</span>',
  'Your Trusted Partner in <span class="accent">Precision Manufacturing</span>':
    '您值得信赖的伙伴 <span class="accent">精密制造</span>',
  'Our Manufacturing <span class="accent">Services</span>': '我们的制造 <span class="accent">服务</span>',
  // ─── Fragments & Mismatches Fix ───
  'Vision, Mission &': '愿景、使命与',
  'Vision, Mission &amp;': '愿景、使命与',
  Company: '公司',
  'History & Milestones': '历史与里程碑',
  'History &amp; Milestones': '历史与里程碑',
  'Company History & Milestones': '公司历史与里程碑',
  'Company History &amp; Milestones': '公司历史与里程碑',
  'A Legacy of': '传承',
  Environmental: '环境',
  'Our Journey': '我们的历程',
  'What Drives Us': '驱动我们的力量',
  'Our Story': '我们的故事',
  'Core Values': '核心价值观',
  More: '更多',
  'CNC Machining & Precision Fabrication': 'CNC机加工与精密制造',
  'CNC Machining &amp; Precision Fabrication': 'CNC机加工与精密制造',
  'Our founding story, key achievements, and growth from tool shop to contract manufacturer.':
    '我们的创立故事、主要成就以及从模具车间到合同制造商的发展历程。',
  'ISO 9001, IATF 16949, ISO 13485, and other key milestones.': 'ISO 9001, IATF 16949, ISO 13485 及其他重要里程碑。',
  'Quality, EHS, ISMS, BCM, and RBA Commitments.': '质量、EHS、ISMS、BCM 及 RBA 承诺。',
  'Top Precision Quality Standards': 'Top Precision 质量标准',
  'Products & Projects': '产品与项目',
  'Products &amp; Projects': '产品与项目',
  "Explore a selection of precision-machined components, structural fabrications, and electro-mechanical assemblies we've delivered for our global clients.":
    '探索我们为全球客户交付的精密加工部件、结构件和机电装配件。',
  Locations: '办公地点',
  'Factory & Head Office': '工厂与总部',
  'Factory &amp; Head Office': '工厂与总部',
  'Terms of Use': '使用条款',
  'Admin Portal': '管理门户',
  'Top Precision Manufacturing — Shah Alam, Selangor': 'Top Precision Manufacturing — 雪兰莪莎阿南',
  'Company Policies': '公司政策',
  'Corporate Governance': '公司治理',
  'At Top Precision, our policies are the foundation of our operational excellence. We are firmly committed to upholding the highest standards of product quality, environmental stewardship, data security, and ethical business practices across our entire supply chain.':
    '在Top Precision，我们的政策是卓越运营的基石。我们坚定致力于在整个供应链中坚持产品质量、环境管理、数据安全和商业道德的最高标准。',
  'Aerospace Housing': '航空航天外壳',
  '5-Axis Aerospace Housing': '五轴航空航天外壳',
  'Material:': '材料:',
  'Titanium Grade 5': '5级钛合金',
  'Medical Manifold': '医疗管汇',
  'Diagnostic Fluid Manifold': '诊断流体管汇',
  PEEK: '聚醚醚酮 (PEEK)',
  'Semiconductor Flange': '半导体法兰',
  'Vacuum Chamber Flange': '真空腔体法兰',
  'Stainless Steel 316L': '316L不锈钢',
  'Capabilities & Specifications': '能力与规格',
  'Capabilities &amp; Specifications': '能力与规格',
  'Photo Gallery': '图片库',
  Inside: '内部',
  'The Floor': '车间',
  'A look inside our 45,000 sq ft production facility — where precision is engineered every day.':
    '一窥我们 45,000 平方英尺的生产基地——这里每天都在缔造精密。',
  '5-Axis Machining Cell': '五轴加工单元',
  'Cleanroom Assembly': '洁净室装配',
  'Precision Turning Cell': '精密车削单元',
  'Laser Cutting & Fabrication': '激光切割与加工',
  'Laser Cutting &amp; Fabrication': '激光切割与加工',
  'Skilled engineers & technicians': '熟练工程师与技术人员',
  'Skilled engineers &amp; technicians': '熟练工程师与技术人员',
  // ─── JSON Content Mismatches ───
  'Founded in 2024, Top Precision Manufacturing Sdn. Bhd. is a precision manufacturing company providing integrated fabrication, machining, assembly, and finishing solutions for industrial applications. We are committed to delivering quality-driven manufacturing services that meet customer requirements through reliable processes, skilled workmanship, and consistent production standards.':
    'Top Precision Manufacturing Sdn. Bhd. 成立于2024年，是一家精密制造公司，为工业应用提供综合的制造、机加工、装配和表面处理解决方案。我们致力于通过可靠的工艺、精湛的技术和一致的生产标准，提供满足客户要求的以质量为导向的制造服务。',
  'Our capabilities cover the manufacturing journey from material preparation and metal fabrication to precision CNC machining, surface finishing, assembly, inspection, and testing. By combining practical manufacturing expertise with a strong focus on quality and efficiency, we work closely with customers to transform technical requirements and designs into accurately manufactured components and finished assemblies.':
    '我们的能力涵盖了从材料准备和金属制造到精密CNC机加工、表面处理、装配、检查和测试的整个制造过程。通过将实用的制造专业知识与对质量和效率的高度重视相结合，我们与客户密切合作，将技术要求和设计转化为精确制造的组件和成品装配件。',
  'To be the leading precision manufacturer in Southeast Asia, delivering world-class engineering solutions that drive innovation across critical industries.':
    '成为东南亚领先的精密制造商，提供推动关键行业创新的世界级工程解决方案。',
  'To deliver precision-engineered components and sub-assemblies with uncompromising quality, on-time delivery, and a commitment to continuous improvement.':
    '以毫不妥协的质量、准时交货以及对持续改进的承诺，交付精密工程组件和子装配件。',
  'We recognize the importance of responsible manufacturing and strive to operate with greater awareness of environmental impact. Through efficient use of materials, responsible production practices, waste reduction, and continuous improvement of our processes, we aim to support more sustainable manufacturing while maintaining the quality and performance expected by our customers.':
    '我们认识到负责任制造的重要性，并努力在运营中提高对环境影响的认识。通过高效利用材料、负责任的生产实践、减少浪费以及不断改进我们的工艺，我们旨在支持更可持续的制造，同时保持客户所期望的质量和性能。',
  'Company Founded': '公司成立',
  'Top Precision Manufacturing Sdn Bhd (Edited)': 'Top Precision Manufacturing Sdn Bhd (已编辑)',
  'Precision. Engineered.': '精密. 制造.',
  'Automation & Robotics': '自动化与机器人',
  'Semiconductor & Electronics': '半导体与电子',
  'Automotive & New Energy': '汽车与新能源',
  'Medical & BioMedical': '医疗与生物医疗',
  'Aerospace & Precision': '航空航天与精密',
  'Industrial & Communication': '工业与通信',
  'Built for Precision. Designed for Production.': '为精密而生。为生产而设计。',
  'Complete machining workflow transforming raw material into finished components, with controlled production processes applied throughout each stage of manufacturing.':
    '将原材料转化为成品的完整加工工作流程，在制造的每个阶段均采用受控的生产工艺。',
  'CNC MACHINES': 'CNC加工中心',
  'MACHINING TOLERANCE': '机加工公差',
  '±0.00 mm': '±0.00 毫米',
  'WORKPIECE SIZE': '工件尺寸',
  '700 × 400 × 300 mm': '700 × 400 × 300 毫米',
  'Fabrication Capacity': '加工产能',
  '/ Month': '/ 月',
  '1 business day': '1个工作日',
  MATERIALS: '材料',
  'XX+': 'XX+',
  precision: '精密',
  integrity: '诚信',
  innovation: '创新',
  reliability: '可靠性',
  'Established': '成立年份',
  'Vision, Mission &': '愿景、使命与',
  'Vision, Mission &amp;': '愿景、使命与',
  'Company': '公司',
  'No environmental policy available.': '暂无环境政策。',
  'Advanced manufacturing solutions for aerospace & precision.': '针对航空航天与精密的先进制造解决方案。',
  'Advanced manufacturing solutions for automotive & new energy.': '针对汽车与新能源的先进制造解决方案。',
  'Advanced manufacturing solutions for automation & robotics.': '针对自动化与机器人的先进制造解决方案。',
  'Advanced manufacturing solutions for medical & biomedical.': '针对医疗与生物医疗的先进制造解决方案。',
  'Advanced manufacturing solutions for semiconductor & electronics.': '针对半导体与电子的先进制造解决方案。',
  'Advanced manufacturing solutions for industrial & communication.': '针对工业与通信的先进制造解决方案。',
  'Advanced manufacturing solutions for ': '针对以下行业的先进制造解决方案：',
  'Terms of Use': '使用条款',
  'Co. Reg. No.:': '公司注册号：',
  'SST Reg.:': 'SST注册号：',
  'N/A': '无',
  'Admin Portal': '管理员门户',
  'Explore Capability': '探索能力',
  'EXPLORE CAPABILITY': '探索能力',
  'Sheet Metal Enclosure & Box Build Integration': '钣金外壳与整机集成',
  'Sheet Metal Enclosure &amp; Box Build Integration': '钣金外壳与整机集成',
  'CNC Fabrication & Subtractive Machining': 'CNC加工与减材制造',
  'CNC Fabrication &amp; Subtractive Machining': 'CNC加工与减材制造',
  'Quality Inspection & Functional Testing': '质量检测与功能测试',
  'Quality Inspection &amp; Functional Testing': '质量检测与功能测试',
  'Manufacturing Capabilities': '制造能力',
  'We deliver comprehensive manufacturing solutions, combining advanced machining, precision fabrication, and expert assembly to meet the demanding requirements of our global clients.': '我们提供全面的制造解决方案，结合先进的机加工、精密制造和专业的装配，以满足全球客户的苛刻要求。',
  'Integrated sheet metal fabrication and electro-mechanical assembly, from raw material and enclosure fabrication to complete box build integration.': '集成的钣金制造和机电装配，从原材料和外壳制造到完整的整机集成。',
  'Precision CNC machining from digital design and raw material through controlled machining, post-processing, and quality verification.': '从数字设计和原材料开始，通过受控的机加工、后处理和质量验证，进行精密CNC加工。',
  'Comprehensive dimensional, electrical, and functional verification to ensure components and assemblies meet defined quality and performance requirements.': '全面的尺寸、电气和功能验证，以确保组件和装配件满足规定的质量和性能要求。',
  'Top Precision Manufacturing — Shah Alam, Selangor': 'Top Precision Manufacturing — 雪兰莪州莎阿南',
  'About Top Precision Manufacturing': '关于 Top Precision Manufacturing',
  'About Company': '关于公司',
  'Company overview, who we are, and our manufacturing capabilities.': '公司概况、我们的身份以及我们的制造能力。',
  'Company History & Milestones': '公司历史与里程碑',
  'Our founding story, key achievements, and growth from tool shop to contract manufacturer.': '我们的创立故事、主要成就以及从模具车间到合同制造商的发展历程。',
  'The principles driving every decision at Top Precision.': '推动 Top Precision 每一个决策的原则。',
  'Environmental Responsibility': '环境责任',
  'Our commitment to sustainable and responsible manufacturing practices.': '我们对可持续和负责任制造实践的承诺。',
  'CNC Machining & Precision Fabrication': 'CNC机加工与精密制造',
  'Top Precision Quality Standards': 'Top Precision 质量标准',
  'Quality Assurance': '质量保证',
  'Certifications': '资质认证',
  'ISO 9001, IATF 16949, ISO 13485, and other key milestones.': 'ISO 9001、IATF 16949、ISO 13485 及其他重要里程碑。',
  'Company Policies': '公司政策',
  'Quality, EHS, ISMS, BCM, and RBA Commitments.': '质量、EHS、ISMS、BCM 和 RBA 承诺。'
,
  "Overview": "概览",
  "Capability Details": "能力详情",
  "Home": "首页",
  "Capabilities": "能力",
  "About Us": "关于我们",
  "Services": "服务",
  "Quality": "质量",
  "Facilities": "设施",
  "Careers": "招贤纳士",
  "Contact": "联系我们",
  "Contact Us": "联系我们",
  "Materials Processed": "加工材料",
  "Request a Quote for This Service": "针对此服务请求报价",
  "Machine Specifications": "机器规格",
  "1 units listed": "列出 1 台设备",
  "2 units listed": "列出 2 台设备",
  "3 units listed": "列出 3 台设备",
  "4 units listed": "列出 4 台设备",
  "5 units listed": "列出 5 台设备",
  "Machine": "机器",
  "Brand / Model": "品牌 / 型号",
  "Axis": "轴",
  "Working Area": "工作范围",
  "Tolerance": "公差",
  "Qty": "数量",
  "You May Also Need": "您可能还需要",
  "Related Capabilities": "相关能力",
  "Primary Materials": "主要材料",
  "Core Fabrication Processes": "核心制造工艺",
  "Box Build Integration Steps": "整机集成步骤",
  "Core CNC Process Stages": "核心CNC加工阶段",
  "Machining Capability": "加工能力",
  "Dimensional Verification": "尺寸检测",
  "Electrical Safety Tests": "电气安全测试",
  "Functional Verification Stages": "功能验证阶段",
  "Dimensional Inspection": "尺寸检测",
  "Multi-Axis": "多轴",
  "CMM": "三坐标测量机",
  "Steel": "钢材",
  "Aluminium": "铝材",
  "Stainless Steel": "不锈钢",
  "CNC Machining Centre": "CNC加工中心",
  "Dimensional verification": "尺寸验证",
  "Insulation integrity / electrical safety": "绝缘完整性 / 电气安全",
  "Electrical continuity verification": "电气连通性验证",
  "Grounding safety verification": "接地安全验证",
  "Hi-Pot Tester": "耐压测试仪",
  "Continuity Tester": "连通性测试仪",
  "Ground Bond Tester": "接地电阻测试仪",
  "Confirm": "待确认",
  "We provide integrated sheet metal enclosure and box build solutions, transforming raw steel, aluminium, and stainless steel sheets into finished structural enclosures and electro-mechanical assemblies. Our process covers precision laser cutting, CNC bending, structural welding, surface finishing, and component integration to produce complete assemblies according to customer requirements.": "我们提供集成的钣金外壳和整机制造解决方案，将原钢、铝和不锈钢板材转化为成品结构外壳和机电装配件。我们的工艺涵盖精密激光切割、CNC折弯、结构焊接、表面处理和组件集成，以根据客户要求生产完整的装配件。",
  "The box build process extends beyond enclosure fabrication, incorporating internal hardware, PCBA mounting, wire harness routing, and final sealing where required. This integrated approach enables the transformation of fabricated chassis into complete electro-mechanical units through controlled fabrication and assembly processes.": "整机集成过程超出了外壳制造的范畴，包括内部硬件、PCBA安装、线束布线以及必要的最终密封。这种集成方法通过受控的制造和装配流程，将制造的机箱转化为完整的机电单元。",
  "Our CNC machining process transforms digital engineering designs and raw materials into precision-manufactured components through a controlled subtractive manufacturing workflow. The process begins with CAD model design and CAM programming, followed by machine setup, machining execution, post-processing, and quality control.": "我们的CNC机加工过程通过受控的减材制造工作流程，将数字工程设计和原材料转化为精密制造的组件。该过程从CAD模型设计和CAM编程开始，随后是机器设置、加工执行、后处理和质量控制。",
  "Through controlled milling and turning operations, material is progressively removed to produce the required component geometry and features. Machined parts then undergo deburring, cleaning, dimensional inspection, and applicable surface treatment before final release. This structured workflow supports accurate and consistent production from initial design through to finished components.": "通过受控的铣削和车削操作，逐步去除材料以生产所需的组件几何形状和特征。加工后的零件在最终放行前要经过毛刺去除、清洗、尺寸检测和适用的表面处理。这种结构化的工作流程支持从初始设计到成品组件的准确和一致的生产。",
  "Quality inspection and functional testing provide a critical verification stage within the manufacturing process. Our inspection workflow covers dimensional verification of manufactured components together with electrical safety and functional testing of completed electro-mechanical assemblies.": "质量检测和功能测试在制造过程中提供了关键的验证阶段。我们的检测工作流程涵盖了制造组件的尺寸验证，以及完整机电装配件的电气安全和功能测试。",
  "Inspection activities include dimensional verification using precision metrology equipment, while electrical testing can include high-potential (Hi-pot), continuity, and ground bond testing. Completed units can then undergo power-on and functional verification against defined design and operational requirements before final release.": "检测活动包括使用精密测量设备进行尺寸验证，而电气测试可包括高压（耐压）、连通性和接地连接测试。完整的单元在最终放行前，将根据规定的设计和操作要求进行通电和功能验证。",
  "From Raw Sheet Metal to Complete Electro-Mechanical Assemblies": "从钣金原材料到完整的机电装配件",
  "Our integrated process combines metal fabrication with box build assembly to deliver complete and functional assemblies. Fabricated chassis can be populated with internal hardware, PCBA mounting, and wire harnesses before final sealing and inspection.": "我们的集成工艺将金属制造与整机装配相结合，以交付完整且功能正常的装配件。制造好的机箱可以在最终密封和检查之前，安装内部硬件、PCBA和线束。",
  "From Digital Design to Precision-Manufactured Parts": "从数字设计到精密制造零件",
  "Our CNC process begins with the preparation and optimization of digital models before translating engineering designs into machine-readable toolpaths. Raw material is securely positioned and machined using controlled cutting operations, followed by post-processing and dimensional verification before part release.": "我们的CNC工艺从数字模型的准备和优化开始，然后将工程设计转换为机器可读的刀具路径。使用受控切割操作安全定位和加工原材料，在部件发布前进行后处理和尺寸验证。",
  "Verification from Component Accuracy to System Function": "从组件精度到系统功能的验证",
  "Our quality process combines dimensional inspection, electrical safety verification, and functional testing to evaluate both individual components and completed electro-mechanical assemblies. This provides structured verification before the finished product is released.": "我们的质量控制过程结合了尺寸检查、电气安全验证和功能测试，以评估单个组件和已完成的机电装配件。这在最终产品发布之前提供了结构化的验证。",

  // ─── Missing Translations Added ───
  "Admin Portal": "管理员门户",
  "Our Vision": "我们的愿景",
  "Our Mission": "我们的使命",
  "Our Journey": "我们的旅程",
  "Sustainability": "可持续性",
  "Our Story": "我们的故事",
  "A Legacy of": "传承",
  "What Drives Us": "我们的动力",
  "288 Pintasan Kampung Jawa 2, Lebuh Kampung Jawa, Zon Perindustrian Bebas, 11900 Bayan Lepas, Pulau Pinang, Malaysia": "马来西亚槟城州峇六拜11900，自由工业区，甘榜爪哇大道，288 Pintasan Kampung Jawa 2",
  "quality": "质量",
  "environment": "环境",
  "health-safety": "健康与安全",
  "cnc-machinist": "CNC机械师",
  "production-manager": "生产经理",
  "software-engineer": "软件工程师",
  "quality-engineer": "质量工程师",
  "internship": "实习",

  // ─── Site Content Edits Added ───
  "Mon - Fri: 8:00 AM - 5:30 PM\nSat - Sun: Closed": "周一 - 周五：上午 8:00 - 下午 5:30\n周六 - 周日：休息",
  "Industrial Equipment": "工业设备",
  "Fabricated and machined components for industrial equipment and manufacturing systems.": "用于工业设备和制造系统的加工部件。",
  "Electrical Enclosures": "电气外壳",
  "Custom fabricated enclosures and structures for housing electrical and industrial equipment.": "用于容纳电气和工业设备的定制加工外壳和结构。",
  "Precision Components": "精密组件",
  "CNC-machined components produced according to customer drawings and technical requirements.": "根据客户图纸和技术要求生产的CNC加工部件。",
  "Custom Assemblies": "定制装配",
  "Integrated mechanical and electrical assemblies combining fabricated structures and internal components.": "结合了制造结构和内部组件的集成机电装配。",
  "Precision CNC machining for custom components, complex parts, and industrial applications.": "用于定制组件、复杂零件和工业应用的精密CNC加工。",
  "Top Precision Manufacturing provides CNC machining solutions for producing custom precision components from raw material. Our capability supports components with complex geometries and detailed features through controlled CNC machining operations.\n\nWe work with digital designs and machining requirements to produce components according to specified dimensions and geometries. Our CNC capability is suitable for custom parts and industrial components where controlled machining and repeatable production are required.": "Top Precision Manufacturing 提供从原材料生产定制精密部件的 CNC 加工解决方案。我们的能力通过受控的 CNC 加工操作支持具有复杂几何形状和详细特征的组件。\n\n我们根据数字设计和加工要求生产符合指定尺寸和几何形状的组件。我们的 CNC 能力适用于需要受控加工和可重复生产的定制零件和工业组件。",
  "Precision Machining for Complex Components": "复杂组件的精密加工",
  "Our CNC machining capability supports custom components requiring controlled material removal and accurate reproduction of complex geometries. The machining approach considers component design, raw material, machining requirements, and finishing requirements to produce parts according to customer specifications.": "我们的 CNC 加工能力支持需要受控材料去除和复杂几何形状精确再现的定制组件。加工方法考虑了组件设计、原材料、加工要求和精加工要求，以根据客户规格生产零件。",
  "Precision material removal for producing detailed component geometries, profiles, holes, pockets, and other machined features.": "精密的材料去除，用于生产详细的组件几何形状、轮廓、孔、型腔和其他加工特征。",
  "CNC Turning": "CNC车削",
  "Machining of cylindrical and rotational components according to required dimensions and component geometry.": "根据所需的尺寸和组件几何形状加工圆柱形和旋转部件。",
  "Multi-Axis Machining": "多轴加工",
  "Machining operations involving multiple machining directions for components with more complex geometries and features.": "涉及多个加工方向的加工操作，用于具有更复杂几何形状和特征的组件。",
  "Custom CNC Components": "定制CNC部件",
  "Production of custom machined components based on customer drawings, CAD models, and technical requirements.": "根据客户图纸、CAD模型和技术要求生产定制加工部件。",
  "Plastic": "塑料",
  "Cooper": "铜",
  "Cast Iron": "铸铁",
  "Maximum Product Size": "最大产品尺寸",
  "Brother": "Brother (兄弟)",
  "3 axis": "3轴",
  "3  axis": "3轴",
  "Integrated assembly of mechanical and electrical components into complete industrial enclosures and equipment assemblies, including AOI (Automated Optical Inspection) machines.": "将机电组件集成装配成完整的工业外壳和设备组装，包括 AOI（自动光学检测）机器。",
  "Top Precision Manufacturing provides box build assembly solutions for industrial equipment and electrical enclosure applications, with extensive experience in assembling AOI (Automated Optical Inspection) systems. Our capability supports the integration of fabricated structures, mechanical components, electrical hardware, PCB assemblies, and wiring into complete assemblies based on customer requirements.\n\nOur box build capability brings multiple components and sub-assemblies together within a structured enclosure or equipment assembly. This provides customers with an integrated manufacturing solution for products requiring both mechanical construction and electrical component integration.": "Top Precision Manufacturing 为工业设备和电气外壳应用提供整机装配解决方案，在组装 AOI（自动光学检测）系统方面拥有丰富经验。我们的能力支持根据客户要求将制造结构、机械组件、电气硬件、PCB 组件和布线集成到完整的装配中。\n\n我们的整机装配能力将多个组件和子装配汇集在一个结构化的外壳或设备装配中。这为需要机械构造和电气组件集成的产品为客户提供了一个集成的制造解决方案。",
  "Integrated Assembly for Complete Equipment": "完整设备的集成装配",
  "Box build assembly combines fabricated structures and individual components into complete equipment or enclosure assemblies. Our capability supports the organized installation of mechanical hardware, PCB assemblies, electrical components, and wiring to create a structured finished unit according to the required configuration.": "整机装配将制造的结构和单个组件结合成完整的设备或外壳装配。我们的能力支持有序安装机械硬件、PCB 组件、电气组件和布线，以根据所需的配置创建结构化的成品单元。",
  "Integration of fabricated structures, brackets, mounting hardware, DIN rails, standoffs, and other mechanical components.": "集成制造的结构、支架、安装硬件、DIN 导轨、支柱和其他机械组件。",
  "Electrical Integration": "电气集成",
  "Installation and integration of electrical components and supporting hardware within industrial equipment and enclosure structures.": "在工业设备和外壳结构中安装和集成电气组件和支持硬件。",
  "PCBA Mounting": "PCBA安装",
  "Mounting and integration of printed circuit board assemblies within the enclosure according to the required configuration.": "根据所需的配置在机箱内安装和集成印刷电路板组件。",
  "Cable Routing & Enclosure Assembly": "电缆布线和外壳组装",
  "Organized routing of wiring and installation of enclosure covers, panels, gaskets, and supporting components.": "有组织的布线布线和安装外壳盖、面板、垫圈和支持组件。",
  "Core Assembly Capabilities": "核心装配能力",
  "Multi-Component": "多组件",
  "Top Precision Manufacturing Sdn. Bhd. was established.": "Top Precision Manufacturing Sdn. Bhd. 成立。",
  "March 2025": "2025年3月",
  "Operations Commenced": "开始运营",
  "Manufacturing operations commenced in Bayan Lepas Free Industrial Zone (FIZ), Penang, Malaysia.": "在马来西亚槟城峇六拜自由工业区（FIZ）开始制造业务。",
  "From Design to <span class=\"accent\">Manufacturing</span>": "从设计到<span class=\"accent\">制造</span>",
  "We transform customer designs and manufacturing requirements into practical fabricated, machined, and assembled products. Our capabilities cover CNC machining, sheet metal fabrication, and box build assembly, allowing us to support different stages of industrial product manufacturing.": "我们将客户的设计和制造要求转化为实际的加工和装配产品。我们的能力涵盖CNC加工、钣金制造和整机装配，使我们能够支持工业产品制造的不同阶段。",
  "Design-Based Manufacturing": "基于设计的制造",
  "Production based on customer drawings, CAD models, and specified requirements.": "根据客户图纸、CAD模型和指定要求进行生产。",
  "Custom Manufacturing": "定制制造",
  "Solutions for components and assemblies designed around individual application requirements.": "围绕个别应用要求设计的组件和装配的解决方案。",
  "Integrated Capabilities": "集成能力",
  "Combination of machining, fabrication, and assembly capabilities to support more complete manufacturing requirements.": "结合加工、制造和装配能力，以支持更完整的制造要求。",
  "Advanced CNC Machining": "先进的CNC加工",
  "Complex geometries held to +/-X.XXXXmm — every time.": "复杂几何形状始终保持在 +/-X.XXXXmm。",
  "Quality Certified": "质量认证",
  "In-House DFM Review": "内部DFM审查",
  "Resident engineers review drawings before cutting begins.": "驻厂工程师在切割前审查图纸。",
  "Top Precision Manufacturing Sdn. Bhd. is a precision manufacturing company based in Bayan Lepas, Penang, specializing in CNC machining, sheet metal fabrication, and box build assembly for industrial applications.": "Top Precision Manufacturing Sdn. Bhd. 是一家位于槟城峇六拜的精密制造公司，专注于工业应用的CNC加工、钣金制造和整机装配。",
  "Our capabilities cover the manufacturing of precision machined parts, fabricated sheet metal components, industrial enclosures, and electro-mechanical assemblies. We support customer requirements from individual components to more complete fabricated and assembled products, based on drawings, designs, specifications, and application requirements.\n\nLocated within the Bayan Lepas Free Industrial Zone, Top Precision Manufacturing operates in one of Penang's established industrial manufacturing areas, with a focus on supporting industrial equipment and related manufacturing applications.": "我们的能力涵盖精密加工零件、加工钣金组件、工业外壳和机电组件的制造。我们根据图纸、设计、规格和应用要求，支持从单个组件到更完整的加工和组装产品的客户需求。\n\nTop Precision Manufacturing 位于峇六拜自由工业区内，在槟城成熟的工业制造区之一运营，专注于支持工业设备和相关制造应用。",
  "CNC Machining: Precision machining of custom components and complex parts using CNC milling and turning processes.\n\nSheet Metal Fabrication: Fabrication of industrial enclosures, panels, chassis, brackets, and custom sheet metal components.\n\nBox Build Assembly: Integration of fabricated structures, mechanical components, electrical hardware, PCB assemblies, and wiring into complete assemblies.": "CNC加工：使用CNC铣削和车削工艺精密加工定制组件和复杂零件。\n\n钣金制造：制造工业外壳、面板、底盘、支架和定制钣金组件。\n\n整机装配：将加工结构、机械组件、电气硬件、PCB 组件和布线集成到完整的装配中。"
};

const originalTexts = new WeakMap();

window.setLang = function (lang) {
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-lang') === lang);
  });
  localStorage.setItem('preferredLang', lang);

  translateNode(document.body, lang);
};

function translateNode(node, lang) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.nodeValue.trim();
    if (!text) return;

    let orig = originalTexts.get(node);
    if (!orig) {
      orig = text;
      originalTexts.set(node, orig);
    }

    if (lang === 'zh') {
      const trans = window.translations[orig];
      if (trans) {
        node.nodeValue = node.nodeValue.replace(text, trans);
      }
    } else {
      // Restore to original English
      node.nodeValue = node.nodeValue.replace(text, orig);
    }
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    if (['SCRIPT', 'STYLE'].includes(node.tagName)) return;

    // Input placeholders
    if (node.hasAttribute('placeholder')) {
      const ph = node.getAttribute('placeholder').trim();
      let orig = originalTexts.get(node);
      if (!orig) {
        orig = ph;
        originalTexts.set(node, orig);
      }
      if (lang === 'zh') {
        const trans = window.translations[orig];
        if (trans) node.setAttribute('placeholder', trans);
      } else {
        node.setAttribute('placeholder', orig);
      }
    }

    // Image alt text
    if (node.tagName === 'IMG' && node.hasAttribute('alt')) {
      const alt = node.getAttribute('alt').trim();
      let orig = originalTexts.get(node);
      if (!orig) {
        orig = alt;
        originalTexts.set(node, orig);
      }
      if (lang === 'zh') {
        const trans = window.translations[orig];
        if (trans) node.setAttribute('alt', trans);
      } else {
        node.setAttribute('alt', orig);
      }
    }

    node.childNodes.forEach(child => translateNode(child, lang));
  }
}

// Automatically apply saved language on load, after dynamic templates are injected
document.addEventListener('DOMContentLoaded', () => {
  const checkInterval = setInterval(() => {
    const header = document.getElementById('site-header');
    const footer = document.querySelector('footer');
    if (header && footer) {
      clearInterval(checkInterval);
      const preferredLang = localStorage.getItem('preferredLang') || 'en';
      window.setLang(preferredLang);
    }
  }, 50);

  // Timeout safety — clear after 3s to avoid infinite loop
  setTimeout(() => clearInterval(checkInterval), 3000);
});
