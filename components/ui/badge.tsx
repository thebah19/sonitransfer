import * as React from 'react';
import { cn } from '@/lib/utils';

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 px-3 py-1.5 text-xs font-semibold text-navy shadow-sm',
        className
      )}
      {...props}
    />
  );
}
