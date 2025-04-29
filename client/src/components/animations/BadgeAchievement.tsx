import React from 'react';
import { motion } from 'framer-motion';

export default function BadgeAchievement() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Trophy Base */}
      <motion.rect 
        x="45" 
        y="90" 
        width="30" 
        height="10" 
        rx="2"
        fill="#795548"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      
      {/* Trophy Stem */}
      <motion.rect 
        x="57" 
        y="70" 
        width="6" 
        height="20" 
        rx="1"
        fill="#FFC107"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 20 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      />
      
      {/* Trophy Cup */}
      <motion.path 
        d="M40 30 V60 A15 15 0 0 0 80 60 V30 H40Z" 
        fill="#FFC107"
        stroke="#FFA000"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.5, type: "spring" }}
      />
      
      {/* Left Handle */}
      <motion.path 
        d="M40 40 C30 40, 30 50, 40 50" 
        stroke="#FFA000"
        strokeWidth="3"
        fill="none"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ delay: 1.4, duration: 0.4 }}
      />
      
      {/* Right Handle */}
      <motion.path 
        d="M80 40 C90 40, 90 50, 80 50" 
        stroke="#FFA000"
        strokeWidth="3"
        fill="none"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ delay: 1.4, duration: 0.4 }}
      />
      
      {/* Star 1 */}
      <motion.path 
        d="M60 20 l3 7 h7 l-5 5 2 7 -7 -4 -7 4 2 -7 -5 -5 h7 z" 
        fill="#FFEB3B"
        stroke="#FFC107"
        strokeWidth="1"
        initial={{ opacity: 0, scale: 0, y: 0 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          y: [-5, 0]
        }}
        transition={{ 
          opacity: { delay: 1.8, duration: 0.3 },
          scale: { delay: 1.8, duration: 0.5, type: "spring" },
          y: { delay: 2.1, duration: 1.5, repeat: Infinity, repeatType: "reverse" }
        }}
      />
      
      {/* Sparkles */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 2, duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
      >
        <circle cx="45" cy="25" r="2" fill="white" />
        <circle cx="75" cy="25" r="2" fill="white" />
        <circle cx="35" cy="60" r="2" fill="white" />
        <circle cx="85" cy="60" r="2" fill="white" />
      </motion.g>
      
      {/* Confetti */}
      {[...Array(15)].map((_, i) => (
        <motion.rect
          key={i}
          x="60"
          y="40"
          width="4"
          height="4"
          rx="1"
          fill={["#F44336", "#2196F3", "#4CAF50", "#FFEB3B", "#9C27B0"][i % 5]}
          initial={{ 
            x: 60,
            y: 40,
            opacity: 0,
            rotate: 0
          }}
          animate={{ 
            x: 30 + Math.random() * 60,
            y: 10 + Math.random() * 80,
            opacity: [0, 1, 0],
            rotate: Math.random() * 360
          }}
          transition={{ 
            delay: 1.9 + (i * 0.05),
            duration: 1 + Math.random(),
            ease: "easeOut"
          }}
        />
      ))}
    </svg>
  );
}
