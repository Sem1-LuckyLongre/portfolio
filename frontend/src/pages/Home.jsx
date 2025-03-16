import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ScrollAnimation from '../components/ScrollAnimation';

const Home = () => {
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeInOut'
      }
    })
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: 'easeInOut'
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 z-0" />
        
        {/* Animated circles in background */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-300 dark:bg-indigo-700 opacity-20 blur-3xl z-0"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-300 dark:bg-purple-700 opacity-20 blur-3xl z-0"
          animate={{ 
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            initial="hidden"
            animate="visible"
            custom={0}
            variants={textVariants}
          >
            Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Lucky Longre</span>
          </motion.h1>
          
          <motion.h2 
            className="text-2xl md:text-3xl font-medium mb-8 text-gray-700 dark:text-gray-300"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={textVariants}
          >
            Full Stack Developer
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10"
            initial="hidden"
            animate="visible"
            custom={2}
            variants={textVariants}
          >
            I build beautiful, interactive, and high-performance web applications using modern technologies.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <motion.button
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              variants={buttonVariants}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
            >
              <Link to="/projects" className="flex items-center">
                View Projects <FiArrowRight className="ml-2" />
              </Link>
            </motion.button>
            
            <motion.button
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              variants={buttonVariants}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to="/contact">Contact Me</Link>
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      {/* About Section Preview */}
      <ScrollAnimation animation="slideUp" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">About Me</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              I'm a passionate developer with expertise in modern web technologies. I love creating
              beautiful and functional user experiences that solve real-world problems.
            </p>
            <Link 
              to="/skills" 
              className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-300"
            >
              Learn more about my skills <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </ScrollAnimation>
    </div>
  );
};

export default Home; 