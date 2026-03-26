'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { uiTextActionButton } from '@/components/ui/button-styles';

type PageHeaderAction = {
  label: string;
  onClick: () => void;
  className?: string;
};

type PageHeaderProps = {
  title: string;
  collapseThreshold?: number;
  expandDelta?: number;
  action?: PageHeaderAction;
  children?: ReactNode;
};

export default function PageHeader({
  title,
  collapseThreshold = 60,
  expandDelta = 60,
  action,
  children,
}: PageHeaderProps) {
  const [collapseProgress, setCollapseProgress] = useState(0);
  const collapseProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      rafRef.current = null;
      const y = Math.max(window.scrollY, 0);
      const nextProgress = Math.max(0, Math.min(1, y / collapseThreshold));
      if (Math.abs(collapseProgressRef.current - nextProgress) < 0.001) return;
      collapseProgressRef.current = nextProgress;
      setCollapseProgress(nextProgress);
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [collapseThreshold, expandDelta]);

  const isCollapsed = collapseProgress >= 1;
  const paddingTop = 16 - (8 * collapseProgress);
  const paddingBottom = 16 - (8 * collapseProgress);
  const titleFontSize = 24 - (8 * collapseProgress);
  const titleLineHeight = 32 - (8 * collapseProgress);
  const actionOpacity = 1 - collapseProgress;
  const actionScale = 1 - collapseProgress;
  const isActionHidden = collapseProgress >= 0.98;

  return (
    <header className="mobile-ui-no-select pt-[env(safe-area-inset-top)] fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b">
      <div
        className="container max-w-2xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 transition-[padding] duration-300 ease-in-out"
        style={{ paddingTop, paddingBottom }}
      >
        <h1
          className="font-medium -mt-1"
          style={{
            fontSize: `${titleFontSize}px`,
            lineHeight: `${titleLineHeight}px`,
          }}
        >
          {title}
        </h1>

        <div className="min-w-[44px] h-9 flex items-center justify-end">
          {action ? (
            <button
              onClick={action.onClick}
              className={`${uiTextActionButton} h-9 text-[15px] font-medium transition-[opacity,transform] duration-300 ease-in-out px-2 ${action.className ?? ''}`}
              style={{
                opacity: actionOpacity,
                transform: `scale(${actionScale})`,
                transformOrigin: 'right center',
                pointerEvents: isActionHidden ? 'none' : 'auto',
              }}
              tabIndex={isActionHidden ? -1 : 0}
            >
              {action.label}
            </button>
          ) : (
            <div className="h-9 w-[44px]" aria-hidden="true" />
          )}
        </div>
      </div>

      {!isCollapsed && children && (
        <div className="container max-w-2xl mx-auto px-4 sm:px-6 pb-4 space-y-3">
          {children}
        </div>
      )}
    </header>
  );
}
