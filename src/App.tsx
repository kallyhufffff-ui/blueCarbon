import React, { useState } from 'react';
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
} from 'lucide-react';

// ================= MOCK DATA =================
const LEVELS_DATA = [
  {
    id: 1,
    title: 'Lesson 1',
    subtitle: "What is the Mysterious 'Blue Carbon'?",
    videoUrl: 'https://www.youtube.com/embed/AQNe83Cwp1M',
    isYouTube: true,
    preQuiz: [
      {
        q: "Before we start, what do you think 'Blue Carbon' is?",
        options: [
          'Carbon in industrial exhaust',
          'Carbon captured by ocean and coastal ecosystems',
          'Carbon absorbed by forest plants',
          'Carbon from burning coal',
        ],
        correct: 1,
        exp: "Great guess! Let's watch the video to learn exactly how oceans and coasts capture carbon.",
      },
    ],
    postQuiz: [
      {
        q: 'Which of the following is NOT one of the three typical blue carbon ecosystems?',
        options: ['Mangroves', 'Seagrass beds', 'Coral reefs', 'Salt marshes'],
        correct: 2,
        exp: "While coral reefs are important, the three typical 'blue carbon ecosystems' are mangroves, seagrass beds, and salt marshes.",
      },
    ],
  },
  {
    id: 2,
    title: 'Lesson 2',
    subtitle: 'Mangroves: The Superheroes of the Coast',
    videoUrl: 'https://www.youtube.com/embed/AQNe83Cwp1M',
    isYouTube: false,
    preQuiz: [
      {
        q: 'Why do you think mangroves can survive in seawater?',
        options: [
          "They don't need water",
          'They have special mechanisms to filter salt',
          'Seawater is actually fresh water',
          'Their roots never touch the water',
        ],
        correct: 1,
        exp: "Let's dive into the video to see their amazing superpowers!",
      },
    ],
    postQuiz: [
      {
        q: 'Besides storing carbon, what is another major role of mangroves?',
        options: [
          'Providing timber for buildings',
          'Protecting coastlines from storms and waves',
          'Extracting oil',
          'Increasing seawater salinity',
        ],
        correct: 1,
        exp: "Mangroves are known as 'Coastal Guardians'. Their complex root systems effectively break waves and protect shores.",
      },
    ],
  },
  {
    id: 3,
    title: 'Lesson 3',
    subtitle: 'Where is the Carbon Storage Room?',
    videoUrl: 'https://www.youtube.com/embed/AQNe83Cwp1M',
    isYouTube: false,
    preQuiz: [
      {
        q: 'Where do you think mangroves store most of their captured carbon?',
        options: [
          'In their leaves',
          'In their branches',
          'In the soil beneath them',
          'In the air around them',
        ],
        correct: 2,
        exp: "Let's watch the video to find the hidden 'Carbon Storage Room'!",
      },
    ],
    postQuiz: [
      {
        q: 'Why is the soil of mangrove forests so good at storing carbon for a long time?',
        options: [
          'Because it is very dry',
          'Because it is an anaerobic (low oxygen) environment',
          'Because it is very hot',
          'Because animals eat the carbon',
        ],
        correct: 1,
        exp: 'The waterlogged, anaerobic soil slows down decomposition, allowing carbon to be stored for thousands of years!',
      },
    ],
  },
];

const MOCK_FRIENDS = [
  {
    id: 1,
    name: 'Ocean Breeze',
    points: 1250,
    streak: 12,
    avatarColor: 'bg-sky-400',
  },
  {
    id: 2,
    name: 'Eco Warrior',
    points: 980,
    streak: 5,
    avatarColor: 'bg-indigo-400',
  },
  {
    id: 3,
    name: 'Carbon Master',
    points: 850,
    streak: 3,
    avatarColor: 'bg-blue-400',
  },
];

// ================= COMPONENTS =================

