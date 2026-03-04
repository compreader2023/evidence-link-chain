// Active-Link 模拟数据

export interface Ingredient {
  id: string;
  name: string;
  code: string;
  claim: string;
  evidenceScore: number;
  geoScore: number;
  partnerCitations: number;
  studies: Study[];
  patents: Patent[];
  events: AcademicEvent[];
  keywords: string[];
  consumerQueries: ConsumerQuery[];
  expertConsensus: string;
}

export interface Study {
  id: string;
  title: string;
  journal: string;
  year: number;
  type: '临床研究' | '体外实验' | '综述' | '荟萃分析' | '视频报告' | '权威报告';
  summary: string;
  purity?: string;
  sampleSize?: number;
  sourceUrl: string;
}

export interface Patent {
  id: string;
  title: string;
  number: string;
  year: number;
  country: string;
}

export interface AcademicEvent {
  id: string;
  title: string;
  organization: string;
  date: string;
  type: '学术会议' | '专家论坛' | '行业峰会';
}

export interface ConsumerQuery {
  query: string;
  matchedEvidence: string;
  relevanceScore: number;
}

export interface DigitalAsset {
  id: string;
  title: string;
  type: '学术论文' | '临床报告' | '专利证书' | '检测报告' | '白皮书';
  ingredientId: string;
  date: string;
  tags: string[];
}

