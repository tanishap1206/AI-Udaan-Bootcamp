import { motion, AnimatePresence } from "framer-motion";
import { modalVariants } from "@/lib/animationVariants";
import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            className="relative z-10 bg-white rounded-xl shadow-2xl p-8 w-full max-w-md"
            variants={modalVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
