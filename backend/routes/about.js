const express = require('express');
const About = require('../models/About'); 
const router = express.Router();

// Static About Data
const aboutData = {
    title: "HealingWave Health Service",
    mission: "Delivering compassionate healthcare with state-of-the-art technology and skilled professionals.",
    coreValues: [
        "Compassionate Care",
        "Patient-Centered Approach",
        "Integrity & Transparency",
        "Innovation & Excellence",
        "Community Engagement"
    ],
    services: [
        "24/7 Emergency Care",
        "Advanced Surgical Units",
        "Rehabilitation & Diagnostics",
        "Doctor & Patient Portals",
        "Telemedicine Services"
    ],
    contactInfo: {
        emails: [
            "samirasamonti@gmail.com",
            "samira.lamisha.samonti@g.bracu.ac.bd",
            "01948641933@gmail.com",
        ],
        phones: [
            "+880 1948 641 933",
            "+880 xxxx xxx xxx",
            "+880 xxxx xxx xxx",
            "+880 1955 884 993"
        ],
        address: "15 Rankin Street, Wari, Dhaka, 1203"
    }
};

// Middleware to check if the data exists in the database, and insert if it does not
const ensureAboutData = async (req, res, next) => {
    try {
        let about = await About.findOne();
        if (!about) {
            
            about = new About(aboutData);
            await about.save();
        }
        req.aboutData = about; 
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// GET /about - Retrieve about data from the database
router.get('/', ensureAboutData, (req, res) => {
    res.json(req.aboutData);
});

module.exports = router;
