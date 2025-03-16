import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ScrollAnimation = ({ 
  children, 
  className = '', 
  animation = 'fadeIn', 
  delay = 0,
  threshold = 0.1,
  duration = 0.5,
  once = true
}) => {
  const ref = useRef(null);
  const { isInView } = useScrollAnimation(ref, threshold);
  
  // Animation variants
  const animations = {
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { 
          duration,
          delay,
          ease: 'easeOut'
        }
      }
    },
    slideUp: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration,
          delay,
          ease: 'easeOut'
        }
      }
    },
    slideDown: {
      hidden: { opacity: 0, y: -50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration,
          delay,
          ease: 'easeOut'
        }
      }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 50 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration,
          delay,
          ease: 'easeOut'
        }
      }
    },
    slideRight: {
      hidden: { opacity: 0, x: -50 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { 
          duration,
          delay,
          ease: 'easeOut'
        }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration,
          delay,
          ease: 'easeOut'
        }
      }
    }
  };
  
  const selectedAnimation = animations[animation] || animations.fadeIn;
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedAnimation}
      viewport={{ once }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation; 