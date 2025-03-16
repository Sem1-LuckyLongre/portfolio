import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { skills } from '../utils/projectsData';
import SkillCard from '../components/SkillCard';
import ScrollAnimation from '../components/ScrollAnimation';

const Skills = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Parallax effect for the background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  return (
    <div ref={containerRef} className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800"
        style={{ y: backgroundY }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimation animation="slideDown" className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">My Skills</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I've worked with a variety of technologies and frameworks to create modern web applications.
            Here are some of the key skills I've developed over the years.
          </p>
        </ScrollAnimation>
        
        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {skills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} index={index} />
          ))}
        </div>
        
        {/* Additional Skills Section */}
        <ScrollAnimation animation="fadeIn" className="mt-20">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Additional Skills</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Frontend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    HTML5, CSS3, JavaScript (ES6+)
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    React, Redux, Context API
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    Responsive Design, CSS-in-JS
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    Webpack, Vite, Modern Build Tools
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Backend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    Node.js, Express, RESTful APIs
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    MongoDB, PostgreSQL, Firebase
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    Authentication, Authorization
                  </li>
                  <li className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                    API Design, Microservices
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};

export default Skills; 