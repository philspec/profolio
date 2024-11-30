import { motion } from "framer-motion";
import Image from "next/image";

const ProjectBox = ({ title, description, imageUrl, projectUrl, index, isGlowing }) => {
  const neonColors = [
    "rgb(88, 101, 242)", // Discord blue
    "rgb(162, 82, 242)", // Purple
    "rgb(255, 71, 242)", // Pink
    "rgb(71, 242, 255)", // Cyan
  ];

  return (
    <motion.a
      href={projectUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full p-6 rounded-xl bg-[#0a0a0a] border-2 border-[#1a1a1a] perspective-1000"
      animate={{
        borderColor: isGlowing ? neonColors[index] : '#1a1a1a',
        boxShadow: isGlowing 
          ? `0 0 15px ${neonColors[index]}20`
          : 'none'
      }}
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow: `0 0 30px 5px ${neonColors[index]}`,
        borderColor: neonColors[index],
        transition: {
          type: "spring",
          stiffness: 700,
          damping: 50
        }
      }}
    >
      <motion.div className="relative w-full mb-4 overflow-hidden rounded-lg aspect-video">
        <Image
          src={`/${imageUrl}`}
          alt={title}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index === 0}
        />
        <motion.div 
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          whileHover={{ 
            opacity: 0.2,
            transition: { duration: 0.2 }
          }}
        />
      </motion.div>
      
      <motion.h3 
        className="relative mb-2 text-2xl font-bold"
        style={{ color: neonColors[index] }}
        whileHover={{
          textShadow: `0 0 8px ${neonColors[index]}`
        }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="relative text-gray-300 text-md line-clamp-3"
        whileHover={{ color: '#fff' }}
      >
        {description}
      </motion.p>
      
      {isGlowing && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-xl"
          animate={{
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            background: `radial-gradient(circle at center, ${neonColors[index]}15, transparent 70%)`
          }}
        />
      )}
    </motion.a>
  );
};

export default ProjectBox; 