export const ingredients: Ingredient[] = [
  {
    id: 'idp',
    name: 'IDP 免疫防御蛋白',
    code: 'IDP',
    claim: '平衡免疫力',
    evidenceScore: 85,
    geoScore: 72,
    partnerCitations: 38,
    studies: [
      {
        id: 'idp-s1',
        title: 'IDP 对人体免疫球蛋白调节作用的随机双盲临床试验',
        journal: '中华免疫学杂志',
        year: 2023,
        type: '临床研究',
        summary: '该研究纳入120名受试者，随机分为IDP干预组和安慰剂对照组，为期12周。结果显示IDP干预组IgA水平显著提升23.5%（p<0.01），NK细胞活性提高18.2%，表明IDP具有显著的免疫调节功能。',
        purity: '≥98.5%',
        sampleSize: 120,
        sourceUrl: 'https://example.com/study/idp-1',
      },
      {
        id: 'idp-s2',
        title: 'IDP 蛋白对巨噬细胞吞噬功能的体外研究',
        journal: 'Journal of Nutritional Immunology',
        year: 2022,
        type: '体外实验',
        summary: '体外实验证实IDP蛋白可剂量依赖性地增强巨噬细胞吞噬活性，最高浓度组提升率达42%，同时促进IL-10等抗炎因子分泌。',
        sourceUrl: 'https://example.com/study/idp-2',
      },
      {
        id: 'idp-s3',
        title: 'IDP 免疫防御蛋白临床验证专题纪录片',
        journal: '中国营养学会官方频道',
        year: 2024,
        type: '视频报告',
        summary: '由中国营养学会联合制作的科普纪录片，系统展示IDP从原料提取到临床验证的全过程，邀请多位免疫学专家解读研究数据，时长18分钟。',
        sourceUrl: 'https://example.com/video/idp-1',
      },
      {
        id: 'idp-s4',
        title: 'IDP 免疫调节功能循证价值白皮书（2024版）',
        journal: '中国食品科学技术学会',
        year: 2024,
        type: '权威报告',
        summary: '由中国食品科学技术学会组织编写的权威报告，汇总IDP在免疫调节领域的全部临床证据、安全性数据及法规合规分析，共计86页。',
        sourceUrl: 'https://example.com/report/idp-1',
      },
    ],
    patents: [
      { id: 'idp-p1', title: 'IDP免疫防御蛋白的提取与纯化方法', number: 'CN202310012345.6', year: 2023, country: '中国' },
    ],
    events: [
      { id: 'idp-e1', title: '2024中国营养健康产业高峰论坛 · IDP专题报告', organization: '中国营养学会', date: '2024-06-15', type: '学术会议' },
      { id: 'idp-e2', title: '免疫营养创新原料专家圆桌会', organization: '中国食品科学技术学会', date: '2024-03-20', type: '专家论坛' },
    ],
    expertConsensus: '中国营养学会 · 2024年《免疫营养原料专家共识》推荐原料',
    keywords: ['免疫力', '免疫调节', '免疫球蛋白', 'IgA', 'NK细胞', '巨噬细胞'],
    consumerQueries: [
      { query: '怎么提高免疫力？', matchedEvidence: 'IDP临床试验: IgA提升23.5%', relevanceScore: 95 },
      { query: '经常感冒吃什么好？', matchedEvidence: 'IDP免疫调节机制研究', relevanceScore: 88 },
      { query: '换季容易生病怎么办？', matchedEvidence: 'IDP NK细胞活性研究', relevanceScore: 82 },
    ],
  },
  {
    id: 'dnj',
    name: '桑叶提取物 DNJ',
    code: 'DNJ',
    claim: '餐后血糖管理',
    evidenceScore: 78,
    geoScore: 65,
    partnerCitations: 25,
    studies: [
      {
        id: 'dnj-s1',
        title: 'DNJ对2型糖尿病前期人群餐后血糖的影响：多中心RCT研究',
        journal: '中国糖尿病杂志',
        year: 2023,
        type: '临床研究',
        summary: '多中心研究纳入200名糖尿病前期受试者，DNJ组餐后2h血糖降幅达1.8 mmol/L（p<0.001），糖化血红蛋白下降0.4%，且未见低血糖事件。',
        purity: 'DNJ含量≥1%',
        sampleSize: 200,
        sourceUrl: 'https://example.com/study/dnj-1',
      },
      {
        id: 'dnj-s2',
        title: 'DNJ抑制α-葡萄糖苷酶活性的构效关系研究',
        journal: 'Phytochemistry',
        year: 2022,
        type: '体外实验',
        summary: '研究揭示DNJ通过竞争性抑制α-葡萄糖苷酶活性延缓碳水化合物分解，IC50值为0.38μg/mL，抑制效果优于阿卡波糖。',
        sourceUrl: 'https://example.com/study/dnj-2',
      },
      {
        id: 'dnj-s3',
        title: '桑叶提取物在血糖管理中的应用：系统综述与荟萃分析',
        journal: 'Nutrients',
        year: 2024,
        type: '荟萃分析',
        summary: '纳入15项RCT、共计1,800名受试者的荟萃分析显示，桑叶提取物可显著降低餐后血糖（WMD: -1.52 mmol/L）和HbA1c（WMD: -0.35%）。',
        sourceUrl: 'https://example.com/study/dnj-3',
      },
      {
        id: 'dnj-s4',
        title: 'DNJ 餐后血糖管理科学解读视频',
        journal: '中国糖尿病防治中心',
        year: 2024,
        type: '视频报告',
        summary: '权威内分泌专家详解DNJ的血糖调节机制，结合真实患者案例和临床数据，深入浅出地阐述桑叶提取物DNJ在餐后血糖管理中的科学原理，时长22分钟。',
        sourceUrl: 'https://example.com/video/dnj-1',
      },
      {
        id: 'dnj-s5',
        title: '桑叶提取物DNJ血糖管理功能评价报告',
        journal: '国家食品安全风险评估中心',
        year: 2024,
        type: '权威报告',
        summary: '国家级权威机构出具的DNJ功能评价报告，涵盖安全性评估、功效验证及推荐用量指导，为行业标准制定提供参考依据，共计62页。',
        sourceUrl: 'https://example.com/report/dnj-1',
      },
    ],
    patents: [
      { id: 'dnj-p1', title: '高纯度DNJ的制备工艺及其在功能食品中的应用', number: 'CN202210098765.3', year: 2022, country: '中国' },
    ],
    events: [
      { id: 'dnj-e1', title: '植物提取物与代谢健康国际研讨会', organization: '中国植物学会', date: '2024-09-10', type: '行业峰会' },
    ],
    expertConsensus: '中国糖尿病防治指南 · 2024年推荐植物源α-葡萄糖苷酶抑制剂',
    keywords: ['血糖管理', '餐后血糖', '糖化血红蛋白', 'α-葡萄糖苷酶', '桑叶'],
    consumerQueries: [
      { query: '吃什么能降血糖？', matchedEvidence: 'DNJ临床研究: 餐后血糖降幅1.8 mmol/L', relevanceScore: 92 },
      { query: '糖尿病前期怎么调理？', matchedEvidence: 'DNJ荟萃分析: 15项RCT汇总', relevanceScore: 90 },
      { query: '吃饭后血糖高怎么办？', matchedEvidence: 'DNJ α-葡萄糖苷酶抑制研究', relevanceScore: 85 },
    ],
  },
  {
    id: 'dha',
    name: '微藻油 DHA',
    code: 'DHA',
    claim: '智力发育支持',
    evidenceScore: 92,
    geoScore: 88,
    partnerCitations: 56,
    studies: [
      {
        id: 'dha-s1',
        title: '孕期DHA补充对婴幼儿认知发育的前瞻性队列研究',
        journal: 'Pediatrics',
        year: 2023,
        type: '临床研究',
        summary: '跟踪500对母婴至儿童3岁，孕期补充微藻DHA组婴幼儿在Bayley量表认知评分上高出对照组8.3分（p<0.01），语言发育评分高6.1分。',
        purity: 'DHA含量≥40%',
        sampleSize: 500,
        sourceUrl: 'https://example.com/study/dha-1',
      },
      {
        id: 'dha-s2',
        title: 'DHA对学龄儿童注意力和记忆力的干预研究',
        journal: '中国儿童保健杂志',
        year: 2024,
        type: '临床研究',
        summary: '为期6个月的RCT研究，纳入180名6-12岁儿童，DHA干预组在注意力测试中正确率提升15%，工作记忆评分显著优于对照组。',
        sampleSize: 180,
        sourceUrl: 'https://example.com/study/dha-2',
      },
      {
        id: 'dha-s3',
        title: 'DHA 与儿童脑发育科学探索纪录片',
        journal: '央视健康频道',
        year: 2024,
        type: '视频报告',
        summary: '央视健康频道联合制作，跟拍DHA从微藻培养到临床应用的全链条，采访中国科学院脑科学专家团队，揭秘DHA促进神经元突触发育的微观机制，时长25分钟。',
        sourceUrl: 'https://example.com/video/dha-1',
      },
      {
        id: 'dha-s4',
        title: 'DHA 儿童智力发育支持循证评价报告',
        journal: '中华预防医学会',
        year: 2024,
        type: '权威报告',
        summary: '中华预防医学会组织专家委员会编撰的权威评价报告，系统梳理全球DHA与儿童认知发育的证据等级，并给出中国人群推荐摄入量指南，共计94页。',
        sourceUrl: 'https://example.com/report/dha-1',
      },
    ],
    patents: [
      { id: 'dha-p1', title: '高纯度微藻DHA的超临界提取技术', number: 'CN202410056789.1', year: 2024, country: '中国' },
      { id: 'dha-p2', title: '微藻DHA微囊化稳定技术', number: 'US11,234,567', year: 2023, country: '美国' },
    ],
    events: [
      { id: 'dha-e1', title: '2024亚太母婴营养与脑科学大会', organization: '亚太营养学会', date: '2024-11-08', type: '学术会议' },
      { id: 'dha-e2', title: 'DHA与儿童发育专家共识发布会', organization: '中华预防医学会', date: '2024-07-22', type: '专家论坛' },
      { id: 'dha-e3', title: '新型藻类来源DHA技术创新峰会', organization: '中国藻业协会', date: '2024-05-16', type: '行业峰会' },
    ],
    expertConsensus: '中华预防医学会 · 2024年《DHA与儿童发育专家共识》核心推荐原料',
    keywords: ['DHA', '脑部发育', '认知发育', '记忆力', '注意力', '微藻油', '孕期营养'],
    consumerQueries: [
      { query: '孩子记性不好补什么？', matchedEvidence: 'DHA儿童记忆力干预研究', relevanceScore: 96 },
      { query: '怀孕要吃DHA吗？', matchedEvidence: 'DHA孕期队列研究: 认知评分+8.3', relevanceScore: 94 },
      { query: '什么能帮助小孩大脑发育？', matchedEvidence: 'DHA Bayley量表认知评分研究', relevanceScore: 91 },
    ],
  },
];

