// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
// export const prerender = false;

// if you want to Generate a SPA
// you have to set ssr to false.
// This is not the case (so set as true or comment the line)
// Documentation: https://kit.svelte.dev/docs/page-options#ssr
export const ssr = false;

// How to manage the trailing slashes in the URLs
// the URL for about page witll be /about with 'ignore' (default)
// the URL for about page witll be /about/ with 'always'
// https://kit.svelte.dev/docs/page-options#trailingslash
// https://kit.svelte.dev/docs/adapters#supported-environments-static-sites
export const trailingSlash = 'always';
