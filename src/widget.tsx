import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

class ReactWidget extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const container = document.createElement("div");
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://affiliate-widget.vercel.app/react-widget-affiliate.css";

    this.shadowRoot?.appendChild(link);
    this.shadowRoot?.appendChild(container);

    // Get query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const agent_id = this.getAttribute("agent_id") || "";
    const schema = this.getAttribute("schema") || "";
    const type = this.getAttribute("type") || "";
    const affiliateCode = urlParams.get("code") || undefined;
    const priceId = urlParams.get("price_id") || undefined;
    const amount = urlParams.get("amount") || undefined;

    this.root = ReactDOM.createRoot(container);
    this.root.render(
      <React.StrictMode>
        <App
          affiliateCode={affiliateCode}
          priceId={priceId}
          amount={amount}
          agent_id={agent_id}
          schema={schema}
          type={type}
        />
      </React.StrictMode>
    );
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

customElements.define("react-widget-affiliate", ReactWidget);