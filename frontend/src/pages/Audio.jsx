import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Music, Volume2, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Audio = () => {
    const [activeTab, setActiveTab] = useState('motivation');
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);

    // Islamic Audio Content
    const motivationTracks = [
        { id: 1, title: 'Heart Touching Dua', author: 'Mishary Rashid', duration: '3:45', src: 'https://media.blubrry.com/muslim_central_quran/podcasts.qurancentral.com/mishary-rashid-alafasy/mishary-rashid-alafasy-dua-qunoot-muslimcentral.com.mp3' },
        { id: 2, title: 'Morning Adhkar', author: 'Mishary Rashid', duration: '5:00', src: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/093.mp3' },
        { id: 3, title: 'Peaceful Recitation', author: 'Recitation', duration: '4:20', src: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/094.mp3' },
        { id: 9, title: 'Healing Verses', author: 'Quran', duration: '2:30', src: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3' }
    ];

    const quranTracks = [
        { id: 4, title: 'Surah Al-Fatiha', author: 'Mishary Rashid', duration: '1:30', src: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/001.mp3' },
        { id: 5, title: 'Surah Al-Ikhlas', author: 'Mishary Rashid', duration: '0:45', src: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/112.mp3' },
        { id: 6, title: 'Surah Al-Falaq', author: 'Mishary Rashid', duration: '0:50', src: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/113.mp3' },
        { id: 7, title: 'Surah An-Nas', author: 'Mishary Rashid', duration: '1:00', src: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/114.mp3' },
        { id: 8, title: 'Ayat Al-Kursi', author: 'Mishary Rashid', duration: '2:10', src: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/002.mp3' },
        { id: 10, title: 'Surah Yasin', author: 'Mishary Rashid', duration: '20:00', src: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/036.mp3' },
        { id: 11, title: 'Surah Ar-Rahman', author: 'Mishary Rashid', duration: '15:00', src: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/055.mp3' },
        { id: 12, title: 'Surah Al-Mulk', author: 'Mishary Rashid', duration: '8:00', src: 'https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/067.mp3' },
    ];

    const tracks = activeTab === 'motivation' ? motivationTracks : quranTracks;

    const handlePlay = (track) => {
        if (currentTrack?.id === track.id) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        } else {
            setCurrentTrack(track);
            setIsPlaying(true);
            setProgress(0);
        }
    };

    const onTimeUpdate = () => {
        if (audioRef.current) {
            const duration = audioRef.current.duration;
            const currentTime = audioRef.current.currentTime;
            setProgress((currentTime / duration) * 100);
        }
    };

    const handleSeek = (e) => {
        const width = e.target.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        const duration = audioRef.current.duration;
        audioRef.current.currentTime = (clickX / width) * duration;
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Left Side: Player */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-24">
                            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
                                Listen & Reflect
                            </h1>

                            <AnimatePresence mode='wait'>
                                {currentTrack ? (
                                    <motion.div
                                        key="player"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700 relative"
                                    >
                                        {/* Album Art Placeholder with Gradient */}
                                        <div className="h-64 bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-20"></div>
                                            <motion.div
                                                animate={{ scale: isPlaying ? [1, 1.05, 1] : 1 }}
                                                transition={{ duration: 4, repeat: Infinity }}
                                            >
                                                <Music size={64} className="text-white opacity-80" />
                                            </motion.div>
                                        </div>

                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                                        {currentTrack.title}
                                                    </h2>
                                                    <p className="text-teal-600 dark:text-teal-400 font-medium">
                                                        {currentTrack.author}
                                                    </p>
                                                </div>
                                                <button className="text-gray-400 hover:text-rose-500 transition-colors">
                                                    <Heart size={24} />
                                                </button>
                                            </div>

                                            {/* Progress Bar */}
                                            <div
                                                className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-2 cursor-pointer relative overflow-hidden group"
                                                onClick={handleSeek}
                                            >
                                                <div
                                                    className="absolute top-0 left-0 h-full bg-teal-500 rounded-full transition-all duration-100"
                                                    style={{ width: `${progress}%` }}
                                                />
                                                <div className="absolute top-0 left-0 h-full w-full bg-teal-500 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                            </div>
                                            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-8">
                                                <span>{audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}</span>
                                                <span>{currentTrack.duration}</span>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex justify-center items-center gap-8">
                                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                                    <SkipBack size={28} />
                                                </button>
                                                <button
                                                    onClick={() => handlePlay(currentTrack)}
                                                    className="w-16 h-16 bg-teal-600 hover:bg-teal-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-teal-500/30 transition-all transform hover:scale-105 active:scale-95"
                                                >
                                                    {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                                                </button>
                                                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                                                    <SkipForward size={28} />
                                                </button>
                                            </div>
                                        </div>

                                        <audio
                                            ref={audioRef}
                                            src={currentTrack.src}
                                            autoPlay
                                            onTimeUpdate={onTimeUpdate}
                                            onEnded={() => setIsPlaying(false)}
                                        />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 text-center border border-gray-100 dark:border-gray-700 h-[500px] flex flex-col items-center justify-center"
                                    >
                                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
                                            <Music size={32} className="text-gray-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                                            Select a Track
                                        </h3>
                                        <p className="text-gray-500 dark:text-gray-400">
                                            Choose from the list to start listening
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right Side: Track List */}
                    <div className="lg:w-2/3">
                        {/* Tabs */}
                        <div className="flex space-x-2 mb-8 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl inline-flex">
                            <button
                                onClick={() => setActiveTab('motivation')}
                                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === 'motivation'
                                    ? 'bg-white dark:bg-gray-700 text-teal-600 dark:text-teal-400 shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                    }`}
                            >
                                Motivation
                            </button>
                            <button
                                onClick={() => setActiveTab('quran')}
                                className={`px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${activeTab === 'quran'
                                    ? 'bg-white dark:bg-gray-700 text-teal-600 dark:text-teal-400 shadow-sm'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                    }`}
                            >
                                Quran Recitation
                            </button>
                        </div>

                        <div className="space-y-3">
                            {tracks.map((track, index) => (
                                <motion.div
                                    key={track.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => handlePlay(track)}
                                    className={`group flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border ${currentTrack?.id === track.id
                                        ? 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800 shadow-sm'
                                        : 'bg-white dark:bg-gray-800 border-transparent hover:border-gray-200 dark:hover:border-gray-700 hover:shadow-md'
                                        }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${currentTrack?.id === track.id
                                            ? 'bg-teal-500 text-white'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 group-hover:bg-teal-100 dark:group-hover:bg-teal-900/30 group-hover:text-teal-600'
                                            }`}>
                                            {currentTrack?.id === track.id && isPlaying ? (
                                                <div className="flex gap-0.5 items-end h-4">
                                                    <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white rounded-full" />
                                                    <motion.div animate={{ height: [8, 12, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-white rounded-full" />
                                                    <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white rounded-full" />
                                                </div>
                                            ) : (
                                                <Play size={20} fill="currentColor" className="ml-1" />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold ${currentTrack?.id === track.id ? 'text-teal-700 dark:text-teal-400' : 'text-gray-800 dark:text-gray-200'
                                                }`}>
                                                {track.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{track.author}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm font-medium text-gray-400">{track.duration}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default Audio;
