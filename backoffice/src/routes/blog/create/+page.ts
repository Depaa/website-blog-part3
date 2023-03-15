/*
 * https://kit.svelte.dev/docs/page-options#prerender
 * it may be possible to pre-render, need to do more testing
 * Accessing url.searchParams during prerendering is forbidden.
 * If you need to use it, ensure you are only doing so in the browser (for example in onMount).
 */
// export const prerender = 'auto';

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
// export const csr = false;