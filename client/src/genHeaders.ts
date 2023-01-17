export default function genHeaders(headers: Headers) {
	const headerList = headers.entries();
	const bufor: { [keys: string]: string } = {};
	let header;
	while ((header = headerList.next())) {
		if (header.done) break;
		bufor[header.value[0]] = header.value[1];
	}
	return bufor;
}
