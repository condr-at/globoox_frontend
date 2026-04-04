'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Star, ExternalLink, BookOpen } from 'lucide-react';
import amazonBooks from '@/data/amazon-books.json';
import IOSIcon from '@/components/ui/ios-icon';
import { Button } from '@/components/ui/button';

interface BookDetailPageProps {
    params: Promise<{ id: string }>;
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
    const { id } = use(params);
    const book = amazonBooks.books.find((b) => b.id === id);

    if (!book) {
        notFound();
    }

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating)
                    ? 'fill-[var(--system-orange)] text-[var(--system-orange)]'
                    : i < rating
                        ? 'fill-[var(--system-orange)]/50 text-[var(--system-orange)]'
                        : 'text-[var(--app-text-muted)]'
                    }`}
            />
        ));
    };

    return (
        <div className="min-h-screen bg-[var(--app-section-bg)] text-[var(--app-text)]">
            {/* Navigation Bar */}
            <header className="nav-bar fixed top-0 left-0 right-0 z-40 safe-area-inset-top">
                <div className="flex items-center h-[44px] px-[16px]">
                    <Link href="/store" className="-ml-[8px] flex min-h-[44px] min-w-[44px] items-center gap-[4px] pl-[8px] text-[var(--app-accent)]">
                        <IOSIcon icon={ChevronLeft} className="text-[var(--app-accent)]" strokeWidth={2} />
                        <span className="text-[17px]">Store</span>
                    </Link>
                </div>
            </header>

            <div className="px-[16px] pt-[calc(env(safe-area-inset-top)+44px)] pb-[32px]">
                {/* Cover */}
                <div className="relative mx-auto max-w-[200px] mb-[24px]">
                    <div className="relative aspect-[2/3] rounded-[12px] overflow-hidden shadow-lg">
                        <Image
                            src={book.cover}
                            alt={book.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Demo badge */}
                    {book.hasDemo && (
                        <div className="absolute -top-[8px] -right-[8px] rounded-full bg-[var(--app-accent)] px-[12px] py-[4px] text-[12px] font-semibold text-[var(--primary-foreground)] shadow-md">
                            Demo Available
                        </div>
                    )}
                </div>

                {/* Info Card */}
                <div className="mb-[16px] rounded-[12px] bg-[var(--app-surface-bg)] p-[16px]">
                    <h1 className="text-[22px] font-bold mb-[4px]">{book.title}</h1>
                    <p className="mb-[16px] text-[17px] text-[var(--app-text-muted)]">by {book.author}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-[8px] mb-[16px]">
                        <div className="flex">{renderStars(book.rating)}</div>
                        <span className="text-[15px] font-semibold">{book.rating}</span>
                        <span className="text-[13px] text-[var(--app-text-subtle)]">
                            ({book.reviews >= 1000 ? `${(book.reviews / 1000).toFixed(1)}K` : book.reviews} reviews)
                        </span>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-[8px]">
                        {book.genre.map((genre) => (
                            <span
                                key={genre}
                                className="rounded-full bg-[var(--fill-tertiary)] px-[12px] py-[4px] text-[13px] font-medium text-[var(--app-text-muted)]"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="mb-[16px] rounded-[12px] bg-[var(--app-surface-bg)] p-[16px]">
                    <h2 className="text-[17px] font-semibold mb-[12px]">About this book</h2>
                    <p className="text-[17px] leading-[1.5] text-[var(--app-text-muted)]">
                        {book.description}
                    </p>
                </div>

                {/* Price & Actions */}
                <div className="rounded-[12px] bg-[var(--app-surface-bg)] p-[16px]">
                    <div className="flex items-baseline gap-[8px] mb-[20px]">
                        <p className="text-[28px] font-bold text-[var(--app-text)]">
                            {book.price}
                        </p>
                        <span className="text-[13px] text-[var(--app-text-subtle)]">USD</span>
                    </div>

                    <div className="flex flex-col gap-[12px]">
                        {book.hasDemo && book.demoBookId && (
                            <Link href={`/reader/${book.demoBookId}`}>
                                <Button className="w-full h-[50px] text-[17px] font-semibold">
                                    <BookOpen className="w-[20px] h-[20px]" />
                                    Read Demo Free
                                </Button>
                            </Link>
                        )}

                        <div>
                            <Button
                                variant="secondary"
                                className="w-full h-[50px] text-[17px] font-semibold"
                                disabled
                                aria-disabled="true"
                            >
                                <ExternalLink className="w-[20px] h-[20px]" />
                                Buy
                            </Button>
                            <p className="mt-[6px] text-center text-[12px] text-[var(--app-text-subtle)]">
                                comnig soon
                            </p>
                        </div>
                    </div>
                </div>

                {/* Info note */}
                {book.hasDemo && (
                    <div className="mt-[16px] rounded-[12px] bg-[color:color-mix(in_srgb,var(--app-accent)_10%,transparent)] p-[16px]">
                        <p className="text-[15px] text-[var(--app-text-muted)]">
                            <span className="font-medium text-[var(--app-accent)]">Tip:</span> Try our instant translation feature. Switch between English, French, Spanish, and German while reading.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
