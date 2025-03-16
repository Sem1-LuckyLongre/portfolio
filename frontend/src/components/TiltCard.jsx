import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TiltCard = ({ children, className = '', depth = 20 }) => {
  const ref = useRef(null);
  
  // Motion values for tracking mouse position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring animations for smoother movement
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });
  
  // Transform mouse position to rotation values
  const rotateX = useTransform(springY, [-0.5, 0.5], [depth, -depth]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-depth, depth]);
  
  // Handle mouse move
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card center (values between -0.5 and 0.5)
    const xPos = (e.clientX - rect.left) / width - 0.5;
    const yPos = (e.clientY - rect.top) / height - 0.5;
    
    x.set(xPos);
    y.set(yPos);
  };
  
  // Reset position on mouse leave
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard; 