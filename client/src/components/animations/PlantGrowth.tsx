import React from 'react';
import { motion } from 'framer-motion';

export default function PlantGrowth() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Pot */}
      <motion.path 
        d="M40 100 H80 L85 80 H35 Z" 
        fill="#E57373"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      />
      
      {/* Soil */}
      <motion.path 
        d="M43 80 H77 V90 A5 5 0 0 1 43 90 Z" 
        fill="#795548"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      />
      
      {/* Stem */}
      <motion.path 
        d="M60 80 L60 40"
        stroke="#4CAF50"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.9, duration: 1 }}
      />
      
      {/* Left leaf */}
      <motion.path 
        d="M60 60 C50 55, 40 60, 45 70"
        stroke="#4CAF50"
        strokeWidth="3"
        fill="#81C784"
        strokeLinecap="round"
        initial={{ opacity: 0, scale: 0, originX: "60px", originY: "60px" }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      />
      
      {/* Right leaf */}
      <motion.path 
        d="M60 60 C70 55, 80 60, 75 70"
        stroke="#4CAF50"
        strokeWidth="3"
        fill="#81C784"
        strokeLinecap="round"
        initial={{ opacity: 0, scale: 0, originX: "60px", originY: "60px" }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      />
      
      {/* Top leaf */}
      <motion.path 
        d="M60 40 C55 30, 65 30, 60 40"
        stroke="#4CAF50"
        strokeWidth="3"
        fill="#81C784"
        strokeLinecap="round"
        initial={{ opacity: 0, scale: 0, originX: "60px", originY: "40px" }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.1, duration: 0.5 }}
      />
      
      {/* Water drops */}
      <motion.circle 
        cx="50" 
        cy="30" 
        r="3" 
        fill="#03A9F4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: [null, 35, 40], 
          opacity: [0, 1, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          repeatDelay: 0.5,
          ease: "easeIn"
        }}
      />
      
      <motion.circle 
        cx="60" 
        cy="20" 
        r="3" 
        fill="#03A9F4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: [null, 60, 65], 
          opacity: [0, 1, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2.5,
          delay: 0.3,
          repeatDelay: 0.5,
          ease: "easeIn"
        }}
      />
      
      <motion.circle 
        cx="70" 
        cy="30" 
        r="3" 
        fill="#03A9F4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ 
          y: [null, 35, 40], 
          opacity: [0, 1, 0] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.8,
          delay: 0.6,
          repeatDelay: 0.5,
          ease: "easeIn"
        }}
      />
      
      {/* Sun rays */}
      <motion.g
        animate={{ 
          rotate: 360
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 20,
          ease: "linear"
        }}
        style={{ transformOrigin: "20px 20px" }}
      >
        <motion.path 
          d="M20 5 L20 10" 
          stroke="#FFC107" 
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path 
          d="M5 20 L10 20" 
          stroke="#FFC107" 
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path 
          d="M9 9 L13 13" 
          stroke="#FFC107" 
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path 
          d="M9 31 L13 27" 
          stroke="#FFC107" 
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.path 
          d="M31 9 L27 13" 
          stroke="#FFC107" 
          strokeWidth="2"
          strokeLinecap="round"
        />
      </motion.g>
      
      {/* Sun */}
      <motion.circle 
        cx="20" 
        cy="20" 
        r="5" 
        fill="#FFC107"
        animate={{ 
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3
        }}
      />
    </svg>
  );
}
