"use client";

import { useEffect } from "react";

export default function SwaggerDocs() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js";
    script.onload = () => {
      (window as any).SwaggerUIBundle({
        url: "/api/docs/swagger.json",
        dom_id: "#swagger-ui",
      });
    };
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/swagger-ui-dist/swagger-ui.css"
      />
      <div id="swagger-ui" />
    </>
  );
}
