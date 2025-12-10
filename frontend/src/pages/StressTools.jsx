import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

const StressTools = () => {
    const [step, setStep] = useState('intro'); // intro, quiz, result
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState({});

    const questions = [
        {
            id: 1,
            text: 'How often do you feel overwhelmed by your daily tasks?',
            options: [
                { text: 'Rarely or Never', value: 0 },
                { text: 'Sometimes', value: 1 },
                { text: 'Often', value: 2 },
                { text: 'Almost Always', value: 3 },
            ],
        },
        {
            id: 2,
            text: 'How would you rate your sleep quality recently?',
            options: [
                { text: 'Very Good', value: 0 },
                { text: 'Good', value: 1 },
                { text: 'Poor', value: 2 },
                { text: 'Very Poor', value: 3 },
            ],
        },
        {
            id: 3,
            text: 'Do you find it hard to relax or "switch off"?',
            options: [
                { text: 'No, I can relax easily', value: 0 },
                { text: 'Sometimes', value: 1 },
                { text: 'Often', value: 2 },
                { text: 'Yes, always', value: 3 },
            ],
        },
        {
            id: 4,
            text: 'Do you feel irritable or easily annoyed?',
            options: [
                { text: 'Rarely', value: 0 },
                { text: 'Sometimes', value: 1 },
                { text: 'Often', value: 2 },
                { text: 'Frequently', value: 3 },
            ],
        },
        {
            id: 5,
            text: 'How often do you feel anxious or worried?',
            options: [
                { text: 'Rarely', value: 0 },
                { text: 'Sometimes', value: 1 },
                { text: 'Often', value: 2 },
                { text: 'Constantly', value: 3 },
            ],
        },
    ];

    const handleAnswer = (questionId, value) => {
        setAnswers({ ...answers, [questionId]: value });
    };

    const calculateResult = () => {
        const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
        setScore(totalScore);
        setStep('result');
    };

    const getResultContent = () => {
        if (score <= 5) {
            return {
                level: 'Low Stress',
                color: 'text-green-600',
                bg: 'bg-green-50 dark:bg-green-900/20',
                advice: 'You seem to be managing well! Keep up your healthy habits. Continue with regular prayer, dhikr, and maintaining a balanced lifestyle.',
                icon: <CheckCircle size={48} className="text-green-500" />,
            };
        } else if (score <= 10) {
            return {
                level: 'Moderate Stress',
                color: 'text-yellow-600',
                bg: 'bg-yellow-50 dark:bg-yellow-900/20',
                advice: 'You are experiencing some stress. Try to incorporate more breaks, perform ablution (Wudu) when angry or stressed, and try our breathing exercises.',
                icon: <Info size={48} className="text-yellow-500" />,
            };
        } else {
            return {
                level: 'High Stress',
                color: 'text-red-600',
                bg: 'bg-red-50 dark:bg-red-900/20',
                advice: 'Your stress levels are high. It is important to take a step back. Prioritize sleep, talk to a friend or family member, and seek help if needed. Remember, "Verily, with hardship comes ease" (Quran 94:6).',
                icon: <AlertCircle size={48} className="text-red-500" />,
            };
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-center mb-8 text-teal-800 dark:text-teal-400">
                Stress Assessment
            </h1>

            {step === 'intro' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center"
                >
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                        Take this short assessment to understand your current stress levels and get personalized Islamic and general advice.
                    </p>
                    <button
                        onClick={() => setStep('quiz')}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-colors"
                    >
                        Start Assessment
                    </button>
                </motion.div>
            )}

            {step === 'quiz' && (
                <div className="space-y-8">
                    {questions.map((q) => (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                {q.text}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {q.options.map((opt, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleAnswer(q.id, opt.value)}
                                        className={`p-3 rounded-lg border-2 text-left transition-all ${answers[q.id] === opt.value
                                                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300'
                                                : 'border-gray-200 dark:border-gray-700 hover:border-teal-300'
                                            }`}
                                    >
                                        {opt.text}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                    <div className="text-center pt-4">
                        <button
                            onClick={calculateResult}
                            disabled={Object.keys(answers).length < questions.length}
                            className={`px-8 py-3 rounded-full font-bold text-lg transition-colors ${Object.keys(answers).length < questions.length
                                    ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                                }`}
                        >
                            See Results
                        </button>
                    </div>
                </div>
            )}

            {step === 'result' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`rounded-2xl shadow-lg p-8 text-center ${getResultContent().bg}`}
                >
                    <div className="flex justify-center mb-6">{getResultContent().icon}</div>
                    <h2 className={`text-3xl font-bold mb-4 ${getResultContent().color}`}>
                        {getResultContent().level}
                    </h2>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                        {getResultContent().advice}
                    </p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => {
                                setStep('intro');
                                setAnswers({});
                                setScore(0);
                            }}
                            className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-full font-medium hover:bg-gray-50 transition-colors"
                        >
                            Retake Quiz
                        </button>
                        <a
                            href="/breathing"
                            className="bg-teal-600 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-700 transition-colors"
                        >
                            Go to Breathing Exercises
                        </a>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default StressTools;
