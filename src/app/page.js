'use client';
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll, useMotionValueEvent, useAnimate } from "framer-motion";
import ProjectBox from "@/components/ProjectBox";

const projects = [
  {
    title: "YTrendz",
    description: "Dive deeper into YouTube with a tool that summarizes transcripts, analyzes comments, and empowers users with custom prompts for tailored insights.",
    imageUrl: "ytrendz.png",
    projectUrl: "https://ytrendz.netlify.app"
  },
  {
    title: "NPM Git",
    description: "A dynamic platform combining npm and GitHub stats, delivering a holistic view of package popularity and performance.",
    imageUrl: "npmgit.png",
    projectUrl: "https://npmgit.netlify.app"
  },
  {
    title: "Gamer Spot",
    description: "The ultimate destination for gaming enthusiasts, offering everything a gamer needs under one roof.",
    imageUrl: "gamerspot.png",
    projectUrl: "https://gamerspot.vercel.app"
  },
  {
    title: "Landing Craft",
    description: "Effortlessly design and deploy stunning, user-focused landing pages that leave a lasting impression.",
    imageUrl: "landingcraft.png",
    projectUrl: "https://landingcraft.vercel.app"
  }
];

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth);
    mouseY.set(clientY / innerHeight);
  };

  const gradientX = useSpring(useTransform(mouseX, [0, 1], ["10%", "90%"]), {
    stiffness: 50,
    damping: 30
  });
  const gradientY = useSpring(useTransform(mouseY, [0, 1], ["10%", "90%"]), {
    stiffness: 50,
    damping: 30
  });

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 40,
    stiffness: 400,
    mass: .2,
    restDelta: 0.001
  });

  const x = useTransform(
    smoothProgress,
    [
      0, 0.02, 0.04, 0.06, 0.08, 0.1,    // First vertical line (500)
      0.12, 0.14, 0.16, 0.18, 0.2,       // Still vertical (500)
      0.22, 0.24, 0.26, 0.28, 0.3,       // Moving to right (500->600)
      0.32, 0.34, 0.36, 0.38, 0.4,       // Staying at 600
      0.42, 0.44, 0.46, 0.48, 0.5,       // Moving left (600->400)
      0.52, 0.54, 0.56, 0.58, 0.6,       // Staying at 400
      0.62, 0.64, 0.66, 0.68, 0.7,       // Moving right (400->600)
      0.72, 0.74, 0.76, 0.78, 0.8,       // Staying at 600
      0.82, 0.84, 0.86, 0.88, 0.9,       // Moving left (600->400)
      0.92, 0.94, 0.96, 0.98, 1          // Final movement (400->450)
    ],
    [
      500, 500, 500, 500, 500, 500,      // First vertical line
      500, 500, 500, 500, 500,           // Still vertical
      520, 540, 560, 580, 600,           // Smooth movement right
      600, 600, 600, 600, 600,           // Staying at 600
      560, 520, 480, 440, 400,           // Smooth movement left
      400, 400, 400, 400, 400,           // Staying at 400
      440, 480, 520, 560, 600,           // Smooth movement right
      600, 600, 600, 600, 600,           // Staying at 600
      560, 520, 480, 440, 400,           // Smooth movement left
      400, 400, 400, 400, 480            // Smooth final movement
    ]
  );

  const y = useTransform(
    smoothProgress,
    [
      0, 0.02, 0.04, 0.06, 0.08, 0.1,    // Moving down (50->200)
      0.12, 0.14, 0.16, 0.18, 0.2,       // Moving to 230
      0.22, 0.24, 0.26, 0.28, 0.3,       // Staying at 230
      0.32, 0.34, 0.36, 0.38, 0.4,       // Moving down (230->430)
      0.42, 0.44, 0.46, 0.48, 0.5,       // Staying at 430
      0.52, 0.54, 0.56, 0.58, 0.6,       // Moving down (430->630)
      0.62, 0.64, 0.66, 0.68, 0.7,       // Staying at 630
      0.72, 0.74, 0.76, 0.78, 0.8,       // Moving down (630->830)
      0.82, 0.84, 0.86, 0.88, 0.9,       // Staying at 830
      0.92, 0.94, 0.96, 0.98, 1          // Moving to 920
    ],
    [
      50, 80, 110, 140, 170, 200,        // Smooth movement down
      208, 215, 222, 226, 230,           // Smooth movement to 230
      230, 230, 230, 230, 230,           // Staying at 230
      270, 310, 350, 390, 430,           // Smooth movement down
      430, 430, 430, 430, 430,           // Staying at 430
      470, 510, 550, 590, 630,           // Smooth movement down
      630, 630, 630, 630, 630,           // Staying at 630
      670, 710, 750, 790, 830,           // Smooth movement down
      830, 830, 830, 830, 830,           // Staying at 830
      850, 870, 890, 920, 920            // Final smooth movement
    ]
  );

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const scrollInterval = useRef(null);
  
  const startScroll = (direction) => {
    setIsScrolling(true);
    setScrollDirection(direction);
    
    if (scrollInterval.current) return; // Prevent multiple intervals
    
    scrollInterval.current = setInterval(() => {
      const scrollAmount = direction === 'up' ? -2 : 2;
      window.scrollBy({
        top: scrollAmount,
        behavior: 'auto' // Using 'auto' for smoother continuous scroll
      });
    }, 5); // Very small interval for smooth scrolling
  };
  
  const stopScroll = () => {
    setIsScrolling(false);
    setScrollDirection(null);
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (scrollInterval.current) {
        clearInterval(scrollInterval.current);
      }
    };
  }, []);

  const [activeBoxIndex, setActiveBoxIndex] = useState(null);

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (latest >= 0.32 && latest <= 0.4) {  // First vertical movement (230->430)
        setActiveBoxIndex(0);
      } else if (latest >= 0.52 && latest <= 0.6) {  // Second vertical movement (430->630)
        setActiveBoxIndex(1);
      } else if (latest >= 0.72 && latest <= 0.8) {  // Third vertical movement (630->830)
        setActiveBoxIndex(2);
      } else if (latest >= 0.92 && latest <= 1) {  // Final movement (830->920)
        setActiveBoxIndex(3);
      } else {
        setActiveBoxIndex(null);
      }
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <motion.div 
      className="relative min-h-screen overflow-hidden bg-[#030303] text-white p-8"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic gradient background - Increased opacity and size */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at var(--x) var(--y), rgba(88, 101, 242, 0.25), rgba(162, 82, 242, 0.25), transparent 70%)",
          "--x": gradientX,
          "--y": gradientY,
        }}
      />

      {/* Neon Path SVG */}
      <svg
        className="absolute inset-0 z-10 w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        style={{ 
          filter: 'blur(2px)',
          opacity: 0.8,
          mixBlendMode: 'screen',
        }}
        preserveAspectRatio="xMidYMid slice"
      >
        {/* First, define the path that will be followed */}
        <defs>
          <path
            id="motionPath"
            d="M 500 50 L 500 200 L 500 230 L 600 230 L 600 430 L 400 430 L 400 630 L 600 630 L 600 830 L 400 830 L 400 920 L 450 920"
            fill="none"
          />
        </defs>

        {/* Main path */}
        <motion.path
          d={`
            M 500 50
            L 500 200
            L 500 230
            L 600 230
            L 600 430
            L 400 430
            L 400 630
            L 600 630
            L 600 830
            L 400 830
            L 400 920
            L 450 920
          `}
          stroke="url(#neonGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: scrollYProgress }}
          transition={{
            duration: 0.1,
            ease: "linear"
          }}
        />

        {/* Diamond */}
        <motion.g>
          {/* Glow effect */}
          <motion.circle
            cx={0}
            cy={0}
            r={10}
            fill="rgba(88, 101, 242, 0.3)"
            style={{
              filter: 'blur(5px)',
              x,
              y
            }}
          />

          {/* Main diamond */}
          <motion.circle
            cx={0}
            cy={0}
            r={7}
            fill="white"
            style={{
              filter: 'drop-shadow(0 0 8px rgb(88, 101, 242)) drop-shadow(0 0 5px rgb(162, 82, 242))',
              x,
              y
            }}
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.g>

        {/* Gradient definition */}
        <defs>
          <linearGradient 
            id="neonGradient" 
            gradientUnits="userSpaceOnUse"
            x1="350" 
            y1="0" 
            x2="350" 
            y2="1000"
          >
            <stop offset="0%" stopColor="rgb(88, 101, 242)" />
            <stop offset="33%" stopColor="rgb(162, 82, 242)" />
            <stop offset="66%" stopColor="rgb(255, 71, 242)" />
            <stop offset="100%" stopColor="rgb(71, 242, 255)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Pattern overlay - Increased opacity and contrast */}
      <motion.div
        className="absolute inset-0 opacity-50 pointer-events-none z-5"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(88, 101, 242, 0.1) 25%, transparent 25%), 
            linear-gradient(-45deg, rgba(162, 82, 242, 0.1) 25%, transparent 25%)
          `,
          backgroundSize: "60px 60px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Main diagonal gradient - Enhanced colors and opacity */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(162, 82, 242, 0.15) 100%)",
            "linear-gradient(135deg, rgba(88, 101, 242, 0.25) 0%, rgba(162, 82, 242, 0.25) 100%)",
            "linear-gradient(135deg, rgba(88, 101, 242, 0.15) 0%, rgba(162, 82, 242, 0.15) 100%)",
          ]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      {/* Scroll buttons */}
      <div className="fixed z-50 flex flex-col gap-4 right-8 top-8">
        <motion.button
          className="w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-[#5865F2] flex items-center justify-center"
          onMouseDown={() => startScroll('up')}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
          onTouchStart={() => startScroll('up')}
          onTouchEnd={stopScroll}
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 0 15px rgb(88, 101, 242)',
          }}
          whileTap={{
            scale: 0.95,
            boxShadow: '0 0 20px rgb(88, 101, 242)',
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-[#5865F2]"
          >
            <path 
              d="M12 4L4 12H9V20H15V12H20L12 4Z" 
              fill="currentColor"
            />
          </svg>
        </motion.button>

        <motion.button
          className="w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-[#5865F2] flex items-center justify-center"
          onMouseDown={() => startScroll('down')}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
          onTouchStart={() => startScroll('down')}
          onTouchEnd={stopScroll}
          whileHover={{ 
            scale: 1.1,
            boxShadow: '0 0 15px rgb(88, 101, 242)',
          }}
          whileTap={{
            scale: 0.95,
            boxShadow: '0 0 20px rgb(88, 101, 242)',
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-[#5865F2]"
          >
            <path 
              d="M12 20L20 12H15V4H9V12H4L12 20Z" 
              fill="currentColor"
            />
          </svg>
        </motion.button>
      </div>

      {/* Content container with highest z-index */}
      <div className="relative z-20 grid grid-cols-1 gap-48 mx-auto max-w-7xl">
        {/* Title Section */}
        <motion.div 
          className="text-center mb-[100vh]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl leading-normal py-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5865F2] via-[#A252F2] to-[#FF47F2] 
            animate-glow filter drop-shadow-[0_0_10px_rgba(88,101,242,0.8)] 
            [text-shadow:_0_0_30px_rgba(88,101,242,0.5),_0_0_40px_rgba(162,82,242,0.3),_0_0_50px_rgba(255,71,242,0.2)]">
            Profolio
          </h1>
          <h2 className="text-2xl font-sans bg-clip-text text-transparent bg-gradient-to-r from-[#5865F2] via-[#FFB86C] to-[#A252F2]
            filter drop-shadow-[0_0_8px_rgba(88,101,242,0.6)]
            [text-shadow:_0_0_20px_rgba(88,101,242,0.4),_0_0_30px_rgba(255,184,108,0.3)]">
            A Portfolio of my projects
          </h2>
        </motion.div>

        {/* Projects */}
        {projects.map((project, index) => (
          <div 
            key={project.title}
            className={`w-full flex ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            <motion.div 
              className="w-[90%] md:w-[80%] lg:w-[60%]"
              whileHover={{ scale: 1.02 }}
              animate={{
                boxShadow: activeBoxIndex === index 
                  ? '0 0 30px rgb(88, 101, 242), 0 0 50px rgb(162, 82, 242)' 
                  : 'none'
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
              }}
            >
              <ProjectBox {...project} index={index} isGlowing={activeBoxIndex === index} />
            </motion.div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
