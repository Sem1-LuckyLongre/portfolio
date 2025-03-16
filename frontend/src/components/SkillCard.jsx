import { motion } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as SiIcons from 'react-icons/si';
import * as GiIcons from 'react-icons/gi';
import TiltCard from './TiltCard';

const SkillCard = ({ skill, index }) => {
  // Combine all icon libraries
  const libraries = { ...FaIcons, ...AiIcons, ...MdIcons, ...SiIcons, ...GiIcons };
  
  // Get the icon dynamically
  const IconComponent = libraries[skill.icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
    >
      <TiltCard className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-full">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`text-5xl ${skill.color}`}>
            {IconComponent && <IconComponent />}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{skill.name}</h3>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export default SkillCard;