const BottomNav = ({ currentTab, setCurrentTab }) => (
  <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-blue-100 flex justify-around py-3 z-50 rounded-t-2xl shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
    <button
      onClick={() => setCurrentTab('home')}
      className={`flex flex-col items-center transition-colors ${
        currentTab === 'home' ? 'text-blue-600' : 'text-slate-400'
      }`}
    >
      <Home
        size={24}
        className={currentTab === 'home' ? 'drop-shadow-md' : ''}
      />
      <span className="text-xs mt-1 font-medium">Home</span>
    </button>
    <button
      onClick={() => setCurrentTab('map')}
      className={`flex flex-col items-center transition-colors ${
        currentTab === 'map' ? 'text-blue-600' : 'text-slate-400'
      }`}
    >
      <MapIcon
        size={24}
        className={currentTab === 'map' ? 'drop-shadow-md' : ''}
      />
      <span className="text-xs mt-1 font-medium">Adventure</span>
    </button>
    <button
      onClick={() => setCurrentTab('community')}
      className={`flex flex-col items-center transition-colors ${
        currentTab === 'community' ? 'text-blue-600' : 'text-slate-400'
      }`}
    >
      <Users
        size={24}
        className={currentTab === 'community' ? 'drop-shadow-md' : ''}
      />
      <span className="text-xs mt-1 font-medium">Community</span>
    </button>
  </div>
);

// 修改点 1：增加 className 参数，默认是 w-32 h-32，这样可以在不同地方复用不同大小
const HerrySprite = ({ mood = 'happy', className = 'w-32 h-32' }) => {
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
          transition: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' },
        };

  return (
    <motion.div
      animate={animation}
      className={`${className} mx-auto relative drop-shadow-xl flex justify-center items-center`}
    >
      <img
        src="/herry.png"
        alt="Herry the Mangrove Sprite"
        className="w-full h-full object-contain drop-shadow-md"
      />
    </motion.div>
  );
};

