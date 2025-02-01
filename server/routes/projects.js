const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const authenticateToken = require('../middleware/auth');

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects for the authenticated user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProjectInput'
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid project data
 *       401:
 *         description: Unauthorized
 *
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The project ID
 *         name:
 *           type: string
 *           description: The project name
 *         userId:
 *           type: integer
 *           description: The ID of the user who owns the project
 *       example:
 *         id: 1
 *         name: Example Project
 *         userId: 1
 *     ProjectInput:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: The project name
 *       example:
 *         name: Example Project
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// GET all projects for a user (protected route)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const projects = await Project.findAll({ where: { userId: req.user.userId } });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST create a new project (protected route)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;

    console.log("Request body:", req.body);

    const project = await Project.create({
      name,
      userId: req.user.userId, // Associate project with user
    });

    console.log("Created project:", project.toJSON());

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a project (protected route)
router.delete('/:projectId', authenticateToken, async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const project = await Project.findOne({ where: { id: projectId } });
  
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
      // Check if the authenticated user owns the project
      if (req.user.userId !== project.userId) {
        return res.status(403).json({ message: 'Forbidden' });
      }
  
      await project.destroy();
      res.status(204).send(); // No content (successful deletion)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = router;
