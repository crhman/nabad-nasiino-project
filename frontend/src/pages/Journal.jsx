import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Journal = () => {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState('');
    const [mood, setMood] = useState('Neutral');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchEntries();
    }, [token, navigate]);

    const fetchEntries = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/journal', {
                headers: { 'x-auth-token': token }
            });
            setEntries(res.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch entries');
            setLoading(false);
        }
    };

    const saveEntry = async () => {
        if (!newEntry.trim()) return;

        try {
            const res = await axios.post('http://localhost:5000/api/journal', {
                content: newEntry,
                mood
            }, {
                headers: { 'x-auth-token': token }
            });

            setEntries([res.data, ...entries]);
            setNewEntry('');
            setMood('Neutral');
        } catch (err) {
            console.error(err);
            setError('Failed to save entry');
        }
    };

    const deleteEntry = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/journal/${id}`, {
                headers: { 'x-auth-token': token }
            });
            setEntries(entries.filter((e) => e._id !== id));
        } catch (err) {
            console.error(err);
            setError('Failed to delete entry');
        }
    };

    const moods = ['Happy', 'Calm', 'Neutral', 'Stressed', 'Sad'];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold mb-8 text-amber-800 dark:text-amber-500">
                Daily Journal
            </h1>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
                <textarea
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="How are you feeling today? Write your thoughts..."
                    className="w-full h-32 p-4 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 dark:bg-gray-900 dark:text-white resize-none"
                />
                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-gray-600 dark:text-gray-300 font-medium">Mood:</span>
                        <select
                            value={mood}
                            onChange={(e) => setMood(e.target.value)}
                            className="p-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                            {moods.map((m) => (
                                <option key={m} value={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={saveEntry}
                        className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full font-bold flex items-center transition-colors"
                    >
                        <Plus size={20} className="mr-2" />
                        Save Entry
                    </button>
                </div>
            </div>

            {/* Entries List */}
            <div className="space-y-6">
                {entries.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                        No entries yet. Start writing today!
                    </p>
                ) : (
                    entries.map((entry) => (
                        <div
                            key={entry._id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border-l-4 border-amber-500 hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <Calendar size={16} className="mr-2" />
                                    {new Date(entry.date).toLocaleDateString()}
                                    <span className="mx-2">•</span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${entry.mood === 'Happy' ? 'bg-green-100 text-green-800' :
                                        entry.mood === 'Stressed' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                        {entry.mood}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteEntry(entry._id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                                {entry.content}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Journal;
