import { motion, AnimatePresence } from 'motion/react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
}

export function Toast({ message, show }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-attt-success text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
            <Check size={18} />
            <span style={{ fontFamily: 'var(--font-jakarta)', fontSize: '14px', fontWeight: 500 }}>
              {message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
