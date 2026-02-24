import { createRoot } from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root");
if (rootElement) {
  if (!(window as any)._root) {
    (window as any)._root = createRoot(rootElement);
  }
  (window as any)._root.render(<App />);
}
