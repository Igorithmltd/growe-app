export const handleNavigationClick =
  (
    href: string,
    pathname: string,
    setActiveSection: (section: string) => void,
    onToggle?: () => void
  ) =>
  (e: React.MouseEvent) => {
    e.preventDefault();

    // Handle home link
    if (href === "/" || href === "/#home" || href === "#home") {
      setActiveSection("#home");
      if (pathname !== "/") {
        window.location.href = "/";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        history.replaceState(null, "", "#home");
      }
      onToggle?.();
      return;
    }

    // Handle section links
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
      } else {
        window.location.href = `/#${sectionId}`;
      }

      onToggle?.();
    }
  };
