'use client';

import { useState } from 'react';
import Image from 'next/image';
import { List } from 'lucide-react';
import IOSBottomDrawer from '@/components/ui/ios-bottom-drawer';
import IOSBottomDrawerHeader from '@/components/ui/ios-bottom-drawer-header';
import { uiIconTriggerButton, uiMenuItemButton } from '@/components/ui/button-styles';
import { useReaderTheme } from '@/lib/hooks/useReaderTheme';
import { getReaderUiColors } from '@/lib/readerTheme';

interface Chapter {
    number: number;
    title: string;
    depth?: number;
}

interface TableOfContentsProps {
    bookTitle: string;
    bookAuthor?: string | null;
    isContentPending?: boolean;
    coverUrl?: string | null;
    chapters: Chapter[];
    currentChapter: number;
    onSelectChapter: (chapter: number) => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export default function TableOfContents({
    bookTitle,
    bookAuthor,
    isContentPending = false,
    coverUrl,
    chapters,
    currentChapter,
    onSelectChapter,
    open: externalOpen,
    onOpenChange: setExternalOpen,
}: TableOfContentsProps) {
    const [internalOpen, setInternalOpen] = useState(false);
    const readerTheme = useReaderTheme();
    const uiColors = getReaderUiColors(readerTheme);

    const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
    const setIsOpen = setExternalOpen !== undefined ? setExternalOpen : setInternalOpen;

    const handleSelect = (chapterNum: number) => {
        onSelectChapter(chapterNum);
        setIsOpen(false);
    };

    return (
        <>
            {externalOpen === undefined && (
                <button
                    onClick={() => setIsOpen(true)}
                    className={uiIconTriggerButton}
                >
                    <List className="w-[20px] h-[20px]" />
                </button>
            )}

            <IOSBottomDrawer
                open={isOpen}
                onOpenChange={setIsOpen}
                side="bottom"
                enableDragDismiss
                dragHandle={<div className="h-1 w-12 rounded-full" style={{ backgroundColor: uiColors.border }} />}
                dragRegion={(
                    <IOSBottomDrawerHeader
                        title={<span className={isContentPending ? 'blur-[3px] opacity-40' : ''}>{bookTitle}</span>}
                        subtitle={(
                            <div className={`space-y-1 ${isContentPending ? 'blur-[3px] opacity-40' : ''}`}>
                                {bookAuthor && <div>{bookAuthor}</div>}
                                <div>Chapter {currentChapter} of {chapters.length}</div>
                            </div>
                        )}
                        leading={(
                            <div className="relative h-[94px] w-[64px] overflow-hidden rounded-[6px] shadow-[0_3px_10px_rgba(0,0,0,0.18)]" style={{ backgroundColor: uiColors.border }}>
                                {coverUrl ? (
                                    <Image
                                        src={coverUrl}
                                        alt={bookTitle}
                                        fill
                                        sizes="64px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-[8px] font-medium uppercase tracking-[0.14em]" style={{ background: `linear-gradient(180deg, ${uiColors.border}, ${uiColors.mutedText})`, color: uiColors.background }}>
                                        EPUB
                                    </div>
                                )}
                            </div>
                        )}
                        onClose={() => setIsOpen(false)}
                    />
                )}
                className="mt-[max(56px,calc(env(safe-area-inset-top)+18px))] flex h-[calc(100dvh-max(56px,calc(env(safe-area-inset-top)+18px)))] max-h-none flex-col overflow-hidden rounded-t-[20px] shadow-[0_-12px_40px_rgba(0,0,0,0.16)] sm:mt-0 sm:max-h-[calc(100dvh-2rem)] sm:max-w-[640px] sm:overflow-hidden sm:rounded-[24px]"
                style={{ backgroundColor: uiColors.surface, color: uiColors.text }}
            >
                <div className="relative flex-1 overflow-hidden sm:min-h-0">
                    <div className={`h-full overflow-y-auto ${isContentPending ? 'blur-[3px] opacity-40' : ''}`}>
                        {chapters.map((chapter) => {
                            const depth = chapter.depth || 1;
                            const indentPx = (depth - 1) * 22;
                            const isActive = currentChapter === chapter.number;

                            return (
                                <button
                                    key={chapter.number}
                                    onClick={() => handleSelect(chapter.number)}
                                    disabled={isContentPending}
                                    className={`${uiMenuItemButton} relative min-h-[72px] gap-4 border-t px-5`}
                                    style={{ borderColor: uiColors.border, paddingLeft: `${20 + indentPx}px`, paddingRight: '20px' }}
                                >
                                    <span className="min-w-0 flex-1">
                                        <span
                                            className={`
                                                block
                                                ${depth === 1 ? 'text-[18px]' : 'text-[16px]'}
                                                ${isActive ? 'font-semibold' : ''}
                                            `}
                                            style={{ color: isActive || depth === 1 ? uiColors.text : uiColors.mutedText }}
                                        >
                                            {chapter.title}
                                        </span>
                                    </span>
                                    <span className="shrink-0 text-[15px]" style={{ color: uiColors.mutedText }}>
                                        {depth === 1 ? chapter.number : ''}
                                    </span>
                                </button>
                            );
                        })}
                        <div
                            aria-hidden="true"
                            className="min-h-[72px] border-t"
                            style={{ borderColor: uiColors.border }}
                        />
                    </div>
                    {isContentPending && (
                        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                            <span className="text-sm font-medium animate-pulse-text" style={{ color: uiColors.background }}>
                                Translating...
                            </span>
                        </div>
                    )}
                </div>
            </IOSBottomDrawer>
        </>
    );
}
