const MetaTag = (): JSX.Element => {
    return (
        <>
            <meta name="apple-mobile-web-app-title" content="Kodeweich"/>
            <meta name="description" content="Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!"/>
            <meta name="application-name" content="Kodeweich"/>
            <meta name="msapplication-TileColor" content="#ffc40d"/>
            <meta name="theme-color" content="#ffffff"/>

            {/* # only for dev environment */}
            {process.env.NEXT_PUBLIC_STAGE === 'dev' && <meta name="robots" content="none" />}
        </>
    );
}

export default MetaTag;