// ================= MAIN APP =================
export default function BlueCarbonApp() {
  const [currentTab, setCurrentTab] = useState('home');
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [points, setPoints] = useState(120);
  const [streak, setStreak] = useState(3);
  const [currentLevel, setCurrentLevel] = useState(1);

  const [activeLevel, setActiveLevel] = useState(null);
  const [lessonPhase, setLessonPhase] = useState('pre-quiz');
  const [qIndex, setQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizState, setQuizState] = useState('answering');
  const [spriteMood, setSpriteMood] = useState('happy');

  const startLevel = (levelId) => {
    if (levelId > currentLevel) return;
    const level = LEVELS_DATA.find((l) => l.id === levelId);
    setActiveLevel(level);
    setLessonPhase('pre-quiz');
    setQIndex(0);
    setSelectedOption(null);
    setQuizState('answering');
    setCurrentTab('lesson');
    setSpriteMood('happy');
  };

  const submitAnswer = () => {
    if (selectedOption === null) return;
    setQuizState('result');

    const currentQuiz =
      lessonPhase === 'pre-quiz' ? activeLevel.preQuiz : activeLevel.postQuiz;
    const isCorrect = selectedOption === currentQuiz[qIndex].correct;

    if (isCorrect) {
      setSpriteMood('excited');
      if (activeLevel.id === currentLevel) setPoints((p) => p + 15);
    } else {
      setSpriteMood('sad');
    }
  };

  const nextStep = () => {
    const currentQuiz =
      lessonPhase === 'pre-quiz' ? activeLevel.preQuiz : activeLevel.postQuiz;
    const isCorrect = selectedOption === currentQuiz[qIndex].correct;

    if (isCorrect) {
      if (qIndex < currentQuiz.length - 1) {
        setQIndex((q) => q + 1);
        setSelectedOption(null);
        setQuizState('answering');
        setSpriteMood('happy');
      } else {
        if (lessonPhase === 'pre-quiz') {
          setLessonPhase('video');
          setSpriteMood('happy');
        } else if (lessonPhase === 'post-quiz') {
          if (!hasCheckedIn) {
            setHasCheckedIn(true);
            setStreak((s) => s + 1);
            setPoints((p) => p + 20);
          }

          if (activeLevel.id === currentLevel) {
            setCurrentLevel((prev) => prev + 1);
            setPoints((p) => p + 50);
          }

          setCurrentTab('home');
          setSpriteMood('excited');
          setTimeout(() => setSpriteMood('happy'), 3000);
        }
      }
    } else {
      setSelectedOption(null);
      setQuizState('answering');
      setSpriteMood('happy');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center font-sans text-slate-800">
      <div className="w-full max-w-md bg-white min-h-screen relative pb-20 shadow-2xl overflow-hidden flex flex-col">
        {/* Top Status Bar */}
        <div className="bg-gradient-to-r from-blue-600 to-sky-500 text-white p-4 flex justify-between items-center rounded-b-3xl shadow-md z-10 relative shrink-0">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
              <Droplets size={20} className="text-sky-100" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight tracking-wide">
                Blue Carbon
              </h1>
              <p className="text-xs text-sky-100 opacity-90">
                Lv.{currentLevel} Guardian
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end bg-black/15 px-3 py-1.5 rounded-xl backdrop-blur-sm">
            <span className="text-sky-100 text-[10px] font-medium mb-0.5">
              Carbon Points
            </span>
            <span className="flex items-center font-bold text-sm">
              <Star
                size={14}
                className="mr-1 text-yellow-300 fill-yellow-300"
              />{' '}
              {points}
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            {/* ================= HOME TAB ================= */}
            {currentTab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-5 space-y-6"
              >
                {/* Herry Interaction Area */}
                <div className="relative bg-gradient-to-b from-sky-50 to-blue-50 rounded-3xl p-6 text-center border border-blue-100 shadow-inner">
                  <HerrySprite mood={spriteMood} />
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none inline-block shadow-md text-sm text-slate-600 relative mt-2 border border-blue-50">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-white border-l border-t border-blue-50 transform rotate-45"></div>
                    <p className="relative z-10 font-medium">
                      {hasCheckedIn
                        ? '“Great job! We absorbed so much CO2 today! See you tomorrow!”'
                        : "“Hi! I'm Herry. Complete a lesson today to keep our streak going!”"}
                    </p>
                  </div>
                </div>

                {/* Daily Mission (Auto Check-in) */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-blue-100">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <h2 className="font-bold text-slate-800 flex items-center text-lg">
                        <CheckCircle size={20} className="text-blue-500 mr-2" />
                        Daily Mission
                      </h2>
                      <p className="text-xs text-slate-500 mt-1 flex items-center">
                        Guarding for{' '}
                        <Flame size={14} className="text-orange-500 mx-1" />{' '}
                        <strong className="text-orange-500 text-sm">
                          {streak}
                        </strong>{' '}
                        days
                      </p>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full text-xs font-bold flex items-center ${
                        hasCheckedIn
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-orange-100 text-orange-600 border border-orange-200'
                      }`}
                    >
                      {hasCheckedIn ? (
                        <>
                          <CheckCircle size={14} className="mr-1" /> Completed
                        </>
                      ) : (
                        <>
                          <Star size={14} className="mr-1" /> Incomplete
                        </>
                      )}
                    </div>
                  </div>

                  {/* 7-Day Streak Tracker */}
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
                            {isPast || isCheckedToday ? (
                              <CheckCircle size={16} />
                            ) : (
                              day + 1
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">
                            Day {day + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= MAP TAB ================= */}
            {currentTab === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-5 min-h-full bg-sky-50 relative"
                style={{
                  backgroundImage:
                    'radial-gradient(#bae6fd 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-blue-900">
                    Carbon Adventure
                  </h2>
                  <p className="text-xs text-blue-600 mt-1">
                    Complete lessons to unlock knowledge
                  </p>
                </div>

                {currentLevel > LEVELS_DATA.length ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-6 rounded-3xl shadow-xl text-center border-2 border-yellow-300 relative overflow-hidden mt-10"
                  >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300"></div>
                    <Trophy
                      size={48}
                      className="text-yellow-400 mx-auto mb-4"
                    />
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">
                      Congratulations!
                    </h3>
                    <p className="text-sm text-slate-600 mb-6">
                      You have mastered all the basic Blue Carbon knowledge.
                      Herry is so proud of you!
                    </p>
                    <HerrySprite mood="excited" />
                    <button
                      onClick={() => {
                        setCurrentLevel(1);
                        setHasCheckedIn(false);
                      }}
                      className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg shadow-blue-200 w-full"
                    >
                      Play Again
                    </button>
                  </motion.div>
                ) : (
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
                              <Star
                                size={28}
                                className="text-yellow-300 fill-yellow-300"
                              />
                            ) : (
                              <Lock size={28} />
                            )}

                            <span className="font-bold mt-2 text-sm">
                              {level.title}
                            </span>
                            <span className="text-[10px] mt-1 opacity-90 text-center leading-tight">
                              {level.subtitle}
                            </span>

                            {isCurrent && (
                              <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute -top-10 bg-white text-blue-600 text-xs py-1.5 px-3 rounded-full font-bold shadow-md whitespace-nowrap border border-blue-100"
                              >
                                Start Here!
                                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-blue-100 rotate-45"></div>
                              </motion.div>
                            )}
                          </motion.button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}

            {/* ================= COMMUNITY TAB ================= */}
            {currentTab === 'community' && (
              <motion.div
                key="community"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-5 space-y-6"
              >
                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl p-5 text-white shadow-lg flex justify-between items-center">
                  <div>
                    <h2 className="font-bold text-lg">My Rank</h2>
                    <p className="text-xs text-indigo-100 mt-1">
                      Top 25% of Guardians
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black italic">{points}</div>
                    <div className="text-[10px] text-indigo-100">
                      Total Points
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-slate-800 flex items-center">
                      <Medal size={18} className="text-blue-500 mr-2" />
                      Leaderboard
                    </h3>
                    <button className="text-xs text-blue-600 font-medium flex items-center bg-blue-50 px-2 py-1 rounded-full">
                      <UserPlus size={14} className="mr-1" /> Add Friend
                    </button>
                  </div>

                  <div className="space-y-3">
                    {MOCK_FRIENDS.map((friend, idx) => (
                      <div
                        key={friend.id}
                        className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="font-bold text-slate-300 w-4 text-center">
                            {idx + 1}
                          </div>
                          <div
                            className={`w-10 h-10 rounded-full ${friend.avatarColor} flex items-center justify-center text-white font-bold shadow-inner`}
                          >
                            {friend.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-slate-700">
                              {friend.name}
                            </div>
                            <div className="text-[10px] text-slate-500 flex items-center mt-0.5">
                              Streak: {friend.streak} days{' '}
                              <Flame
                                size={10}
                                className="text-orange-400 ml-1"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="font-bold text-blue-600 text-sm flex items-center">
                          {friend.points}{' '}
                          <Star
                            size={12}
                            className="ml-1 text-yellow-400 fill-yellow-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ================= LESSON / QUIZ TAB ================= */}
            {currentTab === 'lesson' && activeLevel && (
              <motion.div
                key="lesson"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 h-full flex flex-col bg-white"
              >
                {/* Progress Header */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                    <span>{activeLevel.title}</span>
                    <span className="text-blue-600">
                      {lessonPhase === 'pre-quiz'
                        ? '1. Pre-Class Quiz'
                        : lessonPhase === 'video'
                        ? '2. Video Lesson'
                        : '3. Post-Class Quiz'}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <div
                      className={`h-2 flex-1 rounded-full ${
                        lessonPhase === 'pre-quiz'
                          ? 'bg-blue-500'
                          : 'bg-blue-200'
                      }`}
                    />
                    <div
                      className={`h-2 flex-1 rounded-full ${
                        lessonPhase === 'video'
                          ? 'bg-blue-500'
                          : lessonPhase === 'post-quiz'
                          ? 'bg-blue-200'
                          : 'bg-slate-100'
                      }`}
                    />
                    <div
                      className={`h-2 flex-1 rounded-full ${
                        lessonPhase === 'post-quiz'
                          ? 'bg-blue-500'
                          : 'bg-slate-100'
                      }`}
                    />
                  </div>
                </div>

                {/* --- VIDEO PHASE --- */}
                {lessonPhase === 'video' ? (
                  <div className="flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                      {activeLevel.subtitle}
                    </h2>
                    <p className="text-sm text-slate-500 mb-6">
                      Watch the video to uncover the secrets!
                    </p>

                    <div className="w-full bg-black rounded-2xl overflow-hidden shadow-lg aspect-video flex items-center justify-center relative">
                      {activeLevel.isYouTube ? (
                        <iframe
                          width="100%"
                          height="100%"
                          src={activeLevel.videoUrl}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <video
                          controls
                          className="w-full h-full object-cover"
                          poster="https://images.unsplash.com/photo-1596324121712-5bbc14482174?auto=format&fit=crop&w=800&q=80"
                        >
                          <source src={activeLevel.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>

                    <div className="mt-auto pt-6">
                      <button
                        onClick={() => {
                          setLessonPhase('post-quiz');
                          setQIndex(0);
                          setSelectedOption(null);
                          setQuizState('answering');
                        }}
                        className="w-full py-4 rounded-2xl font-bold text-lg text-white bg-blue-600 shadow-lg shadow-blue-200 flex justify-center items-center"
                      >
                        Continue to Quiz{' '}
                        <ChevronRight size={20} className="ml-1" />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* --- QUIZ PHASE --- */
                  <>
                    <div className="mb-6">
                      <h2 className="text-xl font-bold text-slate-800 leading-snug">
                        {lessonPhase === 'pre-quiz'
                          ? activeLevel.preQuiz[qIndex].q
                          : activeLevel.postQuiz[qIndex].q}
                      </h2>
                    </div>

                    <div className="space-y-3 flex-1">
                      {(lessonPhase === 'pre-quiz'
                        ? activeLevel.preQuiz
                        : activeLevel.postQuiz)[qIndex].options.map(
                        (opt, idx) => {
                          const currentQuiz =
                            lessonPhase === 'pre-quiz'
                              ? activeLevel.preQuiz
                              : activeLevel.postQuiz;
                          let btnClass =
                            'w-full text-left p-4 rounded-2xl border-2 transition-all font-medium ';
                          const isCorrectOpt =
                            idx === currentQuiz[qIndex].correct;

                          if (quizState === 'answering') {
                            btnClass +=
                              selectedOption === idx
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200';
                          } else {
                            if (isCorrectOpt) {
                              btnClass +=
                                'border-green-500 bg-green-50 text-green-700';
                            } else if (selectedOption === idx) {
                              btnClass +=
                                'border-red-400 bg-red-50 text-red-600';
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
                              <div className="flex justify-between items-center">
                                <span>{opt}</span>
                                {quizState === 'result' && isCorrectOpt && (
                                  <CheckCircle
                                    size={20}
                                    className="text-green-500"
                                  />
                                )}
                                {quizState === 'result' &&
                                  selectedOption === idx &&
                                  !isCorrectOpt && (
                                    <XCircle
                                      size={20}
                                      className="text-red-400"
                                    />
                                  )}
                              </div>
                            </button>
                          );
                        }
                      )}
                    </div>

                    <AnimatePresence>
                      {quizState === 'result' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: 20 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          className={`mt-6 p-4 rounded-2xl border ${
                            selectedOption ===
                            (lessonPhase === 'pre-quiz'
                              ? activeLevel.preQuiz
                              : activeLevel.postQuiz)[qIndex].correct
                              ? 'bg-green-50 border-green-100'
                              : 'bg-red-50 border-red-100'
                          }`}
                        >
                          {/* 修改点 2：使用 gap-3 替代负边距，并给文字容器加上 flex-1 避免挤压 */}
                          <div className="flex items-start gap-3">
                            <div className="shrink-0">
                              {/* 在这里传入 className 控制 Herry 的大小，不再溢出 */}
                              <HerrySprite
                                mood={spriteMood}
                                className="w-16 h-16"
                              />
                            </div>
                            <div className="flex-1">
                              <h4
                                className={`font-bold mb-1 ${
                                  selectedOption ===
                                  (lessonPhase === 'pre-quiz'
                                    ? activeLevel.preQuiz
                                    : activeLevel.postQuiz)[qIndex].correct
                                    ? 'text-green-800'
                                    : 'text-red-800'
                                }`}
                              >
                                {selectedOption ===
                                (lessonPhase === 'pre-quiz'
                                  ? activeLevel.preQuiz
                                  : activeLevel.postQuiz)[qIndex].correct
                                  ? 'Correct!'
                                  : 'Oops, not quite!'}
                              </h4>
                              <p
                                className={`text-xs leading-relaxed ${
                                  selectedOption ===
                                  (lessonPhase === 'pre-quiz'
                                    ? activeLevel.preQuiz
                                    : activeLevel.postQuiz)[qIndex].correct
                                    ? 'text-green-700'
                                    : 'text-red-700'
                                }`}
                              >
                                {
                                  (lessonPhase === 'pre-quiz'
                                    ? activeLevel.preQuiz
                                    : activeLevel.postQuiz)[qIndex].exp
                                }
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
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                              : 'bg-slate-200 text-slate-400'
                          }`}
                        >
                          Submit Answer
                        </button>
                      ) : (
                        <button
                          onClick={nextStep}
                          className={`w-full py-4 rounded-2xl font-bold text-lg text-white shadow-lg flex justify-center items-center ${
                            selectedOption ===
                            (lessonPhase === 'pre-quiz'
                              ? activeLevel.preQuiz
                              : activeLevel.postQuiz)[qIndex].correct
                              ? 'bg-blue-600 shadow-blue-200'
                              : 'bg-slate-800 shadow-slate-300'
                          }`}
                        >
                          {selectedOption ===
                          (lessonPhase === 'pre-quiz'
                            ? activeLevel.preQuiz
                            : activeLevel.postQuiz)[qIndex].correct
                            ? lessonPhase === 'pre-quiz'
                              ? 'Watch Video'
                              : 'Complete Lesson'
                            : 'Try Again'}
                          <ChevronRight size={20} className="ml-1" />
                        </button>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {currentTab !== 'lesson' && (
          <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
        )}
      </div>
    </div>
  );
}
