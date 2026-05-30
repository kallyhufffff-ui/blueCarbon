import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Map as MapIcon,
  Users,
  CheckCircle,
  Lock,
  Star,
  ChevronRight,
  Droplets,
  Flame,
  XCircle,
  Medal,
  UserPlus,
  Trophy,
  Store,
  Settings as SettingsIcon,
  Sprout,
  TreeDeciduous,
  ArrowLeft,
  Globe,
  Bell,
  CircleHelp,
  Swords,
  Crown,
  Image as ImageIcon,
  Info,
} from 'lucide-react';

import ticketIcon from './assets/ticket.jpg';
import eventIcon from './assets/event.jpg';
import notebookIcon from './assets/notebook.jpg';
import keychainIcon from './assets/keychain.jpg';
import bookmarkIcon from './assets/bookmark.jpg';
import badgeIcon from './assets/badge.jpg';

type Lang = 'en' | 'zh';

type LocalizedValue = {
  en: React.ReactNode;
  zh: React.ReactNode;
};

const getLocalizedContent = (
  value: React.ReactNode | LocalizedValue | undefined,
  lang: Lang
): React.ReactNode => {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return value;
  if (React.isValidElement(value)) return value;
  if (typeof value === 'object' && 'en' in value && 'zh' in value) {
    return lang === 'en' ? value.en : value.zh;
  }
  return '';
};

// ================= DICTIONARY (i18n) =================
const dict: Record<
  Lang,
  {
    appTitle: string;
    guardianLv: string;
    carbonPoints: string;
    navHome: string;
    navMap: string;
    navCommunity: string;
    navShop: string;
    navSettings: string;
    myForest: string;
    plantSeed: string;
    plantSapling: string;
    plantTree: string;
    waterBtn: string;
    harvestBtn: string;
    day: string;
    days: string;
    badgesTitle: string;
    badgeCatCourse: string;
    badgeCatPK: string;
    badgeCatDaily: string;
    badgeCatPlant: string;
    badgeCatScale: string;
    tabSelf: string;
    tabPK: string;
    carbonAdv: string;
    advDesc: string;
    pkTitle: string;
    pkDesc: string;
    findMatch: string;
    myRank: string;
    topGuardian: string;
    totalPoints: string;
    leaderboard: string;
    addFriend: string;
    shopTitle: string;
    exchange: string;
    successMsg: string;
    failMsg: string;
    settingsTitle: string;
    language: string;
    notifications: string;
    about: string;
    dailyMission: string;
    guardingFor: string;
    completed: string;
    incomplete: string;
    clickToEnter: string;
    unlockedBadges: string;
    allBadges: string;
    condition: string;
    previewTitle: string;
    coreKnowledge: string;
    startPreQuiz: string;
    nextQuestion: string;
    watchVideo: string;
    videoWait: string;
    startPostQuiz: string;
    finishLesson: string;
    comparisonTitle: string;
    praiseMsg: string;
    encourageMsg: string;
    preScore: string;
    postScore: string;
    correct: string;
    incorrect: string;
    submitAnswer: string;
    seeResults: string;
    dailyLogin: string;
    checkInSuccess: string;
    checkInBtn: string;
    noBadges: string;
    characters: string;
    unlocked: string;
    locked: string;
    videoIntro: string;
  }
> = {
  en: {
    appTitle: 'Blue Carbon',
    guardianLv: 'Lv.{lvl} Guardian',
    carbonPoints: 'Carbon Points',
    navHome: 'Home',
    navMap: 'Adventure',
    navCommunity: 'Community',
    navShop: 'Shop',
    navSettings: 'Settings',
    myForest: 'My Mangrove Forest',
    plantSeed: 'Seed',
    plantSapling: 'Sapling',
    plantTree: 'Mature Tree',
    waterBtn: 'Water & Fertilize',
    harvestBtn: 'Move to Forest',
    day: 'Day',
    days: 'Days',
    badgesTitle: 'My Digital Badges',
    badgeCatCourse: 'Course Learning',
    badgeCatPK: 'Knowledge PK',
    badgeCatDaily: 'Daily Check-in',
    badgeCatPlant: 'Mangrove Planting',
    badgeCatScale: 'Wetland Scale',
    tabSelf: 'Self-learning',
    tabPK: 'Knowledge PK',
    carbonAdv: 'Carbon Adventure',
    advDesc: 'Complete lessons to unlock knowledge',
    pkTitle: 'Current Tier',
    pkDesc: 'Match with players of the same tier to win Carbon Points!',
    findMatch: 'Find Match',
    myRank: 'My Rank',
    topGuardian: 'Top 25% of Guardians',
    totalPoints: 'Total Points',
    leaderboard: 'Leaderboard',
    addFriend: 'Add Friend',
    shopTitle: 'Carbon Points Shop',
    exchange: 'Exchange',
    successMsg: 'Exchange successful!',
    failMsg: 'Not enough points!',
    settingsTitle: 'Settings',
    language: 'Language',
    notifications: 'Notifications',
    about: 'About Us',
    dailyMission: 'Daily Mission',
    guardingFor: 'Guarding for',
    completed: 'Completed',
    incomplete: 'Incomplete',
    clickToEnter: 'Click to enter',
    unlockedBadges: 'Unlocked Badges',
    allBadges: 'All Badges',
    condition: 'Acquisition Condition',
    previewTitle: 'Knowledge Preview',
    coreKnowledge: 'Core Knowledge Points',
    startPreQuiz: 'Start Pre-Class Quiz',
    nextQuestion: 'Next Question',
    watchVideo: 'Watch Video',
    videoWait: 'Please watch for at least {time}s',
    startPostQuiz: 'Start Post-Class Quiz',
    finishLesson: 'Complete Lesson',
    comparisonTitle: 'Learning Results',
    praiseMsg: 'Amazing! You made great progress or got a perfect score!',
    encourageMsg:
      'Keep it up! Reviewing the knowledge will help you improve further.',
    preScore: 'Pre-class Score',
    postScore: 'Post-class Score',
    correct: 'Correct!',
    incorrect: 'Oops, not quite!',
    submitAnswer: 'Submit Answer',
    seeResults: 'See Results',
    dailyLogin: 'Daily Login',
    checkInSuccess: 'Checked in successfully!',
    checkInBtn: 'Check In',
    noBadges: 'No badges unlocked yet.',
    characters: 'Characters',
    unlocked: 'Unlocked',
    locked: 'Locked',
    videoIntro: 'Watch the video to uncover the secrets!',
  },
  zh: {
    appTitle: '蓝碳守护者',
    guardianLv: 'Lv.{lvl} 守护者',
    carbonPoints: '蓝碳积分',
    navHome: '首页',
    navMap: '探索',
    navCommunity: '社区',
    navShop: '商城',
    navSettings: '设置',
    myForest: '我的红树林',
    plantSeed: '种子期',
    plantSapling: '小苗期',
    plantTree: '成熟期',
    waterBtn: '施肥浇水',
    harvestBtn: '移入树林',
    day: '天',
    days: '天',
    badgesTitle: '我的数字徽章',
    badgeCatCourse: '课程学习类',
    badgeCatPK: '知识 PK 类',
    badgeCatDaily: '每日打卡类',
    badgeCatPlant: '红树林数量类',
    badgeCatScale: '湿地规模类',
    tabSelf: '自主学习',
    tabPK: '知识 PK',
    carbonAdv: '碳汇探险',
    advDesc: '完成课程解锁蓝碳知识',
    pkTitle: '当前段位',
    pkDesc: '与同段位玩家进行蓝碳知识PK，获胜可赢取积分！',
    findMatch: '寻找对手',
    myRank: '我的排名',
    topGuardian: '前 25% 守护者',
    totalPoints: '总积分',
    leaderboard: '排行榜',
    addFriend: '添加好友',
    shopTitle: '蓝碳积分商城',
    exchange: '兑换',
    successMsg: '兑换成功！',
    failMsg: '积分不足，兑换失败！',
    settingsTitle: '设置',
    language: '语言 (Language)',
    notifications: '消息通知',
    about: '关于我们',
    dailyMission: '每日任务',
    guardingFor: '已守护',
    completed: '已完成',
    incomplete: '未完成',
    clickToEnter: '点击进入',
    unlockedBadges: '已点亮徽章',
    allBadges: '所有徽章',
    condition: '获取条件',
    previewTitle: '知识预览',
    coreKnowledge: '核心知识点',
    startPreQuiz: '开始课前测试',
    nextQuestion: '下一题',
    watchVideo: '观看视频',
    videoWait: '请至少观看 {time} 秒',
    startPostQuiz: '开始课后测试',
    finishLesson: '完成课程',
    comparisonTitle: '学习成果对比',
    praiseMsg: '太棒了！你取得了进步或获得了满分！',
    encourageMsg: '继续加油！多复习知识点会让你变得更强。',
    preScore: '课前正确率',
    postScore: '课后正确率',
    correct: '回答正确！',
    incorrect: '哎呀，不太对哦！',
    submitAnswer: '提交答案',
    seeResults: '查看结果',
    dailyLogin: '每日登录',
    checkInSuccess: '打卡成功！',
    checkInBtn: '打卡',
    noBadges: '暂未解锁任何徽章。',
    characters: '主角',
    unlocked: '已解锁',
    locked: '未解锁',
    videoIntro: '观看影片，探索其中的秘密！',
  },
};

