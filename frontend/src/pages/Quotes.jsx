import React, { useState } from 'react';
import axios from 'axios';
import { Share2, RefreshCw, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Quotes = () => {
    const [currentQuote, setCurrentQuote] = useState({
        text: "Verily, with hardship comes ease.",
        source: "Quran 94:6",
        category: "Hope"
    });

    const quotes = [
        { text: "Verily, with hardship comes ease.", source: "Quran 94:6", category: "Hope" },
        { text: "Allah does not burden a soul beyond that it can bear.", source: "Quran 2:286", category: "Strength" },
        { text: "Do not lose hope, nor be sad.", source: "Quran 3:139", category: "Comfort" },
        { text: "And He found you lost and guided [you].", source: "Quran 93:7", category: "Guidance" },
        { text: "Indeed, Allah is with the patient.", source: "Quran 2:153", category: "Patience" },
        { text: "The best of you are those who are best to their families.", source: "Prophet Muhammad (PBUH)", category: "Character" },
    ];

    const generateQuote = async () => {
        try {
            // Try to fetch from backend
            const res = await axios.get('http://localhost:5000/api/quotes/random');
            if (res.data) {
                setCurrentQuote(res.data);
            } else {
                // Fallback to local
                const random = Math.floor(Math.random() * quotes.length);
                setCurrentQuote(quotes[random]);
            }
        } catch (err) {
            console.error("Error fetching quote:", err);
            // Fallback to local
            const random = Math.floor(Math.random() * quotes.length);
            setCurrentQuote(quotes[random]);
        }
    };

    const shareQuote = () => {
        navigator.clipboard.writeText(`"${currentQuote.text}" - ${currentQuote.source}`);
        alert('Quote copied to clipboard!');
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-teal-50 dark:bg-gray-900">
            <h1 className="text-3xl font-bold mb-12 text-teal-800 dark:text-teal-400">
                Daily Inspiration
            </h1>

            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentQuote.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-center relative"
                >
                    <Quote size={48} className="absolute top-6 left-6 text-teal-100 dark:text-teal-900/30" />

                    <div className="mb-8">
                        <span className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium mb-6">
                            {currentQuote.category}
                        </span>
                        <p className="text-2xl md:text-3xl font-serif text-gray-800 dark:text-gray-100 leading-relaxed">
                            "{currentQuote.text}"
                        </p>
                    </div>

                    <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                        <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                            {currentQuote.source}
                        </p>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="flex space-x-4 mt-8">
                <button
                    onClick={generateQuote}
                    className="flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-full font-medium transition-colors shadow-lg"
                >
                    <RefreshCw size={20} className="mr-2" />
                    New Quote
                </button>
                <button
                    onClick={shareQuote}
                    className="flex items-center px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-full font-medium transition-colors shadow-sm"
                >
                    <Share2 size={20} className="mr-2" />
                    Share
                </button>
            </div>
        </div>
    );
};

export default Quotes;
