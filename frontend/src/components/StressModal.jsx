import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const StressModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState('intro');
    const [score, setScore] = useState(0);
    const [answers, setAnswers] = useState({});

    const questions = [
        { id: 1, text: 'How often do you feel overwhelmed by your daily tasks?', options: [{ text: 'Rarely', value: 0 }, { text: 'Sometimes', value: 1 }, { text: 'Often', value: 2 }, { text: 'Always', value: 3 }] },
        { id: 2, text: 'How would you rate your sleep quality recently?', options: [{ text: 'Good', value: 0 }, { text: 'Fair', value: 1 }, { text: 'Poor', value: 2 }, { text: 'Very Poor', value: 3 }] },
        { id: 3, text: 'Do you find it hard to relax?', options: [{ text: 'No', value: 0 }, { text: 'Sometimes', value: 1 }, { text: 'Often', value: 2 }, { text: 'Yes', value: 3 }] },
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
        if (score <= 3) return { level: 'Low Stress', color: 'text-green-600', advice: 'You are doing well! Keep it up.', icon: <CheckCircle size={48} className="text-green-500" /> };
        if (score <= 6) return { level: 'Moderate Stress', color: 'text-yellow-600', advice: 'Try to take some breaks and practice breathing.', icon: <Info size={48} className="text-yellow-500" /> };
        return { level: 'High Stress', color: 'text-red-600', advice: 'Please prioritize rest and seek support.', icon: <AlertCircle size={48} className="text-red-500" /> };
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <X size={24} />
                        </button>

                        <div className="p-8">
                            {step === 'intro' && (
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold mb-4 text-teal-800 dark:text-teal-400">Daily Check-in</h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-8">How are you feeling today? Take a quick check-in.</p>
                                    <button onClick={() => setStep('quiz')} className="bg-teal-600 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-700 transition-colors">Start</button>
                                </div>
                            )}

                            {step === 'quiz' && (
                                <div className="space-y-6">
                                    {questions.map((q) => (
                                        <div key={q.id}>
                                            <p className="font-medium mb-2 text-gray-800 dark:text-gray-200">{q.text}</p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {q.options.map((opt, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleAnswer(q.id, opt.value)}
                                                        className={`p-2 rounded border text-sm ${answers[q.id] === opt.value ? 'bg-teal-100 border-teal-500 text-teal-700' : 'border-gray-200 hover:bg-gray-50'}`}
                                                    >
                                                        {opt.text}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                    <button
                                        onClick={calculateResult}
                                        disabled={Object.keys(answers).length < questions.length}
                                        className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold disabled:opacity-50 hover:bg-teal-700"
                                    >
                                        See Result
                                    </button>
                                </div>
                            )}

                            {step === 'result' && (
                                <div className="text-center">
                                    <div className="flex justify-center mb-4">{getResultContent().icon}</div>
                                    <h3 className={`text-2xl font-bold mb-2 ${getResultContent().color}`}>{getResultContent().level}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">{getResultContent().advice}</p>
                                    <button onClick={onClose} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-300">Close</button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default StressModal;