// ================= MOCK DATA =================
const SPECIES = [
  {
    id: 'herry',
    nameEn: <span className="italic">Heritiera littoralis</span>,
    nameZh: '银叶树',
  },
  {
    id: 'rhizophora',
    nameEn: <span className="italic">Rhizophora apiculata</span>,
    nameZh: '红海榄',
  },
  {
    id: 'kandelia',
    nameEn: <span className="italic">Kandelia obovata</span>,
    nameZh: '秋茄',
  },
];

const MOCK_FRIENDS = [
  {
    id: 1,
    name: 'Amy',
    streak: 5,
    points: 1350,
    avatarColor: 'bg-pink-400',
  },
  {
    id: 2,
    name: 'Ben',
    streak: 4,
    points: 1280,
    avatarColor: 'bg-emerald-400',
  },
  {
    id: 3,
    name: 'Chris',
    streak: 6,
    points: 1420,
    avatarColor: 'bg-blue-400',
  },
  {
    id: 4,
    name: 'Daisy',
    streak: 3,
    points: 1180,
    avatarColor: 'bg-purple-400',
  },
];

const BADGES_DATA = [
  {
    id: 'c1',
    cat: 'Course',
    icon: '🌱',
    en: 'New Explorer Badge',
    zh: '求知萌新徽章',
    unlocked: true,
    condition: { en: 'Complete 1 lesson', zh: '完成1节课程' },
  },
  {
    id: 'c2',
    cat: 'Course',
    icon: '📖',
    en: 'Erudite Master Badge',
    zh: '博学达人徽章',
    unlocked: false,
    condition: { en: 'Complete 5 lessons', zh: '完成5节课程' },
  },
  {
    id: 'c3',
    cat: 'Course',
    icon: '🎓',
    en: 'Mangrove Scholar Badge',
    zh: '红树学霸徽章',
    unlocked: false,
    condition: { en: 'Complete all lessons', zh: '完成所有课程' },
  },
  {
    id: 'p1',
    cat: 'PK',
    icon: '⚔️',
    en: 'Knowledge Challenger',
    zh: '知识挑战者徽章',
    unlocked: true,
    condition: { en: 'Participate in 1 PK', zh: '参与1次PK' },
  },
  {
    id: 'p2',
    cat: 'PK',
    icon: '👑',
    en: 'Wetland Champion',
    zh: '湿地王者徽章',
    unlocked: false,
    condition: { en: 'Win 10 PKs', zh: '赢得10次PK' },
  },
  {
    id: 'p3',
    cat: 'PK',
    icon: '💡',
    en: 'All-round Q&A Expert',
    zh: '全能问答家徽章',
    unlocked: false,
    condition: { en: 'Reach Gold Tier', zh: '达到黄金段位' },
  },
  {
    id: 'd1',
    cat: 'Daily',
    icon: '⭐',
    en: 'Persistence Star',
    zh: '坚持之星徽章',
    unlocked: true,
    condition: { en: 'Check in for 3 days', zh: '连续打卡3天' },
  },
  {
    id: 'd2',
    cat: 'Daily',
    icon: '🛡️',
    en: 'Full-attendance Guardian',
    zh: '全勤守护者徽章',
    unlocked: false,
    condition: { en: 'Check in for 7 days', zh: '连续打卡7天' },
  },
  {
    id: 'd3',
    cat: 'Daily',
    icon: '📅',
    en: 'Ecological Check-in Master',
    zh: '生态打卡达人徽章',
    unlocked: false,
    condition: { en: 'Check in for 30 days', zh: '连续打卡30天' },
  },
  {
    id: 'm1',
    cat: 'Plant',
    icon: '🌿',
    en: 'Planter Novice',
    zh: '初植者徽章',
    unlocked: true,
    condition: { en: 'Plant 1 mangrove', zh: '种植1棵红树' },
  },
  {
    id: 'm2',
    cat: 'Plant',
    icon: '🌲',
    en: 'Forest Cult Expert',
    zh: '育林能手徽章',
    unlocked: false,
    condition: { en: 'Plant 5 mangroves', zh: '种植5棵红树' },
  },
  {
    id: 'm3',
    cat: 'Plant',
    icon: '📦',
    en: 'Mangrove Collector',
    zh: '红树收藏家徽章',
    unlocked: false,
    condition: { en: 'Collect all species', zh: '收集所有树种' },
  },
  {
    id: 's1',
    cat: 'Scale',
    icon: '🌊',
    en: 'Wetland Guardian',
    zh: '湿地守护者徽章',
    unlocked: false,
    condition: { en: 'Reach 100 sq meters', zh: '湿地规模达100平米' },
  },
  {
    id: 's2',
    cat: 'Scale',
    icon: '🌍',
    en: 'Ecology Master',
    zh: '生态大师徽章',
    unlocked: false,
    condition: { en: 'Reach 500 sq meters', zh: '湿地规模达500平米' },
  },
  {
    id: 's3',
    cat: 'Scale',
    icon: '🏞️',
    en: 'Mangrove Curator',
    zh: '红树林园长徽章',
    unlocked: false,
    condition: { en: 'Reach 1000 sq meters', zh: '湿地规模达1000平米' },
  },
];

const SHOP_ITEMS = [
  {
    id: 1,
    icon: ticketIcon,
    en: 'Offline Museum Ticket',
    zh: '线下博物馆门票',
    price: 2000,
  },
  {
    id: 2,
    icon: eventIcon,
    en: 'Offline Ecological Survey Quota',
    zh: '线下生态研习名额',
    price: 4000,
  },
  {
    id: 3,
    icon: notebookIcon,
    en: 'Recycled Notebook',
    zh: '再生纸笔记本',
    price: 800,
  },
  {
    id: 4,
    icon: keychainIcon,
    en: 'Mangrove Wood Keychain',
    zh: '红树林木制钥匙扣',
    price: 800,
  },
  {
    id: 5,
    icon: bookmarkIcon,
    en: 'Mangrove Wood BookMark',
    zh: '红树林木制书签',
    price: 500,
  },
  {
    id: 6,
    icon: badgeIcon,
    en: 'Mangrove Wood Badge',
    zh: '红树林木制胸章',
    price: 500,
  },
];

