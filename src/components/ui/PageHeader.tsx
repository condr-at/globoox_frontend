'use client';

import type { ReactNode } from 'react';

type PageHeaderAction = {
  label: string;
  onClick: () => void;
};

type PageHeaderProps = {
  title: string;
  collapsed: boolean;
  action?: PageHeaderAction;
  children?: ReactNode;
};

export default function PageHeader({ title, collapsed, action, children }: PageHeaderProps) {
  const isCollapsed = collapsed;

  const paddingTop = isCollapsed ? 8 : 16;
  const paddingBottom = isCollapsed ? 8 : 16;

  return (
    <header className="pt-[env(safe-area-inset-top)] fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b">
      <div
        className="container max-w-2xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 transition-[padding] duration-300 ease-in-out"
        style={{ paddingTop, paddingBottom }}
      >
        <h1
          className={[
            'font-medium transition-[font-size,line-height] duration-300 ease-in-out',
            '-mt-1',
            isCollapsed ? 'text-base' : 'text-2xl',
          ].join(' ')}
        >
          {title}
        </h1>

        {action && (
          <button
            onClick={action.onClick}
            className="text-[15px] font-medium text-[var(--system-blue)] active:opacity-50 transition-[opacity,transform] duration-300 ease-in-out px-2 py-2"
            style={{
              opacity: isCollapsed ? 0 : 1,
              transform: isCollapsed ? 'scale(0)' : 'scale(1)',
              pointerEvents: isCollapsed ? 'none' : 'auto',
            }}
            tabIndex={isCollapsed ? -1 : 0}
          >
            {action.label}
          </button>
        )}
      </div>

      {!isCollapsed && children && (
        <div className="container max-w-2xl mx-auto px-4 sm:px-6 pb-4 space-y-3">
          {children}
        </div>
      )}
    </header>
  );
}
