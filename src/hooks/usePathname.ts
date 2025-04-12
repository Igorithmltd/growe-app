export const useGetPathname = () => {
	const handlePathname = (pathname: string) => {
		if (pathname === "/") {
			return "/login";
		}

		return `/login?redirect=${pathname.split("/")[1]}`;
	};

	const handleLoginPathname = (lastPathname: string | null) => {
		const origin = window.location.origin;
		if (lastPathname) {
			return `/${lastPathname}`;
		}

		return `${origin}`;
	};

	return { handlePathname, handleLoginPathname };
};
