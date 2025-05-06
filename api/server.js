// server.js (or your backend entry point)
import dotenv from 'dotenv';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
// import {env} from 'node:process';


dotenv.config(); // Load environment variables

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

app.use(cors()); // Enable CORS for all routes

// Access environment variables directly from process.env
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY; // Default value for testing

console.log('RECAPTCHA_SECRET_KEY:', process.env); // Log for debugging

// Access environment variables directly from process.env
// const RECAPTCHA_SECRET_KEYj = '6LetbiYrAAAAAGE5kIOUWr81YF_dkCpaWrbu7d7x'; // process.env.RECAPTCHA_SECRET_KEY;
const RECAPTCHA_SCORE_THRESHOLD = 0.5; // Adjust as needed (0.0 to 1.0)

// Your contact form endpoint
app.post('/api/contact', async (req, res) => {
    const {recaptchaToken} = req.body;
    if (!recaptchaToken) {
        return res.status(400).json({message: 'Missing Token.'});
    }
    const RECAPTCHA_VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    try {
        // 2. Verify reCAPTCHA Token
        const verificationResponse = await fetch(RECAPTCHA_VERIFY_URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: `secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        });

        const verificationData = await verificationResponse.json();

        console.log('reCAPTCHA Verification Data:', verificationData, 'TokenURL: ', RECAPTCHA_VERIFY_URL); // Log for debugging
        console.log('Verifying reCAPTCHA Token:', recaptchaToken); // Log for debugging

        if (!verificationData.success) {
            console.error('reCAPTCHA verification failed:', verificationData['error-codes']);
            return res.status(400).json({message: 'reCAPTCHA verification failed.'});
        }

        // 3. Check Score and Action
        if (verificationData.score < RECAPTCHA_SCORE_THRESHOLD) {
            console.warn(`Low reCAPTCHA score: ${verificationData.score}`);
            return res.status(400).json({message: 'Bot detection score too low.'});
        }

        // Send success response if everything is OK
        return res.status(200).json({message: 'Verification successful'});

    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error, 'TokenURL: ', RECAPTCHA_VERIFY_URL);
        return res.status(500).json({message: 'Internal server error.'});
    }
});

const PORT = 3001; // Choose a port for your backend
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});