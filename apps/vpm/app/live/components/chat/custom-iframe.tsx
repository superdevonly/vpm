import React, {
  useState,
  useEffect,
  ReactNode,
  IframeHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";

interface CustomIframeProps extends IframeHTMLAttributes<HTMLIFrameElement> {
  children: ReactNode;
  stylesheetUrl: string; // URL of the external CSS file
  inlineStyles?: string; // Inline styles as a string
}

const CustomIframe: React.FC<CustomIframeProps> = ({
  children,
  stylesheetUrl,
  inlineStyles = "",
  ...props
}) => {
  const [contentRef, setContentRef] = useState<HTMLIFrameElement | null>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (contentRef?.contentWindow?.document?.body) {
      const doc = contentRef.contentWindow.document;
      setMountNode(doc.body);

      // Inject external stylesheet into the iframe
      const linkElement = doc.createElement("link");
      linkElement.rel = "stylesheet";
      linkElement.href = stylesheetUrl;
      doc.head.appendChild(linkElement);

      // Inject inline styles into the iframe
      if (inlineStyles) {
        const styleElement = doc.createElement("style");
        styleElement.textContent = inlineStyles;
        doc.head.appendChild(styleElement);
      }
    }
  }, [contentRef, stylesheetUrl, inlineStyles]);

  return (
    <iframe
      {...props}
      ref={setContentRef}
      style={{
        padding: "3px",
        borderRadius: "10px",
        backgroundColor: "#1a1a1a",
      }}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

export default CustomIframe;
