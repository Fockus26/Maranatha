"use client";

import Image from "next/image";
import { type ReactElement, useEffect, useRef, useState } from "react";
import type { PastoresData, PastorItem } from "@/data/home.data";

interface Props {
    data: PastoresData;
}

export function PastoresSlider({ data }: Props): ReactElement {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.2, rootMargin: "0px 0px -80px 0px" },
        );

        const left = containerRef.current?.querySelector(".slide-left");
        const right = containerRef.current?.querySelector(".slide-right");
        if (left) observer.observe(left);
        if (right) observer.observe(right);

        return () => observer.disconnect();
    }, []);

    const nextPastor = (): void => {
        setCurrentIndex((prev) => (prev === data.items.length - 1 ? 0 : prev + 1));
    };

    const prevPastor = (): void => {
        setCurrentIndex((prev) => (prev === 0 ? data.items.length - 1 : prev - 1));
    };

    const current = (data.items[currentIndex] ?? data.items[0]) as PastorItem;

    return (
        <section ref={containerRef} className="pt-16 pb-32 w-full">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    {current && (
                        <div className="lg:col-span-5 relative slide-left flex items-end">
                            {/* Cuadro fondo — más atrás y desplazado */}
                            <div className="absolute bottom-0 left-4 w-[85%] h-[85%] bg-accent/15 rounded-2xl -z-20 pointer-events-none" />

                            {/* Cuadro medio — desplazado un poco */}
                            <div className="absolute bottom-4 left-8 w-[85%] h-[85%] bg-accent/25 rounded-2xl -z-10 pointer-events-none" />

                            {/* Imagen grande suelta */}
                            <Image
                                src={current.image}
                                alt={current.name}
                                className="relative w-[1000px] h-auto object-contain object-bottom z-10"
                                style={{
                                    filter: "drop-shadow(0 20px 40px rgba(14, 122, 184, 0.25))",
                                }}
                            />
                        </div>
                    )}

                    {current && (
                        <div className="lg:col-span-7 space-y-6 flex flex-col justify-center slide-right">
                            <span className="text-secondary font-bold tracking-[0.2em] text-xs md:text-sm uppercase block">
                                {data.sectionLabel}
                            </span>

                            <h2 className="text-primary-container text-4xl md:text-5xl font-bold tracking-tight leading-none">
                                {data.sectionTitle}
                            </h2>

                            <h3 className="text-complementary text-xl md:text-2xl font-bold">
                                {current.name} —{" "}
                                <span className="text-sm font-medium text-on-surface-variant/80">
                                    {current.role}
                                </span>
                            </h3>

                            <p className="text-on-surface-variant text-base md:text-lg font-normal leading-relaxed min-h-[140px]">
                                {current.description}
                            </p>

                            {data.items.length > 1 && (
                                <div className="flex items-center gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={prevPastor}
                                        aria-label="Pastor anterior"
                                        className="flex items-center justify-center w-12 h-12 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 transform active:scale-90"
                                    >
                                        <span className="material-symbols-outlined text-2xl">
                                            chevron_left
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={nextPastor}
                                        aria-label="Siguiente pastor"
                                        className="flex items-center justify-center w-12 h-12 rounded-full border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all duration-300 transform active:scale-90"
                                    >
                                        <span className="material-symbols-outlined text-2xl">
                                            chevron_right
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
