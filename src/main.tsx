
  import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./app/App.tsx";
import "./styles/index.css";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
const root = createRoot(document.getElementById("root")!);

root.render(
  <GoogleOAuthProvider clientId={googleClientId}>
    <App />
  </GoogleOAuthProvider>,
);
  