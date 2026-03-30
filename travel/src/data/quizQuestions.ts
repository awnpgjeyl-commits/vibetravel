interface QuizQuestion {
  id: string;
  question: string;
  type?: 'text-input';
  placeholder?: string;
  tags?: string[];
  imageKeyword?: string;
  options?: {
    id: string;
    text: string;
    tags: string[];
    imageKeyword: string;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: '想象一下你的理想假期，你最渴望的是什么？',
    options: [
      {
        id: 'q1-a',
        text: '彻底放松，什么都不做，享受宁静',
        tags: ['relax', 'slow-pace', 'wellness', 'introverted', 'comfort', 'nature', 'beach'],
        imageKeyword: 'relaxing vacation'
      },
      {
        id: 'q1-b',
        text: '探索未知，挑战自我，体验肾上腺素飙升的刺激',
        tags: ['adventure', 'fast-pace', 'challenge', 'extroverted', 'thrill', 'nature', 'mountain'],
        imageKeyword: 'adventure travel'
      },
      {
        id: 'q1-c',
        text: '沉浸当地文化，与人交流，品尝地道美食',
        tags: ['culture', 'social', 'foodie', 'learning', 'urban', 'history'],
        imageKeyword: 'cultural travel'
      },
      {
        id: 'q1-d',
        text: '艺术与历史的熏陶，参观博物馆和古迹',
        tags: ['art', 'history', 'learning', 'culture', 'quiet', 'urban'],
        imageKeyword: 'art museum'
      }
    ]
  },
  {
    id: 'q2',
    question: '对于旅行预算，你的态度是？',
    options: [
      {
        id: 'q2-a',
        text: '精打细算，追求性价比，把钱花在刀刃上',
        tags: ['budget', 'practical', 'independent'],
        imageKeyword: 'budget travel'
      },
      {
        id: 'q2-b',
        text: '该省省，该花花，体验与舒适并重',
        tags: ['balanced', 'comfort', 'flexible'],
        imageKeyword: 'comfortable travel'
      },
      {
        id: 'q2-c',
        text: '享受奢华，追求极致体验，预算不是问题',
        tags: ['luxury', 'indulgence', 'premium', 'comfort'],
        imageKeyword: 'luxury travel'
      }
    ]
  },
  {
    id: 'q3',
    question: '你更倾向于和谁一起旅行？',
    options: [
      {
        id: 'q3-a',
        text: '独自一人，享受自由与独处',
        tags: ['solo', 'independent', 'introspective'],
        imageKeyword: 'solo traveler'
      },
      {
        id: 'q3-b',
        text: '与伴侣或好友，分享快乐与经历',
        tags: ['couple', 'friends', 'social', 'shared-experience'],
        imageKeyword: 'friends traveling'
      },
      {
        id: 'q3-c',
        text: '全家出游，创造温馨的亲子时光',
        tags: ['family', 'group', 'bonding', 'child-friendly'],
        imageKeyword: 'family vacation'
      }
    ]
  },
  {
    id: 'q4',
    question: '哪种自然风光最能触动你的心弦？',
    options: [
      {
        id: 'q4-a',
        text: '阳光普照的沙滩与蔚蓝大海',
        tags: ['beach', 'ocean', 'relax', 'warm', 'scenic'],
        imageKeyword: 'sunny beach'
      },
      {
        id: 'q4-b',
        text: '壮丽的山脉、森林与湖泊',
        tags: ['nature', 'mountain', 'forest', 'serene', 'active'],
        imageKeyword: 'mountain landscape'
      },
      {
        id: 'q4-c',
        text: '广袤无垠的沙漠或神秘的峡谷',
        tags: ['desert', 'unique-landscape', 'adventure', 'quiet'],
        imageKeyword: 'desert landscape'
      },
      {
        id: 'q4-d',
        text: '冰雪覆盖的极地风光或北欧峡湾',
        tags: ['cold', 'unique-landscape', 'adventure', 'scenic'],
        imageKeyword: 'arctic landscape'
      }
    ]
  },
  {
    id: 'q5',
    question: '在旅途中，你对"吃"的优先级是？',
    options: [
      {
        id: 'q5-a',
        text: '简单果腹即可，不追求特色',
        tags: ['practical', 'simple-food'],
        imageKeyword: 'simple meal'
      },
      {
        id: 'q5-b',
        text: '尝试当地特色小吃，体验风土人情',
        tags: ['foodie', 'local-cuisine', 'culture', 'adventurous-eater'],
        imageKeyword: 'street food'
      },
      {
        id: 'q5-c',
        text: '寻找米其林餐厅或高级料理，享受美食艺术',
        tags: ['luxury', 'gourmet', 'fine-dining', 'foodie'],
        imageKeyword: 'fine dining'
      }
    ]
  },
  {
    id: 'q6',
    question: '面对旅行中的突发状况，你的反应是？',
    options: [
      {
        id: 'q6-a',
        text: '提前规划，尽量避免意外，不喜欢变化',
        tags: ['planner', 'cautious', 'organized'],
        imageKeyword: 'travel planning'
      },
      {
        id: 'q6-b',
        text: '随遇而安，灵活应对，享受不确定性',
        tags: ['flexible', 'spontaneous', 'adaptable'],
        imageKeyword: 'spontaneous travel'
      },
      {
        id: 'q6-c',
        text: '寻求帮助，相信总有解决办法',
        tags: ['resourceful', 'community', 'problem-solver'],
        imageKeyword: 'travel help'
      }
    ]
  },
  {
    id: 'q7',
    question: '旅行结束后，你最希望带回家的"纪念品"是？',
    options: [
      {
        id: 'q7-a',
        text: '精美的当地手工艺品或特色商品',
        tags: ['souvenir', 'shopping', 'culture'],
        imageKeyword: 'local crafts'
      },
      {
        id: 'q7-b',
        text: '独特的照片和视频，记录美好瞬间',
        tags: ['photography', 'memory', 'visual'],
        imageKeyword: 'travel photography'
      },
      {
        id: 'q7-c',
        text: '新的知识、技能或对世界的深刻理解',
        tags: ['learning', 'personal-growth', 'intellectual'],
        imageKeyword: 'travel learning'
      },
      {
        id: 'q7-d',
        text: '轻松愉悦的心情和充沛的精力',
        tags: ['wellness', 'relaxation', 'rejuvenation'],
        imageKeyword: 'relaxed person'
      }
    ]
  },
  {
    id: 'q8',
    question: '你对旅行中的"社交"活动持何种态度？',
    options: [
      {
        id: 'q8-a',
        text: '倾向于独处，避免过多社交',
        tags: ['introverted', 'quiet', 'independent'],
        imageKeyword: 'person alone'
      },
      {
        id: 'q8-b',
        text: '乐于结识新朋友，参与当地活动',
        tags: ['extroverted', 'social', 'community', 'interactive'],
        imageKeyword: 'people meeting'
      },
      {
        id: 'q8-c',
        text: '随缘社交，不强求，但也不排斥',
        tags: ['balanced', 'flexible-social'],
        imageKeyword: 'casual social'
      }
    ]
  },
  {
    id: 'q13',
    question: '你认为旅行的主要目的是什么？',
    options: [
      {
        id: 'q13-a',
        text: '放松身心，远离日常压力',
        tags: ['relaxation', 'stress-relief', 'wellness'],
        imageKeyword: 'relaxing spa'
      },
      {
        id: 'q13-b',
        text: '探索新事物，开阔眼界',
        tags: ['exploration', 'learning', 'curiosity'],
        imageKeyword: 'exploring new place'
      },
      {
        id: 'q13-c',
        text: '创造回忆，与 loved ones 共享时光',
        tags: ['bonding', 'memory-making', 'social'],
        imageKeyword: 'family memories'
      },
      {
        id: 'q13-d',
        text: '挑战自我，突破舒适区',
        tags: ['adventure', 'personal-growth', 'challenge'],
        imageKeyword: 'extreme adventure'
      }
    ]
  },
  {
    id: 'q9',
    question: '你通常偏好的旅行时长是？',
    options: [
      {
        id: 'q9-a',
        text: '短途周末游，2-3天即可',
        tags: ['short-trip', 'efficient', 'weekend', 'local'],
        imageKeyword: 'weekend getaway'
      },
      {
        id: 'q9-b',
        text: '一周左右的常规假期',
        tags: ['medium-trip', 'balanced', 'standard'],
        imageKeyword: 'one week vacation'
      },
      {
        id: 'q9-c',
        text: '两周以上的深度旅行',
        tags: ['long-trip', 'immersive', 'thorough', 'adventurous'],
        imageKeyword: 'long term travel'
      }
    ]
  },
  {
    id: 'q10',
    question: '你在旅行中最看重的住宿条件是？',
    options: [
      {
        id: 'q10-a',
        text: '经济实惠，干净整洁即可',
        tags: ['budget', 'practical', 'simple'],
        imageKeyword: 'budget accommodation'
      },
      {
        id: 'q10-b',
        text: '舒适便捷，服务周到',
        tags: ['comfort', 'convenient', 'reliable'],
        imageKeyword: 'comfortable hotel'
      },
      {
        id: 'q10-c',
        text: '独特体验，如特色民宿或豪华度假村',
        tags: ['unique', 'luxury', 'experiential'],
        imageKeyword: 'unique accommodation'
      }
    ]
  },
  {
    id: 'q11',
    question: '你偏好的旅行交通方式是？',
    options: [
      {
        id: 'q11-a',
        text: '飞机，快速便捷',
        tags: ['fast', 'efficient', 'long-distance'],
        imageKeyword: 'airplane travel'
      },
      {
        id: 'q11-b',
        text: '火车或汽车，欣赏沿途风景',
        tags: ['scenic', 'relaxed', 'flexible'],
        imageKeyword: 'train travel'
      },
      {
        id: 'q11-c',
        text: '自驾，自由掌控行程',
        tags: ['independent', 'flexible', 'adventurous'],
        imageKeyword: 'road trip'
      }
    ]
  },
  {
    id: 'q12',
    question: '你最喜欢在哪个季节旅行？',
    options: [
      {
        id: 'q12-a',
        text: '春季，万物复苏，气候宜人',
        tags: ['spring', 'mild', 'blooming', 'renewal'],
        imageKeyword: 'spring landscape'
      },
      {
        id: 'q12-b',
        text: '夏季，阳光明媚，适合户外活动',
        tags: ['summer', 'warm', 'active', 'beach'],
        imageKeyword: 'summer vacation'
      },
      {
        id: 'q12-c',
        text: '秋季，色彩斑斓，气候凉爽',
        tags: ['autumn', 'scenic', 'mild', 'cultural'],
        imageKeyword: 'autumn landscape'
      },
      {
        id: 'q12-d',
        text: '冬季，银装素裹，适合滑雪或温泉',
        tags: ['winter', 'cold', 'cozy', 'adventure'],
        imageKeyword: 'winter landscape'
      }
    ]
  },
  {
    id: 'q14',
    question: '你计划从哪个城市出发？',
    type: 'text-input',
    placeholder: '请输入你的出发城市（例如：深圳、杭州、武汉等）',
    tags: ['departure-custom'],
    imageKeyword: 'city skyline'
  },
];

export default quizQuestions;
