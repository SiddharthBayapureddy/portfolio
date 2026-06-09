"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type ToastContextType = {
  showToast: (msg: string) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
}

export function EasterEggProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);
  const [showSudo, setShowSudo] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Keyboard Sequences
  useEffect(() => {
    const konamiCode = [
      "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", 
      "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", 
      "b", "a"
    ];
    const sudoCode = ["s", "u", "d", "o"];
    const hireMeCode = ["h", "i", "r", "e", " ", "m", "e"];
    
    let keyBuffer: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (activeElement && ["INPUT", "TEXTAREA"].includes(activeElement.tagName)) return;

      keyBuffer.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
      if (keyBuffer.length > 20) keyBuffer.shift();

      // Check Konami
      if (keyBuffer.slice(-10).join(",") === konamiCode.map(k => k.length === 1 ? k.toLowerCase() : k).join(",")) {
        document.body.setAttribute("data-chaos", "true");
        showToast("you found it. respect. 🎨");
        setTimeout(() => {
          document.body.removeAttribute("data-chaos");
        }, 5000);
        keyBuffer = [];
      }

      // Check Sudo
      if (keyBuffer.slice(-4).join("") === sudoCode.join("")) {
        setShowSudo(true);
        setTimeout(() => setShowSudo(false), 3000);
        keyBuffer = [];
      }

      // Check Hire Me
      if (keyBuffer.slice(-7).join("") === hireMeCode.join("")) {
        console.log("%c👀 Oh, you opened DevTools? We should talk.", "color: #3b82f6; font-size: 14px;");
        console.log("%csiddharthbayapureddy@gmail.com", "color: #10b981; font-size: 14px;");
        keyBuffer = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Idle Observer (60s)
  useEffect(() => {
    let idleTimeout: NodeJS.Timeout;
    const resetIdle = () => {
      clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        console.log("still there? me too. stuck on a bug.");
      }, 60000);
    };

    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("keypress", resetIdle);
    resetIdle();

    return () => {
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("keypress", resetIdle);
      clearTimeout(idleTimeout);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5 rounded-lg border border-border bg-foreground px-6 py-3 font-mono text-sm font-medium text-background shadow-2xl">
          {toast}
        </div>
      )}
      {showSudo && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-[600px] animate-in zoom-in-95 fade-in rounded-xl border border-border bg-[#0a0a0a] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
          <div className="flex items-center gap-2 border-b border-border bg-[#111111] px-4 py-3">
            <div className="size-3 rounded-full bg-red-500/80" />
            <div className="size-3 rounded-full bg-yellow-500/80" />
            <div className="size-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">terminal — siddharth@bphc: ~</span>
          </div>
          <div className="p-6 font-mono text-base leading-relaxed">
            <p className="text-foreground"><span className="text-green-400">siddharth@bphc</span><span className="text-blue-400">~</span>$ sudo make-portfolio-better</p>
            <p className="mt-2 text-red-400 font-bold">[sudo] Permission denied. You&apos;re not Siddharth.</p>
            <p className="mt-2 text-muted-foreground">This incident will be reported.</p>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