const LEVELS_DATA = [
  {
    id: 1,
    title: 'Lesson 1',
    subtitle: {
      en: 'What is Blue Carbon?',
      zh: '什么是蓝碳？',
    },
    videoUrl: 'https://www.youtube.com/embed/AQNe83Cwp1M',
    preview: {
      characters: [
        {
          name: 'Herry',
          type: (
            <>
              <span className="italic">Heritiera littoralis</span> fruit
            </>
          ),
        },
        {
          name: 'Kandy',
          type: (
            <>
              <span className="italic">Kandelia obovata</span> seedling
            </>
          ),
        },
        {
          name: 'Teacher',
          type: <span className="italic">Acrostichum aureum</span>,
        },
      ],
      knowledge: [
        {
          en: '1. Blue carbon is carbon absorbed and stored by marine ecosystems.',
          zh: '1. 蓝碳是由海洋生态系统吸收和储存的碳。',
        },
        {
          en: '2. Mangroves, seagrass beds and salt marshes are three important blue carbon ecosystems.',
          zh: '2. 红树林、海草床和盐沼湿地是三类重要的蓝碳生态系统。',
        },
        {
          en: '3. Mangroves capture carbon dioxide through their leaves, use it for growth, and store part of the carbon in roots and mud.',
          zh: '3. 红树林通过叶片吸收二氧化碳，用于生长，并把部分碳储存在根部和泥巴中。',
        },
        {
          en: (
            <>
              4. Hong Kong has its own mangrove family. They are{' '}
              <span className="italic">Kandelia obovata</span>,{' '}
              <span className="italic">Heritiera littoralis</span>,{' '}
              <span className="italic">Avicennia marina</span>,{' '}
              <span className="italic">Bruguiera gymnorhiza</span>,{' '}
              <span className="italic">Aegiceras corniculatum</span>,{' '}
              <span className="italic">Excoecaria agallocha</span>,{' '}
              <span className="italic">Lumnitzera racemosa</span> and{' '}
              <span className="italic">Acrostichum aureum</span>.
            </>
          ),
          zh: '4. 香港也有自己的红树林家族。他们分别是秋茄，银叶树，白骨壤，木榄，桐花树，海漆，榄李，卤蕨。',
        },
      ],
    },
    quiz: [
      {
        q: { en: 'What is blue carbon?', zh: '什么是蓝碳？' },
        options: {
          en: [
            'Carbon in industrial exhaust',
            'Carbon absorbed and stored by marine ecosystem',
            'Carbon absorbed by forest plants',
            'Carbon from burning coal',
          ],
          zh: [
            '工业废气中的碳',
            '由海洋生态系统吸收和储存的碳',
            '森林植物吸收的碳',
            '燃烧煤炭产生的碳',
          ],
        },
        correct: 1,
        exp: {
          en: 'Blue carbon is the carbon absorbed and stored by marine ecosystem.',
          zh: '蓝碳是由海洋生态系统吸收和储存的碳。',
        },
      },
      {
        q: {
          en: 'Which of the following is NOT one of the three major blue carbon ecosystems?',
          zh: '以下哪项不是三大蓝碳生态系统之一？',
        },
        options: {
          en: ['Mangroves', 'Seagrass beds', 'Salt marshes', 'Grasslands'],
          zh: ['红树林', '海草床', '盐沼湿地', '草原'],
        },
        correct: 3,
        exp: {
          en: 'Grasslands are not marine ecosystems.',
          zh: '草原不是海洋生态系统。',
        },
      },
      {
        q: {
          en: 'Hong Kong has eight main mangrove species',
          zh: '香港有8种主要的红树林物种',
        },
        options: { en: ['True', 'False'], zh: ['正确', '错误'] },
        correct: 0,
        exp: {
          en: 'True. Hong Kong has eight main mangrove species.',
          zh: '正确。香港有8种主要的红树林物种。',
        },
      },
      {
        q: {
          en: 'Where are Hong Kong’s mangroves mainly distributed?',
          zh: '香港的红树林主要分布在哪里？',
        },
        options: {
          en: [
            'Desert',
            'Mountain tops',
            'Mai Po, Ting Kok, Tai O and Deep Bay',
            'City centers',
          ],
          zh: ['沙漠', '山顶', '米埔、汀角、大澳和后海湾', '市中心'],
        },
        correct: 2,
        exp: {
          en: 'They are mainly distributed in Mai Po, Ting Kok, Tai O and Deep Bay.',
          zh: '它们主要分布在米埔、汀角、大澳和后海湾。',
        },
      },
      {
        q: {
          en: 'Blue carbon ecosystems store more than 50% of the global carbon reserves.',
          zh: '蓝碳生态系统储存了全球50%以上的碳储备。',
        },
        options: { en: ['True', 'False'], zh: ['正确', '错误'] },
        correct: 0,
        exp: { en: 'True.', zh: '正确。' },
      },
    ],
  },
  {
    id: 2,
    title: 'Lesson 2',
    subtitle: {
      en: (
        <>
          <span className="italic">Kandelia obovata</span>: The Coast Guard
        </>
      ),
      zh: '秋茄：海岸卫士',
    },
    videoUrl: 'https://www.youtube.com/embed/AQNe83Cwp1M',
    preview: {
      characters: [
        {
          name: 'Mother Kandelia',
          type: <span className="italic">Kandelia obovata</span>,
        },
        {
          name: 'Kandy',
          type: (
            <>
              <span className="italic">Kandelia obovata</span> seedling
            </>
          ),
        },
      ],
      knowledge: [
        {
          en: (
            <>
              1. <span className="italic">Kandelia obovata</span> is one of the
              most common mangrove plants in Hong Kong.
            </>
          ),
          zh: '1. 秋茄是香港最常见的红树林植物之一。',
        },
        {
          en: '2. Its stilt roots hold the mudflat firmly and help break up wave energy.',
          zh: '2. 秋茄的支柱根可以牢牢抓住泥滩，并帮助分散海浪力量。',
        },
        {
          en: (
            <>
              3. <span className="italic">Kandelia obovata</span> is viviparous:
              its seed sprouts on the tree and grows a long hypocotyl before
              falling.
            </>
          ),
          zh: '3. 秋茄具有胎生现象，种子在树上发芽，长出长长的胚轴后再掉落。',
        },
      ],
    },
    quiz: [
      {
        q: {
          en: (
            <>
              What special power do{' '}
              <span className="italic">Kandelia obovata</span>
              ’s stilt roots have?
            </>
          ),
          zh: '秋茄的支柱根有什么特殊能力？',
        },
        options: {
          en: [
            'They can fly',
            'They can hold the mudflat firmly and stop wind waves',
            'They produce sweet fruits',
            'They glow in the dark',
          ],
          zh: [
            '它们会飞',
            '它们能牢牢抓住泥滩并阻挡风浪',
            '它们结出甜美的果实',
            '它们在黑暗中发光',
          ],
        },
        correct: 1,
        exp: {
          en: 'They can hold the mudflat firmly and stop wind waves.',
          zh: '它们能牢牢抓住泥滩并阻挡风浪。',
        },
      },
      {
        q: {
          en: (
            <>
              What is <span className="italic">Kandelia obovata</span> called in
              mangroves?
            </>
          ),
          zh: '秋茄在红树林中被称为什么？',
        },
        options: {
          en: [
            'Breathing experts',
            'Coast Guard',
            'Carbon storage expert',
            'Flower guardian',
          ],
          zh: ['呼吸专家', '海岸卫士', '碳储藏专家', '护花使者'],
        },
        correct: 1,
        exp: {
          en: 'It is known as the Coast Guard.',
          zh: '它被称为海岸卫士。',
        },
      },
      {
        q: {
          en: (
            <>
              <span className="italic">Kandelia obovata</span> is a viviparous
              plant.
            </>
          ),
          zh: '秋茄是胎生植物。',
        },
        options: { en: ['True', 'False'], zh: ['正确', '错误'] },
        correct: 0,
        exp: {
          en: 'True. Its seed sprouts on the tree.',
          zh: '正确。它的种子在树上发芽。',
        },
      },
      {
        q: {
          en: 'Which animal can jump around on the mangrove mudflat?',
          zh: '哪种动物可以在红树林泥滩上跳来跳去？',
        },
        options: {
          en: ['Fiddler crab', 'Mudskipper', 'Little egret', 'Sparrow'],
          zh: ['招潮蟹', '弹涂鱼', '小白鹭', '麻雀'],
        },
        correct: 1,
        exp: {
          en: 'Mudskippers jump around on the mudflat.',
          zh: '弹涂鱼在泥滩上跳来跳去。',
        },
      },
      {
        q: {
          en: 'Mangroves can stop wind and waves to protect the coast.',
          zh: '红树林可以阻挡风浪以保护海岸。',
        },
        options: { en: ['True', 'False'], zh: ['正确', '错误'] },
        correct: 0,
        exp: { en: 'True.', zh: '正确。' },
      },
    ],
  },
  {
    id: 3,
    title: 'Lesson 3',
    subtitle: {
      en: (
        <>
          <span className="italic">Avicennia marina</span>: The Breathing Expert
        </>
      ),
      zh: '白骨壤：呼吸专家',
    },
    videoUrl: 'https://www.youtube.com/embed/AQNe83Cwp1M',
    preview: {
      characters: [
        {
          name: 'Avicennia marina',
          type: <span className="italic">Avicennia marina</span>,
        },
      ],
      knowledge: [
        {
          en: (
            <>
              1. <span className="italic">Avicennia marina</span> has
              pencil-like pneumatophores that stick up from the mud.
            </>
          ),
          zh: '1. 白骨壤有像铅笔一样从泥面伸出的指状呼吸根。',
        },
        {
          en: '2. Pneumatophores help mangroves breathe in muddy, low-oxygen conditions.',
          zh: '2. 指状呼吸根帮助红树在缺氧泥滩环境中呼吸。',
        },
        {
          en: '3. Carbon can be locked in mangrove mud because plant remains decompose slowly where there is little oxygen.',
          zh: '3. 红树林泥巴中氧气少，植物残体分解慢，所以碳可以被长期锁住。',
        },
      ],
    },
    quiz: [
      {
        q: {
          en: (
            <>
              What are <span className="italic">Avicennia marina</span>’s
              breathing roots called?
            </>
          ),
          zh: '白骨壤的呼吸根叫什么？',
        },
        options: {
          en: ['Pneumatophores', 'Stilt roots', 'Tap roots', 'Aerial roots'],
          zh: ['指状呼吸根', '支柱根', '主根', '气生根'],
        },
        correct: 0,
        exp: {
          en: 'They are called pneumatophores (finger-like roots).',
          zh: '它们被称为指状呼吸根。',
        },
      },
      {
        q: {
          en: 'Why do plant remains turn into peat in mangrove mud?',
          zh: '为什么植物残体在红树林泥巴中会变成泥炭？',
        },
        options: {
          en: [
            'There is no oxygen in the mud',
            'There is too much sunlight',
            'There are many animals',
            'The mud is very dry',
          ],
          zh: ['泥巴里没有氧气', '阳光太多', '动物很多', '泥巴很干'],
        },
        correct: 0,
        exp: { en: 'There is no oxygen in the mud.', zh: '泥巴里没有氧气。' },
      },
      {
        q: {
          en: 'One hectare of mangroves store 3-5 times more carbon than tropical rainforest.',
          zh: '一公顷红树林储存的碳是热带雨林的3-5倍。',
        },
        options: { en: ['True', 'False'], zh: ['正确', '错误'] },
        correct: 0,
        exp: { en: 'True.', zh: '正确。' },
      },
      {
        q: {
          en: 'Where is carbon locked and stored in mangroves for thousands of years?',
          zh: '碳在红树林中被锁定和储存数千年的地方是哪里？',
        },
        options: {
          en: ['Tree leaves', 'Branches', 'Peat layer/mud', 'Flowers'],
          zh: ['树叶', '树枝', '泥炭层/泥巴', '花朵'],
        },
        correct: 2,
        exp: { en: 'In the peat layer/mud.', zh: '在泥炭层/泥巴中。' },
      },
      {
        q: {
          en: 'Hong Kong’s mangroves store carbon equal to the emission of 100,000 cars driving for a whole year.',
          zh: '香港红树林储存的碳相当于10万辆汽车开一整年的排放量。',
        },
        options: { en: ['True', 'False'], zh: ['正确', '错误'] },
        correct: 0,
        exp: { en: 'True.', zh: '正确。' },
      },
    ],
  },
];

