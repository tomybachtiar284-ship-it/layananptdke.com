import React, { useEffect, useState, useRef } from 'react';
import { Users, Building2, Trophy, Clock } from 'lucide-react';

interface StatItem {
    icon: React.ElementType;
    value: number;
    suffix: string;
    label: string;
    color: string;
}

const stats: StatItem[] = [
    { icon: Clock, value: 10, suffix: "+", label: "Tahun Pengalaman", color: "text-blue-600" },
    { icon: Building2, value: 50, suffix: "+", label: "Proyek Selesai", color: "text-red-600" },
    { icon: Users, value: 100, suffix: "%", label: "Klien Puas", color: "text-green-600" },
    { icon: Trophy, value: 15, suffix: "+", label: "Penghargaan", color: "text-yellow-600" },
];

export const Stats: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <section ref={sectionRef} className="py-12 bg-white relative z-20 -mt-10 mx-4 md:mx-0">
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <Counter
                                key={index}
                                {...stat}
                                isVisible={isVisible}
                                delay={index * 100}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Counter: React.FC<StatItem & { isVisible: boolean; delay: number }> = ({
    icon: Icon,
    value,
    suffix,
    label,
    color,
    isVisible,
    delay
}) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000; // 2 seconds
        const steps = 60;
        const stepTime = duration / steps;
        const increment = value / steps;
        let current = 0;

        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCount(value);
                    clearInterval(interval);
                } else {
                    setCount(Math.floor(current));
                }
            }, stepTime);
            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timer);
    }, [isVisible, value, delay]);

    return (
        <div className="flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
            <div className={`w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-4 ${color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-1">
                {count}{suffix}
            </div>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                {label}
            </p>
        </div>
    );
};
