const uploadFile = async (
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>,
	url: string,
	file: ArrayBuffer,
	contentType: string
) => {
	console.time(`uploading-file`);
	const res = await fetch(url, {
		method: 'PUT',
		body: file.toString(),
		headers: {
			'Content-Type': contentType,
		},
	});
	console.info('File uploaded');
	console.timeEnd(`uploading-file`);
	console.debug(res);
};

export { uploadFile };

