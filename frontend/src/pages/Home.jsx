import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Wind, BookOpen, PenTool, ArrowRight, Sun } from 'lucide-react';
import StressModal from '../components/StressModal';

const Home = () => {
    const [showStressModal, setShowStressModal] = useState(false);
    const [dailyQuote, setDailyQuote] = useState(null);
    const isAuthenticated = !!localStorage.getItem('token');

    useEffect(() => {
        if (isAuthenticated) {
            // Check if we've already shown it this session to avoid annoyance
            const hasShown = sessionStorage.getItem('stressModalShown');
            if (!hasShown) {
                setShowStressModal(true);
                sessionStorage.setItem('stressModalShown', 'true');
            }
        }
    }, [isAuthenticated]);

    useEffect(() => {
        const fetchDailyQuote = async () => {
            try {
                // Check local storage first
                const storedQuote = localStorage.getItem('dailyQuote');
                const storedDate = localStorage.getItem('dailyQuoteDate');
                const today = new Date().toDateString();

                if (storedQuote && storedDate === today) {
                    setDailyQuote(JSON.parse(storedQuote));
                } else {
                    // Fetch new quote if not stored or expired
                    const res = await fetch('http://localhost:5000/api/quotes/random');
                    const data = await res.json();
                    setDailyQuote(data);
                    localStorage.setItem('dailyQuote', JSON.stringify(data));
                    localStorage.setItem('dailyQuoteDate', today);
                }
            } catch (err) {
                console.error('Error fetching quote:', err);
                // Fallback quote
                setDailyQuote({
                    text: "Verily, in the remembrance of Allah do hearts find rest.",
                    source: "Quran 13:28"
                });
            }
        };

        fetchDailyQuote();
    }, []);

    const features = [
        {
            title: 'Stress Control',
            description: 'Assess and manage your stress levels with personalized advice.',
            icon: <Heart size={32} className="text-white" />,
            link: '/stress-tools',
            gradient: 'from-rose-500 to-pink-600',
        },
        {
            title: 'Breath Exercises',
            description: 'Calm your mind with guided breathing techniques.',
            icon: <Wind size={32} className="text-white" />,
            link: '/breathing',
            gradient: 'from-sky-400 to-blue-600',
        },
        {
            title: 'Islamic Guidance',
            description: 'Find peace through Quran recitation and motivational quotes.',
            icon: <BookOpen size={32} className="text-white" />,
            link: '/audio',
            gradient: 'from-emerald-400 to-teal-600',
        },
        {
            title: 'Daily Journal',
            description: 'Reflect on your day and track your emotional well-being.',
            icon: <PenTool size={32} className="text-white" />,
            link: '/journal',
            gradient: 'from-amber-400 to-orange-600',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-sans selection:bg-teal-200 selection:text-teal-900">

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-white dark:bg-gray-900 pt-16 pb-32 lg:pt-32 lg:pb-48">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 dark:opacity-5"></div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-100 dark:bg-teal-900/20 blur-3xl opacity-50 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-100 dark:bg-blue-900/20 blur-3xl opacity-50 animate-pulse delay-1000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300 text-sm font-semibold tracking-wide uppercase mb-4">
                            Mental Wellness & Islamic Guidance
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6">
                            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">Inner Peace</span>
                        </h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                            A sanctuary for your mind and soul. Combine modern psychology with timeless Islamic wisdom to achieve balance and tranquility.
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            <Link
                                to={isAuthenticated ? "/stress-tools" : "/login"}
                                className="px-8 py-4 rounded-full bg-teal-600 text-white font-bold text-lg shadow-lg hover:bg-teal-700 hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center"
                            >
                                Start Your Journey <ArrowRight size={20} className="ml-2" />
                            </Link>
                            {isAuthenticated && (
                                <Link
                                    to="/quotes"
                                    className="px-8 py-4 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-bold text-lg shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                                >
                                    Daily Inspiration
                                </Link>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative z-20 -mt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                            >
                                <div
                                    className="group block h-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 relative cursor-default"
                                >
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`}></div>

                                    <div className="p-8">
                                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg mb-6 transform group-hover:rotate-6 transition-transform`}>
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-20 bg-teal-50 dark:bg-gray-800/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5"></div>
                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-block p-3 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 mb-6">
                            <Sun size={24} />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                            Daily Wisdom
                        </h2>
                        {dailyQuote ? (
                            <>
                                <blockquote className="text-2xl md:text-3xl font-serif italic text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                    "{dailyQuote.text}"
                                </blockquote>
                                <cite className="text-lg font-medium text-teal-600 dark:text-teal-400 not-italic">
                                    - {dailyQuote.source || dailyQuote.author}
                                </cite>
                            </>
                        ) : (
                            <div className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            <StressModal isOpen={showStressModal} onClose={() => setShowStressModal(false)} />
        </div>
    );
};

export default Home;
