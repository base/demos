'use client'

import { useMiniApp } from '@/app/providers/MiniAppProvider';
import { ReactNode } from 'react';

interface SafeAreaProps {
  children: ReactNode;
  className?: string;
}

export function SafeArea({ children, className }: SafeAreaProps) {
  const { context, isReady } = useMiniApp();

  // Only apply insets when running inside a mini app
  if (!isReady || !context) {
    return <div className={className}>{children}</div>;
  }

  const insets = context.client?.safeAreaInsets;

  return (
    <div
      className={className}
      style={{
        paddingTop: insets?.top ?? 0,
        paddingBottom: insets?.bottom ?? 0,
        paddingLeft: insets?.left ?? 0,
        paddingRight: insets?.right ?? 0,
      }}
    >
      {children}
    </div>
  );
}
