export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head />
			<body>
				<h1>NEXT.JS</h1>
				{children}
			</body>
		</html>
	);
}
