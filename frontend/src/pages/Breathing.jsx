import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw } from 'lucide-react';

const Breathing = () => {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState('Inhale'); // Inhale, Hold, Exhale
    const [timeLeft, setTimeLeft] = useState(4); // Seconds for current phase
    const [cycle, setCycle] = useState(0);

    // Breathing Pattern: 4-4-4 (Box Breathing)
    const pattern = {
        Inhale: 4,
        Hold: 4,
        Exhale: 4,
    };

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        // Switch phase
                        if (phase === 'Inhale') {
                            setPhase('Hold');
                            return pattern.Hold;
                        } else if (phase === 'Hold') {
                            setPhase('Exhale');
                            return pattern.Exhale;
                        } else {
                            setPhase('Inhale');
                            setCycle((c) => c + 1);
                            return pattern.Inhale;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, phase]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setPhase('Inhale');
        setTimeLeft(pattern.Inhale);
        setCycle(0);
    };

    const getScale = () => {
        // Calculate scale based on phase and timeLeft
        // Inhale: 1 -> 1.5
        // Hold: 1.5
        // Exhale: 1.5 -> 1

        const progress = (pattern[phase] - timeLeft) / pattern[phase]; // 0 to 1

        if (phase === 'Inhale') return 1 + (progress * 0.5);
        if (phase === 'Hold') return 1.5;
        if (phase === 'Exhale') return 1.5 - (progress * 0.5);
        return 1;
    };

    const getInstruction = () => {
        if (!isActive && cycle === 0 && phase === 'Inhale' && timeLeft === 4) return 'Press Play to Start';
        return phase;
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-sky-50 dark:bg-gray-900 px-4">
            <h1 className="text-3xl font-bold mb-8 text-sky-800 dark:text-sky-400">
                Breathing Exercises
            </h1>

            <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                {/* Outer pulsing circle */}
                <motion.div
                    animate={{
                        scale: isActive ? [1, 1.1, 1] : 1,
                        opacity: isActive ? [0.3, 0.1, 0.3] : 0.1,
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute w-full h-full rounded-full bg-sky-400"
                />

                {/* Main breathing circle */}
                <motion.div
                    animate={{ scale: isActive ? getScale() : 1 }}
                    transition={{ duration: 1, ease: "linear" }} // Smooth transition between seconds
                    className="w-48 h-48 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 shadow-xl flex items-center justify-center z-10"
                >
                    <span className="text-white text-2xl font-bold">
                        {getInstruction()}
                    </span>
                </motion.div>
            </div>

            <div className="text-center mb-8">
                <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
                    {isActive ? `Time left: ${timeLeft}s` : 'Box Breathing (4-4-4)'}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                    Cycles completed: {cycle}
                </p>
            </div>

            <div className="flex space-x-6">
                <button
                    onClick={toggleTimer}
                    className="bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105"
                >
                    {isActive ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
                </button>
                <button
                    onClick={resetTimer}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 p-4 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                    <RefreshCw size={32} />
                </button>
            </div>
        </div>
    );
};

export default Breathing;
