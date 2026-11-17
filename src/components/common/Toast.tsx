import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, Sparkles, X, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start space-x-3 p-4 rounded-sm bg-espresso/95 backdrop-blur-md border border-champagne/40 text-cream shadow-luxury transition-all duration-300 animate-slide-up"
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            ) : toast.type === 'info' ? (
              <Info className="w-5 h-5 text-champagne" />
            ) : (
              <Sparkles className="w-5 h-5 text-champagne" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium tracking-wide text-cream">{toast.title}</h4>
            {toast.description && (
              <p className="mt-1 text-xs text-cream/75 leading-relaxed">{toast.description}</p>
            )}
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="flex-shrink-0 text-cream/60 hover:text-cream transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
