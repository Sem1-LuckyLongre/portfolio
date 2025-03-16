import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectsA } from "../utils/projectsData";
import ProjectCard from "../components/ProjectCard";
import ScrollAnimation from "../components/ScrollAnimation";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const containerRef = useRef(null);
  const projects = ProjectsA.sort((a, b) => b.id - a.id);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for the background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Filter projects based on selected filter
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.tags.includes(filter));

  // Get unique tags from all projects
  const allTags = [...new Set(projects.flatMap((project) => project.tags))];

  return (
    <div
      ref={containerRef}
      className="min-h-screen pt-24 pb-16 relative overflow-hidden"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800"
        style={{ y: backgroundY }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation animation="slideDown" className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each project showcases
            different skills and technologies.
          </p>
        </ScrollAnimation>

        {/* Filter Buttons */}
        <ScrollAnimation animation="fadeIn" className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                filter === "all"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </motion.button>

            {allTags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                  filter === tag
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300">
              No projects found with the selected filter.
            </h3>
            <button
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
              onClick={() => setFilter("all")}
            >
              Show All Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
