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
    title: "Gemmery",
    description: "A Privacy first, ultra lite, totally free youtube summarizer extension",
    imageUrl: "Gemmery.png",
    projectUrl: "https://github.com/philspec/gemmery"
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
    [0, 0.0833, 0.1667, 0.25, 0.3333, 0.4167, 0.5, 0.5833, 0.6667, 0.75, 0.8333, 0.9167, 1],
    [500, 500, 500, 600, 600, 400, 400, 600, 600, 400, 400, 450, 450]
  );

  const y = useTransform(
    smoothProgress,
    [0, 0.0833, 0.1667, 0.25, 0.3333, 0.4167, 0.5, 0.5833, 0.6667, 0.75, 0.8333, 0.9167, 1],
    [50, 200, 230, 230, 430, 430, 630, 630, 830, 830, 920, 920, 1000]
  );

  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const scrollInterval = useRef(null);
  
  const startScroll = (direction) => {
    setIsScrolling(true);
    setScrollDirection(direction);
    
    if (scrollInterval.current) return; // Prevent multiple intervals
    
    scrollInterval.current = setInterval(() => {
      // Smaller scroll increments for a smoother effect:
      const scrollAmount = direction === 'up' ? -1 : 1;
      window.scrollBy({
        top: scrollAmount,
        behavior: 'auto'
      });
    }, 0.5); // Increased interval duration for finer scrolling installments
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
      // Only start counting after 20% progress and finish at 100% (0.2 to 1 range)
      if (latest < 0.2) {
        setActiveBoxIndex(null);
        return;
      }
      const effectiveProgress = (latest - 0.2) / 0.8;
      const index = Math.floor(effectiveProgress * projects.length);
      // Prevent overflow in case index equals projects.length
      if (index >= projects.length) {
        setActiveBoxIndex(projects.length - 1);
      } else {
        setActiveBoxIndex(index);
      }
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      // Multiply deltaY by a factor (e.g. 0.3) to reduce scroll jump
      const scrollDelta = event.deltaY * 0.15;
      window.scrollBy({
        top: scrollDelta,
        behavior: 'auto'
      });
    };
    
    // Add listener with passive:false to allow preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });
    
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

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
            d="M 500 50 L 500 200 L 500 230 L 600 230 L 600 430 L 400 430 L 400 630 L 600 630 L 600 830 L 400 830 L 400 920 L 450 920 L 450 1000"
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
            L 450 1000
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
            stiffness: 150,
            damping: 2
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
