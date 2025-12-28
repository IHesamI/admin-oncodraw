import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { alertProps } from '../types';


const CustomAlertDialog = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    type = 'info',
    confirmText,
    cancelText,
}: alertProps) => {
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsRendered(true);
        } else {
            const timer = setTimeout(() => setIsRendered(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isRendered) return null;

    const themes = {
        danger: {
            icon: <XCircle className="w-6 h-6 text-red-600" />,
            button: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
            light: "bg-red-100",
            border: "border-red-100",
            buttonColor: undefined
        },
        success: {
            icon: <CheckCircle2 className="w-6 h-6 text-green-600" />,
            button: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
            light: "bg-green-100",
            border: "border-green-100",
            buttonColor: undefined
        },
        info: {
            icon: <Info className="w-6 h-6" style={{ color: '#1a72f5' }} />,
            button: "hover:opacity-90 focus:ring-offset-2",
            light: "bg-blue-50",
            border: "border-blue-100",
            buttonColor: '#1a72f5'
        }
    };

    const currentTheme = themes[type] || themes.info;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-all"
                onClick={onCancel}
            />

            <div
                className={`relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 ease-out sm:align-middle ${isOpen ? 'translate-y-0 scale-100' : 'translate-y-12 sm:translate-y-0 sm:scale-95'}`}
            >
                <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 p-2 rounded-full ${currentTheme.light}`}>
                        {currentTheme.icon}
                    </div>

                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900">
                            {title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                            {message}
                        </p>
                    </div>

                    <button
                        onClick={onCancel}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                    <button
                        type="button"
                        className="inline-flex justify-center items-center px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-slate-300"
                        onClick={onCancel}
                    >
                        {cancelText || 'Cancel'}
                    </button>
                    {onConfirm && <button
                        type="button"
                        className={`inline-flex justify-center items-center px-6 py-2.5 text-sm font-medium text-white rounded-xl shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${currentTheme.button}`}
                        style={currentTheme.buttonColor ? { backgroundColor: currentTheme.buttonColor } : undefined}
                        onClick={onConfirm}
                    >
                        {confirmText || 'Confirm'}
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default CustomAlertDialog;