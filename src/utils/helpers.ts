import { deleteCookie } from "cookies-next";

export const handleNavigationClick =
  (
    href: string,
    pathname: string,
    setActiveSection: (section: string) => void,
    onClose?: () => void
  ) =>
  (e: React.MouseEvent) => {
    e.preventDefault();

    if (href === "/" || href === "/#home" || href === "#home") {
      setActiveSection("#home");

      if (pathname !== "/") {
        window.location.href = "/";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.replaceState(null, "", "#home");
      }

      setTimeout(() => onClose?.(), 1500); // 👈 delay closing menu
      return;
    }

    const sectionId = href.startsWith("/#")
      ? href.slice(2)
      : href.startsWith("#")
        ? href.slice(1)
        : null;

    if (sectionId) {
      setActiveSection(`#${sectionId}`);

      if (pathname === "/") {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerHeight = document.querySelector("header")?.clientHeight || 0;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;

          window.scrollTo({
            top: elementPosition - headerHeight,
            behavior: "smooth",
          });
        }

        history.replaceState(null, "", `#${sectionId}`);
        setTimeout(() => onClose?.(), 300); // 👈 delay closing menu
      } else {
        window.location.href = `/#${sectionId}`;
        setTimeout(() => onClose?.(), 300); // for good measure
      }
    }
  };

  export const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;


  export const signOutUser = async (redirectLogin = true) => {
    "use client";
  
    // Delete the cookies
    deleteCookie("x-token");
    deleteCookie("refresh-token");
    if (redirectLogin) {
      window.location.href = "/login";
    }
  };
