const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// Physics knowledge base
const physicsKnowledge = {
    // Kinematics
    'kinematics': {
        'velocity': 'Kecepatan adalah besaran vektor yang menunjukkan seberapa cepat suatu benda bergerak dan ke arah mana.',
        'acceleration': 'Percepatan adalah perubahan kecepatan per satuan waktu. Rumus: a = Δv/Δt',
        'displacement': 'Perpindahan adalah perubahan posisi benda. Berbeda dengan jarak, perpindahan memiliki arah.',
        'free fall': 'Gerak jatuh bebas adalah gerak benda yang hanya dipengaruhi oleh gravitasi. Percepatan gravitasi (g) = 9.8 m/s²'
    },
    // Dynamics
    'dynamics': {
        'force': 'Gaya adalah interaksi yang dapat mengubah gerak suatu benda. Rumus: F = m × a',
        'newton laws': 'Hukum Newton:\n1. Hukum Inersia\n2. F = m × a\n3. Aksi-Reaksi',
        'friction': 'Gaya gesek adalah gaya yang melawan gerak relatif antara dua permukaan yang bersentuhan.',
        'weight': 'Berat adalah gaya gravitasi yang bekerja pada suatu benda. Rumus: W = m × g'
    },
    // Energy
    'energy': {
        'kinetic': 'Energi kinetik adalah energi yang dimiliki benda karena geraknya. Rumus: Ek = ½mv²',
        'potential': 'Energi potensial adalah energi yang dimiliki benda karena posisinya. Rumus: Ep = mgh',
        'conservation': 'Hukum kekekalan energi menyatakan bahwa energi tidak dapat diciptakan atau dimusnahkan, hanya berubah bentuk.',
        'work': 'Usaha adalah transfer energi melalui gaya yang menyebabkan perpindahan. Rumus: W = F × d × cosθ'
    }
};

// Practice problems
const practiceProblems = [
    {
        question: "Sebuah bola dilempar vertikal ke atas dengan kecepatan awal 20 m/s. Hitunglah ketinggian maksimum yang dicapai bola!",
        solution: "Menggunakan persamaan gerak vertikal:\n1. v² = v₀² + 2gh\n2. Di titik tertinggi, v = 0\n3. 0 = (20)² + 2(-9.8)h\n4. h = 20.4 meter"
    },
    {
        question: "Sebuah benda bermassa 5 kg ditarik dengan gaya 20 N pada permukaan kasar dengan koefisien gesek 0.2. Hitunglah percepatan benda!",
        solution: "1. Gaya normal (N) = mg = 5 × 9.8 = 49 N\n2. Gaya gesek (f) = μN = 0.2 × 49 = 9.8 N\n3. ΣF = ma\n4. 20 - 9.8 = 5a\n5. a = 2.04 m/s²"
    },
    {
        question: "Sebuah pegas dengan konstanta 200 N/m ditarik sejauh 0.1 m. Hitunglah energi potensial elastis yang tersimpan!",
        solution: "Menggunakan rumus energi potensial elastis:\nEp = ½kx²\nEp = ½ × 200 × (0.1)²\nEp = 1 Joule"
    }
];

// API endpoint
app.post('/api/physic-chat', (req, res) => {
    const { message, mode, image, isFeedbackReq, problemCtx } = req.body;
    let response = '';

    try {
        if (mode === 'chat') {
            // Search for relevant physics concepts
            const lowerMessage = message.toLowerCase();
            let found = false;

            for (const category in physicsKnowledge) {
                for (const concept in physicsKnowledge[category]) {
                    if (lowerMessage.includes(concept)) {
                        response = physicsKnowledge[category][concept];
                        found = true;
                        break;
                    }
                }
                if (found) break;
            }

            if (!found) {
                response = "Saya tidak yakin tentang pertanyaan Anda. Bisakah Anda menjelaskan lebih detail tentang konsep fisika yang ingin Anda tanyakan?";
            }
        } else if (mode === 'practice') {
            if (isFeedbackReq && problemCtx) {
                // Simple feedback based on keywords
                const solution = problemCtx.toLowerCase();
                if (solution.includes('rumus') || solution.includes('persamaan') || solution.includes('hitung')) {
                    response = "Bagus! Anda menggunakan pendekatan yang benar dengan menerapkan rumus-rumus fisika yang tepat.";
                } else {
                    response = "Coba gunakan rumus-rumus fisika yang relevan untuk menyelesaikan masalah ini.";
                }
            } else {
                // Get random practice problem
                const randomProblem = practiceProblems[Math.floor(Math.random() * practiceProblems.length)];
                response = randomProblem.question;
                res.json({ response, problem: randomProblem });
                return;
            }
        } else if (mode === 'homework') {
            if (image) {
                response = "Maaf, fitur analisis gambar belum tersedia. Silakan tulis pertanyaan Anda secara manual.";
            } else {
                response = "Untuk membantu dengan pekerjaan rumah, mohon berikan pertanyaan spesifik tentang konsep fisika yang ingin Anda pahami.";
            }
        }

        res.json({ response });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Terjadi kesalahan dalam memproses permintaan' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Export the Express API
module.exports = app; 