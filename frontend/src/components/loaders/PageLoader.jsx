import { motion } from 'framer-motion';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900 z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex flex-col items-center justify-center">
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 rounded-full border-t-2 border-l-2 border-primary-500 absolute"
            ></motion.div>
            
            <motion.div
              animate={{
                scale: [1, 0.8, 1],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-12 h-12 rounded-full border-t-2 border-r-2 border-secondary-500 absolute left-2 top-2"
            ></motion.div>
            
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-8 h-8 rounded-full border-b-2 border-accent-500 absolute left-4 top-4"
            ></motion.div>
          </div>
          
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-xl font-semibold text-primary-600 dark:text-primary-400"
          >
            Loading Workspace
          </motion.h3>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full mt-3 max-w-xs"
          ></motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PageLoader;