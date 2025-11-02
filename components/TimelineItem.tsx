'use client';

import { useInView } from 'react-intersection-observer';

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  index: number;
  isLast: boolean;
}

export default function TimelineItem({ date, title, description, index, isLast }: TimelineItemProps) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`flex items-start space-x-6 group transition-all duration-700 ${
        inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="flex-shrink-0 w-24 text-right">
        <span className="text-accent font-bold">{date}</span>
      </div>
      <div className="relative flex-shrink-0">
        <div
          className={`w-4 h-4 rounded-full bg-accent ring-4 ring-accent/20 transition-all duration-500 ${
            inView ? 'scale-100' : 'scale-0'
          }`}
        ></div>
        {!isLast && (
          <div className="absolute top-4 left-2 w-0.5 h-16 bg-gradient-to-b from-accent/50 to-neutral-gray/20"></div>
        )}
      </div>
      <div className="flex-1 pb-8">
        <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-neutral-gray">{description}</p>
      </div>
    </div>
  );
}
