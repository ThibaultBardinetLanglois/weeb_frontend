import "./SentryTestCrash.style.scss";

const SentryTestCrash = () => {
    const handleCrash = () => {
        const user = undefined;
        console.log(user.name);
    };

    return (
        <button className="sentry-test-button" onClick={handleCrash}>
            Crash Test
        </button>
    );
};

export default SentryTestCrash;
