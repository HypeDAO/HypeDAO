import { useState, useEffect } from 'react';

function getWindowDimensions() {
	if (typeof window === "undefined") {
		return {
			height: 0,
			width: 0
		}
	} else {
		const { innerWidth: width, innerHeight: height } = window;
		return {
			width,
			height
		};
	}
}

//can only be used in _app and then passed down
export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
}