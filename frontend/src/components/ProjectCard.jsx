import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import TiltCard from './TiltCard';

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      className="h-full"
    >
      <TiltCard className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, i) => (
              <span 
                key={i} 
                className="px-2 py-1 text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex justify-between mt-auto">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub className="mr-1" /> Code
            </motion.a>
            
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiExternalLink className="mr-1" /> Demo
            </motion.a>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export default ProjectCard; 