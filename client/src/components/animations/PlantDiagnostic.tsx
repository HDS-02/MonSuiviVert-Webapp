import React from 'react';
import { motion } from 'framer-motion';

export default function PlantDiagnostic() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Magnifying glass */}
      <motion.g
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.circle
          cx="45"
          cy="45"
          r="25"
          stroke="#2196F3"
          strokeWidth="5"
          fill="#E3F2FD"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        />
        
        <motion.path
          d="M65 65 L85 85"
          stroke="#2196F3"
          strokeWidth="5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        />
      </motion.g>
      
      {/* Sick plant */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <motion.path
          d="M40 45 L40 30 C40 25, 35 20, 30 25"
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{ 
            y: [0, -2, 0],
            rotate: [0, -5, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            repeatDelay: 0.5
          }}
          style={{ transformOrigin: "40px 45px" }}
        />
        
        <motion.path
          d="M40 35 C45 33, 50 35, 48 40"
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{ 
            y: [0, -1, 0],
            rotate: [0, 3, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            delay: 0.3,
            repeatDelay: 0.5
          }}
          style={{ transformOrigin: "40px 35px" }}
        />
        
        {/* Wilting leaf */}
        <motion.path
          d="M40 40 C50 41, 55 38, 53 30"
          stroke="#4CAF50"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          animate={{ 
            y: [0, 2, 0],
            rotate: [0, -8, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            delay: 0.6,
            repeatDelay: 0.2
          }}
          style={{ transformOrigin: "40px 40px" }}
        />
        
        {/* Problem symbols */}
        <motion.g
          animate={{ 
            opacity: [0, 1, 0],
            y: [-5, 0, -5]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            delay: 1,
            repeatDelay: 0.2
          }}
        >
          <circle cx="30" cy="20" r="3" fill="#F44336" />
          <circle cx="48" cy="28" r="3" fill="#F44336" />
          <circle cx="55" cy="38" r="3" fill="#F44336" />
        </motion.g>
      </motion.g>
      
      {/* SOS Pulse */}
      <motion.circle
        cx="45"
        cy="45"
        r="35"
        stroke="#FF5722"
        strokeWidth="2"
        fill="none"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.2],
          opacity: [0, 0.5, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 2,
          repeatDelay: 0.5
        }}
      />
      
      {/* Alert Symbol */}
      <motion.g
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.path
          d="M95 80 H110 V95 H95 Z"
          fill="#F44336"
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 1, repeatDelay: 2 }}
          style={{ transformOrigin: "102.5px 87.5px" }}
        />
        
        <motion.text
          x="102.5"
          y="92"
          textAnchor="middle"
          fill="white"
          fontWeight="bold"
          fontSize="14"
        >
          SOS
        </motion.text>
      </motion.g>
      
      {/* Diagnostic result */}
      <motion.path
        d="M70 100 H105 A5 5 0 0 0 110 95 V110 H65 V105 A5 5 0 0 1 70 100 Z"
        fill="#E1F5FE"
        stroke="#0288D1"
        strokeWidth="1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.3, duration: 0.5 }}
      />
      
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6, duration: 0.5 }}
      >
        <motion.path
          d="M70 105 H90"
          stroke="#0288D1"
          strokeWidth="1"
          strokeDasharray="1 2"
        />
        
        <motion.path
          d="M70 110 H100"
          stroke="#0288D1"
          strokeWidth="1"
          strokeDasharray="1 2"
        />
        
        <motion.path
          d="M70 115 H95"
          stroke="#0288D1"
          strokeWidth="1"
          strokeDasharray="1 2"
        />
      </motion.g>
    </svg>
  );
}
