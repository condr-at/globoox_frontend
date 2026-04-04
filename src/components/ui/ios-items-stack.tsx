'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface IOSItemsStackProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tone?: 'default' | 'reader';
}

/**
 * Container-only iOS stack primitive.
 * Owns only clipping/radius rules; row behavior stays in child components.
 */
const IOSItemsStack = React.forwardRef<HTMLDivElement, IOSItemsStackProps>(
  ({ children, className, style, tone = 'default' }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'overflow-hidden rounded-xl border',
          tone === 'reader'
            ? 'bg-[var(--reader-panel-bg)] text-[var(--reader-text)] border-[var(--reader-border)]'
            : 'bg-[var(--app-surface-bg)] text-[var(--app-text)] border-[var(--app-border)]',
          className,
        )}
        style={style}
      >
        {children}
      </div>
    );
  }
);

IOSItemsStack.displayName = 'IOSItemsStack';

export default IOSItemsStack;