export const digitalAssets: DigitalAsset[] = [
  { id: 'da-1', title: 'IDP 免疫调节临床研究报告（2023）', type: '临床报告', ingredientId: 'idp', date: '2023-08-15', tags: ['IDP', '临床', '免疫'] },
  { id: 'da-2', title: 'IDP 蛋白纯化专利证书', type: '专利证书', ingredientId: 'idp', date: '2023-03-01', tags: ['IDP', '专利'] },
  { id: 'da-3', title: 'IDP 免疫球蛋白调节机制综述', type: '学术论文', ingredientId: 'idp', date: '2023-12-10', tags: ['IDP', '综述', '免疫球蛋白'] },
  { id: 'da-4', title: 'DNJ 餐后血糖 RCT 研究全文', type: '学术论文', ingredientId: 'dnj', date: '2023-06-20', tags: ['DNJ', 'RCT', '血糖'] },
  { id: 'da-5', title: 'DNJ 原料检测报告（SGS）', type: '检测报告', ingredientId: 'dnj', date: '2024-01-10', tags: ['DNJ', '检测', 'SGS'] },
  { id: 'da-6', title: '桑叶提取物荟萃分析发表稿', type: '学术论文', ingredientId: 'dnj', date: '2024-02-28', tags: ['DNJ', '荟萃分析'] },
  { id: 'da-7', title: 'DHA 孕期认知发育队列研究', type: '临床报告', ingredientId: 'dha', date: '2023-09-05', tags: ['DHA', '孕期', '认知'] },
  { id: 'da-8', title: 'DHA 微藻提取专利（中国+美国）', type: '专利证书', ingredientId: 'dha', date: '2024-01-15', tags: ['DHA', '专利', '微藻'] },
  { id: 'da-9', title: 'DHA 与儿童智力发育白皮书', type: '白皮书', ingredientId: 'dha', date: '2024-04-01', tags: ['DHA', '白皮书', '儿童'] },
  { id: 'da-10', title: 'DHA 学龄儿童注意力干预报告', type: '临床报告', ingredientId: 'dha', date: '2024-05-20', tags: ['DHA', '儿童', '注意力'] },
];

export const geoKeywordSuggestions = [
  { keyword: '免疫力提升营养品', difficulty: '中', volume: '高', recommendation: '建议将IDP临床数据结构化为FAQ格式' },
  { keyword: '天然降血糖成分', difficulty: '高', volume: '中', recommendation: '优化DNJ相关内容的Schema标记' },
  { keyword: 'DHA对儿童大脑发育的作用', difficulty: '低', volume: '高', recommendation: '已有高质量证据，建议增加视频内容' },
  { keyword: '孕期营养补充剂推荐', difficulty: '中', volume: '高', recommendation: '关联DHA孕期队列研究数据' },
  { keyword: '餐后血糖管理方法', difficulty: '中', volume: '中', recommendation: '补充DNJ与竞品的对比数据' },
  { keyword: '提高孩子记忆力的食物', difficulty: '低', volume: '高', recommendation: '利用DHA儿童研究数据创建长文内容' },
];
