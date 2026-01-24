import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import reportWebVitals from "./reportWebVitals";
import * as Sentry from "@sentry/react";

if (process.env.NODE_ENV === "production" && process.env.REACT_APP_SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,

        integrations: [
            // This integration enables performance monitoring.
            // It allows you to see, for example, how long API calls take.
            Sentry.browserTracingIntegration(),

            // This integration records user sessions where an error occurs.
            // It's like having a "video" of what the user did before the bug.
            Sentry.replayIntegration(),
        ],

        // Configure the sampling rate for performance monitoring.
        // 1.0 means capturing 100% of transactions for analysis.
        tracesSampleRate: 1.0,

        // Configure the sampling rate for session replays.
        replaysSessionSampleRate: 0.1, // Record 10% of sessions.
        replaysOnErrorSampleRate: 1.0, // But record 100% of sessions where an error occurs.

        // Setting this option to true will send default PII data to Sentry.
        // For example, automatic IP address collection on events
        sendDefaultPii: true,
    });
}

/**
 * Web vitals reporting is included and can be customized for performance tracking.
 */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    //     <App />
    // </React.StrictMode>
    <App />,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
