import type { Metadata } from 'next';
import {
	createSharedPreviewMetadata,
	sharedPreviewDescription,
	sharedPreviewTitle,
} from '@/lib/shareMetadata';
import './landing/landing.css';

export const metadata: Metadata = {
	title: sharedPreviewTitle,
	description: sharedPreviewDescription,
	alternates: {
		canonical: '/',
	},
	...createSharedPreviewMetadata('/'),
};

export { default } from './landing/page';
