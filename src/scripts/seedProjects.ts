import dotenv from "dotenv";
import mongoose from "mongoose";
import config from "../config";
import { Project } from "../models/project.model";

// Load environment variables
dotenv.config();

const sampleProjects = [
  {
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform built with React and Node.js",
    technologies: ["React", "Node.js", "MongoDB", "Express", "TypeScript"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    featured: true,
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application using OpenWeather API",
    technologies: ["JavaScript", "HTML5", "CSS3", "REST API"],
    githubUrl: "https://github.com/yourusername/weather-app",
    liveUrl: "https://weather-demo.com",
    featured: false,
  },
  {
    title: "Task Management System",
    description: "A Kanban-style task management application",
    technologies: ["React", "TypeScript", "Material-UI", "Firebase"],
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "https://task-manager-demo.com",
    featured: true,
  },
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(config?.database || "");

    // Clear existing projects
    await Project.deleteMany({});
    console.log("Cleared existing projects");

    // Insert new projects
    const createdProjects = await Project.insertMany(sampleProjects);
    console.log(`Successfully seeded ${createdProjects.length} projects`);

    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
