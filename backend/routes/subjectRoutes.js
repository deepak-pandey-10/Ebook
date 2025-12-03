import express from 'express';
import { PrismaClient } from '@prisma/client';
import "dotenv/config";

const router = express.Router();
const prisma = new PrismaClient();



router.post('/subjects', async (req, res) => {
    try {
        console.log('POST /subjects - Request body:', req.body);
        const { name, userId } = req.body;
        console.log('Extracted values - name:', name, 'userId:', userId);

        if (!name || !userId) {
            console.log('Validation failed - missing name or userId');
            return res.status(400).json({ message: "Name and UserId are required", flag: 'error' });
        }

        console.log('Creating subject with userId:', parseInt(userId));
        const subject = await prisma.subject.create({
            data: {
                name,
                userId: parseInt(userId)
            }
        });
        console.log('Subject created successfully:', subject);
        res.json(subject);
    } catch (error) {
        console.error('Error creating subject:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ message: error.message, flag: 'error' });
    }
});


router.get('/subjects', async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: "UserId is required", flag: 'error' });
        }
        const subjects = await prisma.subject.findMany({
            where: { userId: parseInt(userId) }
        });
        res.json(subjects);
    } catch (error) {
        res.status(500).json({ message: error.message, flag: 'error' });
    }
});


router.delete('/subjects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.subject.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: "Subject deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message, flag: 'error' });
    }
});


router.get('/subjects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await prisma.subject.findUnique({
            where: { id: parseInt(id) },
            include: {
                notes: true,
                videos: true
            }
        });
        if (!subject) {
            return res.status(404).json({ message: "Subject not found", flag: 'error' });
        }
        res.json(subject);
    } catch (error) {
        res.status(500).json({ message: error.message, flag: 'error' });
    }
});


router.post('/notes', async (req, res) => {
    try {
        const { title, url, subjectId } = req.body;
        if (!title || !url || !subjectId) {
            return res.status(400).json({ message: "Title, URL and SubjectId are required", flag: 'error' });
        }
        const note = await prisma.note.create({
            data: {
                title,
                url,
                subjectId: parseInt(subjectId)
            }
        });
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: error.message, flag: 'error' });
    }
});


router.post('/videos', async (req, res) => {
    try {
        const { title, url, subjectId } = req.body;
        if (!title || !url || !subjectId) {
            return res.status(400).json({ message: "Title, URL and SubjectId are required", flag: 'error' });
        }
        const video = await prisma.video.create({
            data: {
                title,
                url,
                subjectId: parseInt(subjectId)
            }
        });
        res.json(video);
    } catch (error) {
        res.status(500).json({ message: error.message, flag: 'error' });
    }
});


router.delete('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.note.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message, flag: 'error' });
    }
});


router.delete('/videos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.video.delete({
            where: { id: parseInt(id) }
        });
        res.json({ message: "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message, flag: 'error' });
    }
});

export default router;
