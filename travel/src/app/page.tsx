"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import quizQuestions from '@/data/quizQuestions';
import { LLMResponse } from '@/lib/llm';

type UserAnswer = {
  questionId: string;
  optionId: string;
  tags: string[];
  question: string;
  answer: string;
};

export default function QuizPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LLMResponse | null>(null);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [textInput, setTextInput] = useState('');

  const currentQuestion = quizQuestions[currentQuestionIndex];
  if (!currentQuestion) return null;

  useEffect(() => {
    if (currentQuestion.type === 'text-input') {
      const keyword = currentQuestion.imageKeyword ?? 'city skyline';
      setCurrentImageUrl(`https://source.unsplash.com/1920x1080/?${keyword}`);
      return;
    }

    const firstOption = currentQuestion.options?.[0];
    if (!firstOption) return;
    setCurrentImageUrl(`https://source.unsplash.com/1920x1080/?${firstOption.imageKeyword}`);
  }, [currentQuestion]);

  type CurrentOption = (typeof quizQuestions)[number]['options'][number];
  const handleOptionSelect = async (option: CurrentOption) => {
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      optionId: option.id,
      tags: option.tags,
      question: currentQuestion.question,
      answer: option.text,
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsLoading(true);
      try {
        const response = await fetch('/api/analyze-persona', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answers: updatedAnswers.map(answer => ({
              question: answer.question,
              answer: answer.answer,
              tags: answer.tags,
            })),
          }),
        });

        const data = await response.json();
        setResult(data);
      } catch (error) {
        console.error('Error fetching analysis:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const submitTextInput = async () => {
    const trimmed = textInput.trim();
    if (!trimmed) return;

    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      optionId: 'text-input',
      tags: ['departure-custom', trimmed],
      question: currentQuestion.question,
      answer: trimmed,
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);
    setTextInput('');

    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze-persona', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          answers: updatedAnswers.map(answer => ({
            question: answer.question,
            answer: answer.answer,
            tags: answer.tags,
          })),
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching analysis:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setResult(null);
    setTextInput('');
  };

  const handleGenerateItinerary = () => {
    alert('此功能正在开发中，敬请期待！');
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold mb-8 text-center px-4"
        >
          AI 正在分析你的灵魂，寻找最契合的旅行目的地...
        </motion.div>
        <div className="w-24 h-24 border-4 border-t-primary border-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="text-6xl mb-4">{result.persona_emoji}</div>
            <h1 className="text-4xl font-bold mb-6">{result.persona_title}</h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed">{result.analysis}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          >
            {result.destinations.map((destination, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
                className="relative rounded-xl overflow-hidden h-80"
              >
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <img
                  src={`https://source.unsplash.com/800x600/?${destination.name}`}
                  alt={destination.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-sm mb-3 opacity-90">{destination.country}</p>
                  <p className="text-sm">{destination.reason}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <button
              onClick={handleRestart}
              className="px-8 py-3 bg-primary hover:bg-primary/80 rounded-lg font-semibold transition-all duration-300"
            >
              重新测试
            </button>
            <button
              onClick={handleGenerateItinerary}
              className="px-8 py-3 bg-white text-blue-900 hover:bg-gray-100 rounded-lg font-semibold transition-all duration-300"
            >
              生成详细行程
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={currentImageUrl}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-4xl">
          <div className="mb-4 text-center">
            <span className="text-white/80 text-sm">
              问题 {currentQuestionIndex + 1} / {quizQuestions.length}
            </span>
            <div className="w-full h-1 bg-white/20 rounded-full mt-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-primary rounded-full"
              />
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                {currentQuestion.question}
              </h2>

              {currentQuestion.type === 'text-input' ? (
                <div className="max-w-xl mx-auto">
                  <input
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') submitTextInput();
                    }}
                    placeholder={currentQuestion.placeholder ?? '请输入...'}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={submitTextInput}
                    disabled={!textInput.trim()}
                    className="mt-6 w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 bg-primary text-white disabled:bg-primary/50 disabled:text-white/60 disabled:cursor-not-allowed hover:bg-primary/80"
                  >
                    {currentQuestionIndex === quizQuestions.length - 1 ? '完成' : '下一题'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentQuestion.options?.map((option) => (
                    <motion.button
                      key={option.id}
                      whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)' }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionSelect(option)}
                      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 text-left transition-all duration-300 hover:bg-white/15"
                    >
                      <p className="text-white text-lg font-medium">{option.text}</p>
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
