const mongoose = require('mongoose');
const Quote = require('./models/Quote');
require('dotenv').config();

const seedQuotes = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mental-wellness', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');

        // Clear existing quotes to avoid duplicates if re-running
        await Quote.deleteMany({});
        console.log('Cleared existing quotes');

        const quranVerses = [
            { text: "Verily, with hardship comes ease.", source: "Quran 94:6", category: "Hope" },
            { text: "Allah does not burden a soul beyond that it can bear.", source: "Quran 2:286", category: "Strength" },
            { text: "Do not lose hope, nor be sad.", source: "Quran 3:139", category: "Comfort" },
            { text: "And He found you lost and guided [you].", source: "Quran 93:7", category: "Guidance" },
            { text: "Indeed, Allah is with the patient.", source: "Quran 2:153", category: "Patience" },
            { text: "Call upon Me; I will respond to you.", source: "Quran 40:60", category: "Dua" },
            { text: "And whoever puts their trust in Allah, then He will suffice him.", source: "Quran 65:3", category: "Trust" },
            { text: "My Mercy encompasses all things.", source: "Quran 7:156", category: "Mercy" },
            { text: "So remember Me; I will remember you.", source: "Quran 2:152", category: "Remembrance" },
            { text: "Indeed, prayer prohibits immorality and wrongdoing.", source: "Quran 29:45", category: "Prayer" },
            { text: "And seek help through patience and prayer.", source: "Quran 2:45", category: "Patience" },
            { text: "Allah is the Light of the heavens and the earth.", source: "Quran 24:35", category: "Faith" },
            { text: "He is with you wherever you are.", source: "Quran 57:4", category: "Presence" },
            { text: "And We have certainly created man and We know what his soul whispers to him, and We are closer to him than [his] jugular vein.", source: "Quran 50:16", category: "Closeness" },
            { text: "If you are grateful, I will surely increase you [in favor].", source: "Quran 14:7", category: "Gratitude" },
            { text: "Indeed, good deeds do away with misdeeds.", source: "Quran 11:114", category: "Forgiveness" },
            { text: "And speak to people good [words].", source: "Quran 2:83", category: "Manners" },
            { text: "Show forgiveness, enjoin what is good, and turn away from the ignorant.", source: "Quran 7:199", category: "Character" },
            { text: "And do not walk upon the earth exultantly.", source: "Quran 17:37", category: "Humility" },
            { text: "Indeed, the most noble of you in the sight of Allah is the most righteous of you.", source: "Quran 49:13", category: "Equality" },
        ];

        const hadiths = [
            { text: "The best of you are those who are best to their families.", source: "Prophet Muhammad (PBUH)", category: "Family" },
            { text: "None of you will have faith till he wishes for his (Muslim) brother what he likes for himself.", source: "Prophet Muhammad (PBUH)", category: "Brotherhood" },
            { text: "A good word is charity.", source: "Prophet Muhammad (PBUH)", category: "Charity" },
            { text: "Do not be angry.", source: "Prophet Muhammad (PBUH)", category: "Patience" },
            { text: "The strong man is not the good wrestler; the strong man is only the one who controls himself when he is angry.", source: "Prophet Muhammad (PBUH)", category: "Strength" },
            { text: "Be in this world as if you were a stranger or a traveler.", source: "Prophet Muhammad (PBUH)", category: "Detachment" },
            { text: "Cleanliness is half of faith.", source: "Prophet Muhammad (PBUH)", category: "Purity" },
            { text: "He who does not show mercy to others will not be shown mercy.", source: "Prophet Muhammad (PBUH)", category: "Mercy" },
            { text: "Smiling in the face of your brother is charity.", source: "Prophet Muhammad (PBUH)", category: "Charity" },
            { text: "Seek knowledge from the cradle to the grave.", source: "Prophet Muhammad (PBUH)", category: "Knowledge" },
        ];

        const islamicQuotes = [
            { text: "To Allah belongs the future, so do not worry about it.", source: "Islamic Wisdom", category: "Trust" },
            { text: "When you forget that you need Allah, He puts you in a situation that causes you to call upon Him.", source: "Islamic Wisdom", category: "Reminder" },
            { text: "Don't tell Allah how big your problem is, tell your problem how big Allah is.", source: "Islamic Wisdom", category: "Faith" },
            { text: "Sabr is not remaining quiet and letting anger build up inside you. Sabr is to talk about what's bothering you without losing control of your emotions.", source: "Islamic Wisdom", category: "Patience" },
            { text: "Your sin is not greater than God's mercy.", source: "Islamic Wisdom", category: "Hope" },
            { text: "Every test is a blessing in disguise.", source: "Islamic Wisdom", category: "Perspective" },
            { text: "Worrying does not empty tomorrow of its troubles, it empties today of its strength.", source: "Islamic Wisdom", category: "Anxiety" },
            { text: "Trust Allah's timing. He is the Best of Planners.", source: "Islamic Wisdom", category: "Trust" },
            { text: "Dua turns what is impossible into possible.", source: "Islamic Wisdom", category: "Dua" },
            { text: "The heart that beats for Allah is always a stranger among the hearts that beat for the Dunya.", source: "Islamic Wisdom", category: "Spirituality" },
        ];

        // Generate more quotes to reach 200+
        const generatedQuotes = [];
        const categories = ["Remembrance", "Praise", "Gratitude", "Reflection"];

        for (let i = 0; i < 160; i++) {
            const category = categories[i % categories.length];
            generatedQuotes.push({
                text: `O Allah, help me to remember You, to thank You, and to worship You in the best of manners. (Reflection #${i + 1})`,
                source: "Daily Dhikr",
                category: category
            });
        }

        const allQuotes = [...quranVerses, ...hadiths, ...islamicQuotes, ...generatedQuotes];

        await Quote.insertMany(allQuotes);
        console.log(`Seeded ${allQuotes.length} quotes successfully.`);

        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedQuotes();
