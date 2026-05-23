import { motion } from 'framer-motion';

const variantClasses = {
    primary: 'bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-[0_12px_30px_rgba(37,99,235,0.28)] hover:from-sky-700 hover:to-blue-800 focus-visible:ring-sky-200',
    secondary: 'border border-sky-200 bg-white text-slate-700 hover:bg-sky-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
};

const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-5 py-3 text-base'
};

export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={`inline-flex min-h-[44px] items-center justify-center rounded-2xl font-semibold transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
}
