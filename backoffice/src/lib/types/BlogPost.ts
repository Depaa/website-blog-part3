export interface Seo {
	title: string;
	description: string;
	tags: string[];
}
export interface Post {
	id: string;
	slug: string;
	title: string;
	description: string;
	featured: string;
	tags: string[];
	image: string;
	content: string;
	readingTime?: string;
	seo?: Seo;
	state?: "PUBLIC" | "PRIVATE"
}
