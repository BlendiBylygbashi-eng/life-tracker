import type { ReactNode } from 'react';

interface ContainerProps {
  title: string;
  children: ReactNode;
}

export function Container({ title, children }: ContainerProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
      <h2 className="text-xl font-semibold mb-6">{title}</h2>
      {children}
    </div>
  );
}
