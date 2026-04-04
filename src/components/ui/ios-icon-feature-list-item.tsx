'use client';

import type { LucideProps } from 'lucide-react';
import IOSIcon from '@/components/ui/ios-icon';
import { cn } from '@/lib/utils';

interface IOSIconFeatureListItemProps {
  icon: React.ComponentType<LucideProps>;
  children: React.ReactNode;
  className?: string;
}

export default function IOSIconFeatureListItem({
  icon: Icon,
  children,
  className,
}: IOSIconFeatureListItemProps) {
  return (
    <li className={cn('flex items-center gap-3 text-sm text-[var(--app-text)]', className)}>
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-[var(--app-section-bg)]">
        <IOSIcon icon={Icon} className="size-3.5 text-[var(--app-text-muted)]" strokeWidth={1.75} />
      </div>
      {children}
    </li>
  );
}
