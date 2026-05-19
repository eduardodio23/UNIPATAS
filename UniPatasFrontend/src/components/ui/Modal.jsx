import { AnimatePresence, motion } from 'framer-motion';

export default function Modal({ open, onClose, title, description, children, actions }) {
    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    key="modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ y: 36, opacity: 0, scale: 0.96 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: 24, opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                        className="w-full max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-800 dark:bg-slate-950"
                    >
                        <div className="mb-6 flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
                                {description ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p> : null}
                            </div>
                            <button
                                type="button"
                                className="rounded-2xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                                onClick={onClose}
                            >
                                Fechar
                            </button>
                        </div>
                        <div className="space-y-6">{children}</div>
                        {actions ? <div className="mt-6 flex flex-wrap items-center gap-3">{actions}</div> : null}
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
