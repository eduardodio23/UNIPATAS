import { motion } from 'framer-motion';

const variantClasses = {
    primary: 'bg-brand text-white hover:bg-brandDark focus-visible:ring-brand/50',
    secondary: 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200',
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