const HerrySprite = ({
  mood = 'happy',
  className = 'w-32 h-32',
}: {
  mood?: 'happy' | 'excited' | 'sad';
  className?: string;
}) => {
  const animation =
    mood === 'excited'
      ? {
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
          transition: { repeat: Infinity, duration: 0.6 },
        }
      : mood === 'sad'
      ? { y: 5, scale: 0.95, transition: { duration: 0.3 } }
      : {
          y: [0, -6, 0],
          transition: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' as const},
        };

  return (
    <motion.div
      animate={animation}
      className={`${className} mx-auto relative drop-shadow-xl flex justify-center items-center`}
    >
      <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center border-4 border-blue-300">
        <span className="text-4xl">
          {mood === 'excited' ? '🤩' : mood === 'sad' ? '😢' : '😊'}
        </span>
      </div>
    </motion.div>
  );
};

function BottomNav({
  currentTab,
  setCurrentTab,
  t,
}: {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  t: (typeof dict)['en'] | (typeof dict)['zh'];
}) {
  const items = [
    { key: 'home', label: t.navHome, icon: Home },
    { key: 'map', label: t.navMap, icon: MapIcon },
    { key: 'community', label: t.navCommunity, icon: Users },
    { key: 'shop', label: t.navShop, icon: Store },
    { key: 'settings', label: t.navSettings, icon: SettingsIcon },
  ];

  return (
    <div className="bg-white border-t border-slate-200 px-2 py-2 grid grid-cols-5 shrink-0">
      {items.map((item) => {
        const Icon = item.icon;
        const active = currentTab === item.key;

        return (
          <button
            key={item.key}
            onClick={() => setCurrentTab(item.key)}
            className={`flex flex-col items-center justify-center py-2 rounded-xl transition-all ${
              active ? 'text-blue-600 bg-blue-50' : 'text-slate-400'
            }`}
          >
            <Icon size={20} className={active ? 'text-blue-600' : ''} />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ================= MAIN APP =================
export default function BlueCarbonApp() {
  const [lang, setLang] = useState<Lang>('en');
  const t = dict[lang];

  const [currentTab, setCurrentTab] = useState('home');
  const [points, setPoints] = useState(1200);
  const [currentLevel, setCurrentLevel] = useState(1);

  const [activeHomeModal, setActiveHomeModal] = useState<
    null | 'planting' | 'badges'
  >(null);
  const [selectedBadge, setSelectedBadge] = useState<
    (typeof BADGES_DATA)[number] | null
  >(null);

  const [streak, setStreak] = useState(3);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  const [plantDays, setPlantDays] = useState(0);
  const [currentSpeciesIdx, setCurrentSpeciesIdx] = useState(0);
  const [forest, setForest] = useState<typeof SPECIES>([]);

  const [advTab, setAdvTab] = useState<'self' | 'pk'>('self');

  const [activeLevel, setActiveLevel] = useState<(typeof LEVELS_DATA)[number] | null>(null);
  const [lessonPhase, setLessonPhase] = useState<
    'preview' | 'pre-quiz' | 'video' | 'post-quiz' | 'comparison'
  >('preview');
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizState, setQuizState] = useState<'answering' | 'result'>('answering');
  const [spriteMood, setSpriteMood] = useState<'happy' | 'excited' | 'sad'>('happy');

  const [preQuizScore, setPreQuizScore] = useState(0);
  const [postQuizScore, setPostQuizScore] = useState(0);

  const [videoTimeLeft, setVideoTimeLeft] = useState(120);

  const [toast, setToast] = useState<null | { msg: string; type: 'success' | 'error' }>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2000);
  };

  const handleWater = () => {
    if (plantDays < 30) setPlantDays((prev) => prev + 1);
  };

  const handleHarvest = () => {
    setForest((prev) => [...prev, SPECIES[currentSpeciesIdx]]);
    setPlantDays(0);
    setCurrentSpeciesIdx((prev) => (prev < SPECIES.length - 1 ? prev + 1 : 0));
  };

  const handleCheckIn = () => {
    if (!hasCheckedIn) {
      setHasCheckedIn(true);
      setStreak((s) => s + 1);
      setPoints((p) => p + 10);
      showToast(t.checkInSuccess, 'success');
    }
  };

  const buyItem = (price: number) => {
    if (points >= price) {
      setPoints((p) => p - price);
      showToast(t.successMsg, 'success');
    } else {
      showToast(t.failMsg, 'error');
    }
  };

  const getPlantState = () => {
    if (plantDays < 15) {
      return {
        phase: t.plantSeed,
        icon: <Sprout size={48} className="text-emerald-500" />,
      };
    }
    if (plantDays < 30) {
      return {
        phase: t.plantSapling,
        icon: <TreeDeciduous size={56} className="text-emerald-600" />,
      };
    }
    return {
      phase: t.plantTree,
      icon: <TreeDeciduous size={72} className="text-emerald-700" />,
    };
  };

  const startLevel = (levelId: number) => {
    if (levelId > currentLevel) return;
    const level = LEVELS_DATA.find((l) => l.id === levelId) || null;
    setActiveLevel(level);
    setLessonPhase('preview');
    setQIndex(0);
    setSelectedOption(null);
    setQuizState('answering');
    setPreQuizScore(0);
    setPostQuizScore(0);
    setCurrentTab('lesson');
    setSpriteMood('happy');
    setVideoTimeLeft(120);
  };

  const submitAnswer = () => {
    if (!activeLevel || selectedOption === null) return;
    setQuizState('result');
    const isCorrect = selectedOption === activeLevel.quiz[qIndex].correct;

    if (isCorrect) {
      setSpriteMood('excited');
      if (lessonPhase === 'pre-quiz') setPreQuizScore((s) => s + 1);
      if (lessonPhase === 'post-quiz') setPostQuizScore((s) => s + 1);
    } else {
      setSpriteMood('sad');
    }
  };

  const nextStep = () => {
    if (!activeLevel) return;

    if (qIndex < activeLevel.quiz.length - 1) {
      setQIndex((q) => q + 1);
      setSelectedOption(null);
      setQuizState('answering');
      setSpriteMood('happy');
    } else {
      if (lessonPhase === 'pre-quiz') {
        setLessonPhase('video');
        setVideoTimeLeft(120);
        setSpriteMood('happy');
      } else if (lessonPhase === 'post-quiz') {
        setLessonPhase('comparison');
        if (activeLevel.id === currentLevel) {
          setCurrentLevel((prev) => prev + 1);
          setPoints((p) => p + 50);
        }
      }
    }
  };

  useEffect(() => {
    let timer: number | undefined;
    if (lessonPhase === 'video' && videoTimeLeft > 0) {
      timer = window.setInterval(() => {
        setVideoTimeLeft((time) => Math.max(time - 1, 0));
      }, 1000);
    }
    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [lessonPhase, videoTimeLeft]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-100 font-sans">
      <div className="w-full max-w-md h-[850px] max-h-screen bg-slate-50 relative overflow-hidden shadow-2xl flex flex-col sm:rounded-[2.5rem] sm:border-8 border-slate-800">
        <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white p-4 flex justify-between items-center rounded-b-3xl shadow-md z-10 relative shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <Droplets size={20} className="text-sky-100" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-wide">
                {t.appTitle}
              </h1>
              <p className="text-xs text-sky-100 opacity-90">
                {t.guardianLv.replace('{lvl}', String(currentLevel))}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end bg-black/15 px-3 py-1.5 rounded-xl backdrop-blur-sm">
            <span className="text-sky-100 text-[10px] font-medium mb-0.5">
              {t.carbonPoints}
            </span>
            <span className="flex items-center font-bold text-sm">
              <Star size={14} className="mr-1 text-yellow-300 fill-yellow-300" />
              {points}
            </span>
          </div>
        </div>

        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -50, x: '-50%' }}
              animate={{ opacity: 1, y: 20, x: '-50%' }}
              exit={{ opacity: 0, y: -50, x: '-50%' }}
              className={`fixed top-16 left-1/2 z-50 px-4 py-2 rounded-full shadow-lg text-sm font-bold text-white whitespace-nowrap ${
                toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              {toast.msg}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            {currentTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 space-y-6 h-full w-full overflow-y-auto"
              >
                <div
                  onClick={() => setActiveHomeModal('planting')}
                  className="bg-gradient-to-b from-sky-50 to-blue-50 rounded-3xl p-6 border border-blue-100 shadow-sm relative cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="absolute top-4 right-4 text-blue-500 bg-white/80 px-2 py-1 rounded-full text-[10px] font-bold shadow-sm border border-blue-100 flex items-center">
                    {t.clickToEnter} <ChevronRight size={12} className="ml-1" />
                  </div>
                  <h3 className="font-bold text-blue-900 flex items-center mb-4">
                    <TreeDeciduous size={18} className="mr-2 text-emerald-600" />
                    {t.myForest}
                  </h3>

                  <div className="flex flex-col items-center justify-center">
                    {getPlantState().icon}
                    <div className="mt-2 text-center">
                      <div className="font-bold text-slate-700 text-sm">
                        {lang === 'en'
                          ? SPECIES[currentSpeciesIdx].nameEn
                          : SPECIES[currentSpeciesIdx].nameZh}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {getPlantState().phase} • {plantDays} / 30 {t.days}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-blue-100 h-2 rounded-full mt-4 overflow-hidden">
                    <div
                      className="bg-blue-500 h-full transition-all duration-300"
                      style={{ width: `${(plantDays / 30) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-slate-800 flex items-center text-lg">
                      <Flame size={20} className="text-orange-500 mr-2" />
                      {t.dailyMission}
                    </h2>
                    <div className="text-xs font-bold text-slate-500">
                      {t.guardingFor}{' '}
                      <span className="text-orange-500 text-lg mx-1">{streak}</span>{' '}
                      {t.days}
                    </div>
                  </div>

                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-700">
                          {t.dailyLogin}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          +10 {t.carbonPoints}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleCheckIn}
                      disabled={hasCheckedIn}
                      className={`px-4 py-2 rounded-full text-xs font-bold flex items-center transition-colors ${
                        hasCheckedIn
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-orange-500 text-white shadow-md shadow-orange-200 active:scale-95'
                      }`}
                    >
                      {hasCheckedIn ? t.completed : t.checkInBtn}
                    </button>
                  </div>

                  <div className="flex justify-between mt-4">
                    {[0, 1, 2, 3, 4, 5, 6].map((day) => {
                      const isPast = day < streak - (hasCheckedIn ? 1 : 0);
                      const isToday = day === streak - (hasCheckedIn ? 1 : 0);
                      const isCheckedToday = isToday && hasCheckedIn;

                      return (
                        <div key={day} className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all ${
                              isPast || isCheckedToday
                                ? 'bg-blue-500 text-white shadow-md shadow-blue-200'
                                : isToday
                                ? 'bg-blue-100 text-blue-600 border-2 border-blue-400'
                                : 'bg-slate-100 text-slate-400'
                            }`}
                          >
                            {isPast || isCheckedToday ? <CheckCircle size={16} /> : day + 1}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {t.day} {day + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  onClick={() => setActiveHomeModal('badges')}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100 cursor-pointer hover:shadow-md transition-shadow relative"
                >
                  <div className="absolute top-4 right-4 text-blue-500 bg-blue-50 px-2 py-1 rounded-full text-[10px] font-bold flex items-center">
                    {t.clickToEnter} <ChevronRight size={12} className="ml-1" />
                  </div>
                  <h2 className="font-bold text-slate-800 flex items-center text-lg mb-4">
                    <Medal size={20} className="text-blue-500 mr-2" />
                    {t.unlockedBadges}
                  </h2>

                  <div className="flex flex-wrap gap-3">
                    {BADGES_DATA.filter((b) => b.unlocked).map((badge) => (
                      <div
                        key={badge.id}
                        className="flex flex-col items-center p-2 rounded-xl bg-blue-50 border border-blue-100 w-20"
                      >
                        <div className="text-2xl mb-1">{badge.icon}</div>
                        <div className="text-[9px] text-center font-medium leading-tight text-blue-800 line-clamp-2">
                          {lang === 'en' ? badge.en : badge.zh}
                        </div>
                      </div>
                    ))}
                    {BADGES_DATA.filter((b) => b.unlocked).length === 0 && (
                      <div className="text-sm text-slate-400 py-4 w-full text-center">
                        {t.noBadges}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {currentTab === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 h-full w-full overflow-y-auto bg-sky-50 relative"
                style={{
                  backgroundImage: 'radial-gradient(#bae6fd 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              >
                <div className="flex bg-white/80 backdrop-blur p-1 rounded-xl shadow-sm mb-6 border border-blue-100">
                  <button
                    onClick={() => setAdvTab('self')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                      advTab === 'self' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    {t.tabSelf}
                  </button>
                  <button
                    onClick={() => setAdvTab('pk')}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                      advTab === 'pk' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-500'
                    }`}
                  >
                    {t.tabPK}
                  </button>
                </div>

                {advTab === 'self' ? (
                  <>
                    <div className="text-center mb-6">
                      <h2 className="text-xl font-bold text-blue-900">{t.carbonAdv}</h2>
                      <p className="text-xs text-blue-600 mt-1">{t.advDesc}</p>
                    </div>

                    <div className="relative w-full flex flex-col items-center py-6 space-y-16">
                      <div className="absolute top-10 bottom-10 w-2 bg-blue-200 rounded-full z-0"></div>
                      {LEVELS_DATA.map((level, index) => {
                        const isUnlocked = level.id <= currentLevel;
                        const isCurrent = level.id === currentLevel;
                        const isCompleted = level.id < currentLevel;
                        const isLeft = index % 2 === 0;

                        return (
                          <div
                            key={level.id}
                            className={`relative z-10 flex w-full ${
                              isLeft ? 'justify-start' : 'justify-end'
                            } px-4`}
                          >
                            <motion.button
                              whileHover={isUnlocked ? { scale: 1.05 } : {}}
                              whileTap={isUnlocked ? { scale: 0.95 } : {}}
                              onClick={() => startLevel(level.id)}
                              className={`relative flex flex-col items-center p-4 rounded-2xl shadow-lg w-40 transition-all ${
                                isCurrent
                                  ? 'bg-blue-600 text-white shadow-blue-300 ring-4 ring-blue-200'
                                  : isCompleted
                                  ? 'bg-sky-400 text-white'
                                  : 'bg-slate-200 text-slate-400'
                              }`}
                            >
                              {isCompleted ? (
                                <CheckCircle size={28} />
                              ) : isCurrent ? (
                                <Star size={28} className="text-yellow-300 fill-yellow-300" />
                              ) : (
                                <Lock size={28} />
                              )}
                              <span className="font-bold mt-2 text-sm">{level.title}</span>
                              <span className="text-[10px] mt-1 opacity-90 text-center leading-tight">
                                {getLocalizedContent(level.subtitle, lang)}
                              </span>
                            </motion.button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 bg-white/60 rounded-3xl border border-white shadow-sm mt-4">
                    <div className="w-32 h-32 bg-gradient-to-br from-yellow-300 to-amber-500 rounded-full flex items-center justify-center shadow-xl shadow-amber-200 mb-6 border-4 border-white">
                      <Crown size={64} className="text-white drop-shadow-md" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">
                      {t.pkTitle}: Gold I
                    </h2>
                    <p className="text-center text-sm text-slate-500 px-6 mb-10">
                      {t.pkDesc}
                    </p>
                    <button className="bg-blue-600 text-white font-bold text-lg py-4 px-10 rounded-full shadow-lg shadow-blue-200 flex items-center active:scale-95 transition-transform">
                      <Swords size={20} className="mr-2" /> {t.findMatch}
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {currentTab === 'community' && (
              <motion.div
                key="community"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 space-y-6 h-full w-full overflow-y-auto"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl p-5 text-white shadow-lg flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-lg">{t.myRank}</h2>
                    <p className="text-xs text-indigo-100 mt-1">{t.topGuardian}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black italic">{points}</div>
                    <div className="text-[10px] text-indigo-100">{t.totalPoints}</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center">
                      <Medal size={18} className="text-blue-500 mr-2" />
                      {t.leaderboard}
                    </h3>
                    <button className="text-xs text-blue-600 font-medium flex items-center bg-blue-50 px-2 py-1 rounded-full">
                      <UserPlus size={14} className="mr-1" />
                      {t.addFriend}
                    </button>
                  </div>
                  <div className="space-y-3">
                    {MOCK_FRIENDS.map((friend, idx) => (
                      <div
                        key={friend.id}
                        className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="font-bold text-slate-300 w-4 text-center">{idx + 1}</div>
                          <div
                            className={`w-10 h-10 rounded-full ${friend.avatarColor} flex items-center justify-center text-white font-bold shadow-inner`}
                          >
                            {friend.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-700">{friend.name}</div>
                            <div className="text-[10px] text-slate-500 flex items-center mt-0.5">
                              Streak: {friend.streak} {t.days}
                              <Flame size={10} className="text-orange-400 ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="font-bold text-blue-600 text-sm flex items-center">
                          {friend.points}
                          <Star size={12} className="ml-1 text-yellow-400 fill-yellow-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentTab === 'shop' && (
              <motion.div
                key="shop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 h-full w-full overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-bold text-xl text-slate-800 flex items-center">
                    <Store size={24} className="text-blue-500 mr-2" />
                    {t.shopTitle}
                  </h2>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                    <Star size={14} className="mr-1 text-yellow-500 fill-yellow-500" />
                    {points}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {SHOP_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center"
                    >
                      <div className="text-4xl mb-3 bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center">
                        <img src={item.icon} alt={item.en} className="w-20 h-20 object-contain" />
                      </div>
                      <div className="text-xs font-bold text-slate-700 leading-tight mb-2 h-8 flex items-center justify-center">
                        {lang === 'en' ? item.en : item.zh}
                      </div>
                      <div className="text-sm font-bold text-blue-600 flex items-center mb-3">
                        <Star size={12} className="mr-1" /> {item.price}
                      </div>
                      <button
                        onClick={() => buyItem(item.price)}
                        className="w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-lg active:scale-95 transition-transform shadow-sm shadow-blue-200"
                      >
                        {t.exchange}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-5 space-y-4 h-full w-full overflow-y-auto"
              >
                <h2 className="font-bold text-xl text-slate-800 mb-6">{t.settingsTitle}</h2>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center font-medium text-slate-700">
                      <Globe size={20} className="text-blue-500 mr-3" />
                      {t.language}
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-lg">
                      <button
                        onClick={() => setLang('en')}
                        className={`px-3 py-1 text-xs font-bold rounded-md ${
                          lang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
                        }`}
                      >
                        EN
                      </button>
                      <button
                        onClick={() => setLang('zh')}
                        className={`px-3 py-1 text-xs font-bold rounded-md ${
                          lang === 'zh' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
                        }`}
                      >
                        中文
                      </button>
                    </div>
                  </div>

                  <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                    <div className="flex items-center font-medium text-slate-700">
                      <Bell size={20} className="text-blue-500 mr-3" />
                      {t.notifications}
                    </div>
                    <div className="w-10 h-6 bg-blue-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>

                  <div className="p-4 flex justify-between items-center">
                    <div className="flex items-center font-medium text-slate-700">
                      <CircleHelp size={20} className="text-blue-500 mr-3" />
                      {t.about}
                    </div>
                    <ChevronRight size={20} className="text-slate-300" />
                  </div>
                </div>
              </motion.div>
            )}

            {currentTab === 'lesson' && activeLevel && (
              <motion.div
                key="lesson"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="p-6 h-full w-full flex flex-col bg-white overflow-y-auto"
              >
                <div className="mb-6 shrink-0">
                  <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                    <span>{activeLevel.title}</span>
                    <span className="text-blue-600">
                      {lessonPhase === 'preview'
                        ? '0. Preview'
                        : lessonPhase === 'pre-quiz'
                        ? '1. Pre-Class Quiz'
                        : lessonPhase === 'video'
                        ? '2. Video Lesson'
                        : lessonPhase === 'post-quiz'
                        ? '3. Post-Class Quiz'
                        : '4. Results'}
                    </span>
                  </div>

                  <div className="flex space-x-1">
                    {['preview', 'pre-quiz', 'video', 'post-quiz', 'comparison'].map(
                      (phase, i) => {
                        const phases = [
                          'preview',
                          'pre-quiz',
                          'video',
                          'post-quiz',
                          'comparison',
                        ];
                        const currentIndex = phases.indexOf(lessonPhase);

                        return (
                          <div
                            key={phase}
                            className={`h-1.5 flex-1 rounded-full ${
                              i <= currentIndex ? 'bg-blue-500' : 'bg-slate-100'
                            }`}
                          />
                        );
                      }
                    )}
                  </div>
                </div>

                {lessonPhase === 'preview' && (
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">{t.previewTitle}</h2>

                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-blue-600 mb-3 uppercase tracking-wider">
                        {t.characters}
                      </h3>

                      <div className="flex overflow-x-auto space-x-4 pb-2">
                        {activeLevel.preview.characters.map((char, idx) => (
                          <div
                            key={idx}
                            className="shrink-0 flex flex-col items-center bg-slate-50 p-3 rounded-xl border border-slate-100 w-32"
                          >
                            <div className="flex space-x-2 mb-2">
                              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-400">
                                <ImageIcon size={20} />
                              </div>
                              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-400">
                                <ImageIcon size={20} />
                              </div>
                            </div>

                            <span className="text-xs font-bold text-slate-700 text-center">
                              {char.name}
                            </span>

                            <span className="text-[9px] text-slate-400 text-center mt-1">
                              {char.type}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-blue-600 mb-3 uppercase tracking-wider">
                        {t.coreKnowledge}
                      </h3>

                      <div className="space-y-3">
                        {activeLevel.preview.knowledge.map((k, idx) => (
                          <div
                            key={idx}
                            className="bg-blue-50 p-4 rounded-xl border border-blue-100"
                          >
                            <p className="text-sm text-slate-700 font-medium leading-relaxed">
                              {getLocalizedContent(k, lang)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 pb-4">
                      <button
                        onClick={() => setLessonPhase('pre-quiz')}
                        className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-blue-600 shadow-lg shadow-blue-200 flex justify-center items-center active:scale-95 transition-transform"
                      >
                        {t.startPreQuiz}
                        <ChevronRight size={20} className="ml-1" />
                      </button>
                    </div>
                  </div>
                )}

                {(lessonPhase === 'pre-quiz' || lessonPhase === 'post-quiz') && (
                  <div className="flex-1 flex flex-col">
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-slate-800 leading-snug">
                        <span className="text-blue-500 mr-2">Q{qIndex + 1}.</span>
                        {getLocalizedContent(activeLevel.quiz[qIndex].q, lang)}
                      </h2>
                    </div>

                    <div className="space-y-3 flex-1">
                      {(lang === 'en'
                        ? activeLevel.quiz[qIndex].options.en
                        : activeLevel.quiz[qIndex].options.zh
                      ).map((opt, idx) => {
                        let btnClass =
                          'w-full text-left p-4 rounded-2xl border-2 transition-all font-medium ';
                        const isCorrectOpt = idx === activeLevel.quiz[qIndex].correct;

                        if (quizState === 'answering') {
                          btnClass +=
                            selectedOption === idx
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200';
                        } else {
                          if (isCorrectOpt) {
                            btnClass += 'border-green-500 bg-green-50 text-green-700';
                          } else if (selectedOption === idx) {
                            btnClass += 'border-red-400 bg-red-50 text-red-600';
                          } else {
                            btnClass +=
                              'border-slate-200 bg-slate-50 text-slate-400 opacity-50';
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={quizState === 'result'}
                            onClick={() => setSelectedOption(idx)}
                            className={btnClass}
                          >
                            <div className="flex justify-between items-center gap-3">
                              <span>{opt}</span>

                              {quizState === 'result' && isCorrectOpt && (
                                <CheckCircle size={20} className="text-green-500 shrink-0" />
                              )}

                              {quizState === 'result' &&
                                selectedOption === idx &&
                                !isCorrectOpt && (
                                  <XCircle size={20} className="text-red-400 shrink-0" />
                                )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <AnimatePresence>
                      {quizState === 'result' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: 20 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: 10 }}
                          className={`mt-6 p-4 rounded-2xl border ${
                            selectedOption === activeLevel.quiz[qIndex].correct
                              ? 'bg-green-50 border-green-100'
                              : 'bg-red-50 border-red-100'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="shrink-0">
                              <HerrySprite mood={spriteMood} className="w-12 h-12" />
                            </div>

                            <div className="flex-1">
                              <h4
                                className={`font-bold mb-1 ${
                                  selectedOption === activeLevel.quiz[qIndex].correct
                                    ? 'text-green-800'
                                    : 'text-red-800'
                                }`}
                              >
                                {selectedOption === activeLevel.quiz[qIndex].correct
                                  ? t.correct
                                  : t.incorrect}
                              </h4>

                              <p
                                className={`text-xs leading-relaxed ${
                                  selectedOption === activeLevel.quiz[qIndex].correct
                                    ? 'text-green-700'
                                    : 'text-red-700'
                                }`}
                              >
                                {getLocalizedContent(activeLevel.quiz[qIndex].exp, lang)}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="mt-6 mb-4">
                      {quizState === 'answering' ? (
                        <button
                          onClick={submitAnswer}
                          disabled={selectedOption === null}
                          className={`w-full py-4 rounded-2xl font-bold text-lg transition-colors ${
                            selectedOption !== null
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 active:scale-95'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          {t.submitAnswer}
                        </button>
                      ) : (
                        <button
                          onClick={nextStep}
                          className="w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg flex justify-center items-center active:scale-95 transition-transform bg-blue-600 shadow-blue-200"
                        >
                          {qIndex < activeLevel.quiz.length - 1
                            ? t.nextQuestion
                            : lessonPhase === 'pre-quiz'
                            ? t.watchVideo
                            : t.seeResults}
                          <ChevronRight size={20} className="ml-1" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {lessonPhase === 'video' && (
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 mb-2 leading-snug">
                      {getLocalizedContent(activeLevel.subtitle, lang) || activeLevel.title}
                    </h2>

                    <p className="text-sm text-slate-500 mb-6">{t.videoIntro}</p>

                    <div className="w-full bg-black rounded-2xl overflow-hidden shadow-lg aspect-video flex items-center justify-center relative">
                      <iframe
                        width="100%"
                        height="100%"
                        src={activeLevel.videoUrl}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>

                    <div className="mt-auto pt-6 pb-4">
                      <button
                        onClick={() => {
                          setLessonPhase('post-quiz');
                          setQIndex(0);
                          setSelectedOption(null);
                          setQuizState('answering');
                        }}
                        disabled={videoTimeLeft > 0}
                        className={`w-full py-4 rounded-2xl font-bold text-lg flex justify-center items-center transition-all ${
                          videoTimeLeft > 0
                            ? 'bg-slate-200 text-slate-400'
                            : 'bg-blue-600 text-white shadow-lg shadow-blue-200 active:scale-95'
                        }`}
                      >
                        {videoTimeLeft > 0
                          ? t.videoWait.replace('{time}', String(videoTimeLeft))
                          : t.startPostQuiz}
                        {videoTimeLeft <= 0 && <ChevronRight size={20} className="ml-1" />}
                      </button>
                    </div>
                  </div>
                )}

                {lessonPhase === 'comparison' && (
                  <div className="flex-1 flex flex-col items-center justify-center text-center pb-4">
                    <Trophy size={64} className="text-yellow-400 mb-6" />

                    <h2 className="text-2xl font-black text-slate-800 mb-2">
                      {t.comparisonTitle}
                    </h2>

                    <div className="w-full flex justify-between items-center bg-slate-50 p-6 rounded-3xl border border-slate-100 my-8">
                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase mb-2">
                          {t.preScore}
                        </span>
                        <span className="text-3xl font-black text-slate-700">
                          {preQuizScore}/{activeLevel.quiz.length}
                        </span>
                      </div>

                      <ChevronRight size={32} className="text-blue-300" />

                      <div className="flex flex-col items-center">
                        <span className="text-xs font-bold text-slate-400 uppercase mb-2">
                          {t.postScore}
                        </span>
                        <span className="text-3xl font-black text-blue-600">
                          {postQuizScore}/{activeLevel.quiz.length}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm font-medium text-slate-600 px-4 mb-auto">
                      {postQuizScore > preQuizScore ||
                      (preQuizScore === activeLevel.quiz.length &&
                        postQuizScore === activeLevel.quiz.length)
                        ? t.praiseMsg
                        : t.encourageMsg}
                    </p>

                    <div className="w-full pt-6 mt-auto">
                      <button
                        onClick={() => setCurrentTab('map')}
                        className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-blue-600 shadow-lg shadow-blue-200 flex justify-center items-center active:scale-95 transition-transform"
                      >
                        {t.finishLesson}
                        <CheckCircle size={20} className="ml-2" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {currentTab !== 'lesson' && (
          <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} t={t} />
        )}

        <AnimatePresence>
          {activeHomeModal === 'planting' && (
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className="absolute inset-0 z-50 bg-gradient-to-b from-sky-100 to-green-100 flex flex-col"
            >
              <div className="p-4 flex items-center bg-white/50 backdrop-blur-md border-b border-white/50 sticky top-0 z-20">
                <button
                  onClick={() => setActiveHomeModal(null)}
                  className="p-2 bg-white rounded-full shadow-sm text-slate-600 mr-3"
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="font-bold text-green-900 text-lg">{t.myForest}</h2>
              </div>

              <div className="absolute inset-0 z-0 opacity-40 pointer-events-none overflow-hidden pt-20">
                <div className="flex flex-wrap gap-4 p-6 justify-center">
                  {forest.map((tree, idx) => (
                    <div key={`${tree.id}-${idx}`} className="flex flex-col items-center">
                      <TreeDeciduous size={40} className="text-emerald-700" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-1 relative z-10 flex flex-col items-center justify-center p-6">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' as const}}
                >
                  {getPlantState().icon}
                </motion.div>

                <div className="mt-8 bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white w-full max-w-xs text-center">
                  <div className="font-bold text-slate-800 text-xl mb-1">
                    {lang === 'en'
                      ? SPECIES[currentSpeciesIdx].nameEn
                      : SPECIES[currentSpeciesIdx].nameZh}
                  </div>
                  <div className="text-sm text-slate-500 font-medium mb-4">
                    {getPlantState().phase} • {plantDays} / 30 {t.days}
                  </div>

                  <div className="w-full bg-slate-200 h-3 rounded-full mb-6 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full transition-all duration-300"
                      style={{ width: `${(plantDays / 30) * 100}%` }}
                    />
                  </div>

                  {plantDays >= 30 ? (
                    <button
                      onClick={handleHarvest}
                      className="bg-emerald-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-emerald-200 flex items-center w-full justify-center active:scale-95 transition-transform"
                    >
                      <TreeDeciduous size={20} className="mr-2" />
                      {t.harvestBtn}
                    </button>
                  ) : (
                    <button
                      onClick={handleWater}
                      className="bg-blue-500 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-blue-200 flex items-center w-full justify-center active:scale-95 transition-transform"
                    >
                      <Droplets size={20} className="mr-2" />
                      {t.waterBtn}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeHomeModal === 'badges' && (
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              className="absolute inset-0 z-50 bg-slate-50 flex flex-col"
            >
              <div className="p-4 flex items-center bg-white border-b border-slate-100 sticky top-0 z-20 shadow-sm">
                <button
                  onClick={() => setActiveHomeModal(null)}
                  className="p-2 bg-slate-100 rounded-full text-slate-600 mr-3"
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="font-bold text-slate-800 text-lg">{t.allBadges}</h2>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-8 pb-10">
                {[
                  { cat: 'Course', title: t.badgeCatCourse },
                  { cat: 'PK', title: t.badgeCatPK },
                  { cat: 'Daily', title: t.badgeCatDaily },
                  { cat: 'Plant', title: t.badgeCatPlant },
                  { cat: 'Scale', title: t.badgeCatScale },
                ].map((category) => (
                  <div key={category.cat}>
                    <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider pl-1">
                      {category.title}
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {BADGES_DATA.filter((b) => b.cat === category.cat).map((badge) => (
                        <div
                          key={badge.id}
                          onClick={() => setSelectedBadge(badge)}
                          className={`flex flex-col items-center p-3 rounded-2xl border cursor-pointer transition-transform active:scale-95 ${
                            badge.unlocked
                              ? 'bg-white border-blue-100 shadow-sm'
                              : 'bg-slate-100 border-slate-200 grayscale opacity-60'
                          }`}
                        >
                          <div className="text-3xl mb-2">{badge.icon}</div>
                          <div className="text-[10px] text-center font-bold leading-tight text-slate-700 h-8 flex items-center justify-center">
                            {lang === 'en' ? badge.en : badge.zh}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <AnimatePresence>
                {selectedBadge && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6"
                    onClick={() => setSelectedBadge(null)}
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 20 }}
                      animate={{ scale: 1, y: 0 }}
                      exit={{ scale: 0.9, y: 20 }}
                      className="bg-white rounded-3xl p-6 w-full max-w-xs text-center shadow-2xl relative"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setSelectedBadge(null)}
                        className="absolute top-4 right-4 text-slate-400 bg-slate-100 rounded-full p-1"
                      >
                        <XCircle size={24} />
                      </button>

                      <div
                        className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-5xl mb-4 shadow-inner ${
                          selectedBadge.unlocked
                            ? 'bg-blue-50 border-4 border-blue-100'
                            : 'bg-slate-100 border-4 border-slate-200 grayscale'
                        }`}
                      >
                        {selectedBadge.icon}
                      </div>

                      <h3 className="text-xl font-black text-slate-800 mb-1">
                        {lang === 'en' ? selectedBadge.en : selectedBadge.zh}
                      </h3>

                      <div
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold mb-6 ${
                          selectedBadge.unlocked
                            ? 'bg-green-100 text-green-700'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {selectedBadge.unlocked ? t.unlocked : t.locked}
                      </div>

                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-left">
                        <div className="text-[10px] font-bold text-slate-400 uppercase mb-1 flex items-center">
                          <Info size={12} className="mr-1" /> {t.condition}
                        </div>
                        <div className="text-sm font-medium text-slate-700">
                          {lang === 'en'
                            ? selectedBadge.condition.en
                            : selectedBadge.condition.zh}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}