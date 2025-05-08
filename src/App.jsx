import Navbar from "./sections/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Clients from "./sections/Clients.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import Experience from "./sections/Experience.jsx";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

const App = () => {
    console.log(import.meta.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY);
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
                <Projects/>
                <Clients/>
                <Experience/>
                <Contact/>
                <Footer/>
            </GoogleReCaptchaProvider>
        </main>
    )
}
export default App
