// src/pages/ApiDocs.tsx
import React from "react";

export default function ApiDocs() {
  const backend = process.env.REACT_APP_API_URL || "http://localhost:3000";
  const docsUrl = `${backend.replace(/\/$/, "")}/docs/v1`;

  // fallback: abrir em nova aba se iframe for bloqueado
  const openInNewTab = () => window.open(docsUrl, "_blank", "noopener");

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Documentação da API (Swagger)</h1>
        <button
          onClick={openInNewTab}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          Abrir em nova aba
        </button>
      </div>

      <div style={{ height: "80vh", borderRadius: 6, overflow: "hidden", border: "1px solid #2d3748" }}>
        <iframe
          src={docsUrl}
          title="API Docs"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>

      <p className="mt-3 text-sm text-gray-300">
        Se a página não carregar, provavelmente o servidor bloqueia `iframe` (X-Frame-Options). Use
        <button onClick={openInNewTab} className="ml-1 underline">Abrir em nova aba</button>.
      </p>
    </div>
  );
}
