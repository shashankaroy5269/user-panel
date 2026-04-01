"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2, XCircle, Info, X } from 'lucide-react';
import styles from './SweetAlert.module.css';

interface AlertProps {
  isOpen: boolean;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  onClose: () => void;
  onConfirm?: () => void;
}

const SweetAlert = ({ isOpen, type, title, message, onClose, onConfirm }: AlertProps) => {
  const iconConfig = {
    success: { icon: <CheckCircle2 size={48} color="#22c55e" />, bg: "#f0fdf4" },
    error: { icon: <XCircle size={48} color="#ef4444" />, bg: "#fef2f2" },
    warning: { icon: <AlertTriangle size={48} color="#f59e0b" />, bg: "#fffbeb" },
    info: { icon: <Info size={48} color="#3b82f6" />, bg: "#eff6ff" },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay} onClick={onClose}>
          <motion.div 
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.iconBox} style={{ backgroundColor: iconConfig[type].bg }}>
              {iconConfig[type].icon}
            </div>

            <div className={styles.textContent}>
              <h3>{title}</h3>
              <p>{message}</p>
            </div>

            <div className={styles.footer}>
              <button className={styles.secondaryBtn} onClick={onClose}>Cancel</button>
              {onConfirm && (
                <button className={`${styles.primaryBtn} ${styles[type]}`} onClick={onConfirm}>
                  Confirm
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SweetAlert;