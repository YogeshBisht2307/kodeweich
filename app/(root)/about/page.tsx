import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kodeweich: About",
    description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
    generator: "Kodeweich",
    applicationName: "Kodeweich",
    referrer: "origin-when-cross-origin",
    keywords: ["Kodweich", "Next.js", "Cloud", "Programming", "Coding"],
    authors: [{ name: "Yogesh Bisht", url: "https://yogesh.kodeweich.com" }],
    creator: "Yogesh Bisht",
    publisher: "Yogesh Bisht",
    formatDetection: {
        email: false,
        address: false,
        telephone: false
    },
    metadataBase: new URL("https://kodeweich.com"),
    openGraph: {
        title: "Kodeweich: About",
        description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
        url: "https://kodeweich.com",
        siteName: "Kodeweich",
        images: "/assets/images/hero.png",
        locale: "en_IN",
        type: "website"
    },
    twitter: {
        title: "Kodeweich: About",
        description: "Unlock the power of coding with our user-friendly platform. Learn the latest languages and technologies at your own pace. Join our community of learners today!",
        images: "/assets/images/hero.png"
    }
};

export default async function Page() {
    return (
        <main className={`max-w-4xl mx-auto pt-8 pb-4 px-4`}>
            <h1 className={`text-4xl sm:text-3xl font-extrabold md:text-4xl xl:text-5xl mb-4`}>
                About
            </h1>
            <p className={`font-med text-muted-foreground md:text-md lg:text-md`}>
                The blog is created and maintained by Yogesh Bisht, a Full Stack developer with experience in building robust and scalable applications using Python and Javascript. Managing cloud server and serverless applications on AWS and Google Cloud using No-code and manual tools.
            </p>
            <p className='py-2 my-1 mb-6 lg:mb-8 font-med md:text-md lg:text-md text-muted-foreground'>At our blog, we strive to provide an engaging and informative experience for all of our readers. We welcome feedback and suggestions and are always open to hearing from our community. If you have an idea for an article or would like to contribute your own content, please don&apos;t hesitate to get in touch with us.</p>
            <div className={`max-w-4xl`}>
                <div>
                    <h3 className={`text-xl sm:text-2xl font-bold mb-4`}>Mission and Goals</h3>
                    <ul className={`list-disc list-inside lg:mb-8 mb-6`}>
                        <li className={`font-med text-muted-foreground md:text-md lg:text-md my-1`}>To provide valuable and up-to-date resources for programmers of all levels.</li>
                        <li className={`font-med text-muted-foreground md:text-md lg:text-md my-1`}>To help programmers stay current with the latest technologies and trends in the industry.</li>
                    </ul>
                </div>
                <div>
                    <h3 className={`text-xl sm:text-2xl font-bold mb-4`}>Content Overview</h3>
                    <ul className={`list-disc list-inside`}>
                        <li className={`font-med md:text-md lg:text-md text-muted-foreground my-1`}>Tutorials on various programming languages, cloud technologies, devops and frameworks.</li>
                        <li className={`font-med md:text-md lg:text-md text-muted-foreground my-1`}>Tips and tricks for improving coding skills and efficiency.</li>
                        <li className={`font-med md:text-md lg:text-md text-muted-foreground my-1`}>In-depth articles on coding-related topics such as best practices, design patterns, cloud architecture, and software architecture.</li>
                    </ul>
                </div>
            </div>
        </main>
    )
}

