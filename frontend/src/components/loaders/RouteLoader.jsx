import { motion } from 'framer-motion';

const RouteLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center"
      >
        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
          ></motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-primary-600 dark:text-primary-400 font-medium"
          >
            Loading content...
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default RouteLoader;