import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Experience from "./sections/Experience.jsx";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";
import {useEffect, useState} from "react";
import IsMobile from "./utils/IsMobile.jsx";

const App = () => {
    console.log(import.meta.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY);
    const [isMobile, setIsMobile] = useState(IsMobile(window.innerWidth));
    useEffect(() => {
        console.log(isMobile);
        console.log(IsMobile(window.innerWidth));
        console.log(window.innerWidth);
    }, [isMobile]);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(IsMobile(window.innerWidth));
        };
        window.addEventListener('resize', handleResize);
    }, []);
    return (
        <main className={"max-w-7xl mx-auto"}>
            <GoogleReCaptchaProvider
                reCaptchaKey={import.meta.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY}
                scriptProps={{
                    async: true,
                    defer: true,
                    appendTo: "head",
                    nonce: undefined,
                }}
            >
                <Navbar/>
                <Hero/>
                <About/>
                <Projects isMobile={isMobile}/>
                {/*<Clients/>*/}
                <Experience isMobile={isMobile}/>
                <Contact/>
                <Footer/>
            </GoogleReCaptchaProvider>
        </main>
    )
}
export default App
