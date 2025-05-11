import {useRef, useState} from "react";
import emailjs from '@emailjs/browser';
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";

const Contact = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const {executeRecaptcha} = useGoogleReCaptcha();
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });
    const handleChange = ({target: {name, value}}) => {
        setForm({...form, [name]: value});
    };
    // service_m36zyjg
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!executeRecaptcha) {
            alert("reCAPTCHA not loaded yet");
            return;
        }
        setLoading(true);
        const token = await executeRecaptcha('contact_form');
        try {
            // 1. Get the hostname
            const hostname = window.location.hostname;
            // Prepare data to send to backend
            const dataToSend = {recaptchaToken: token}; // Include the token

            // *** SEND DATA TO YOUR BACKEND ENDPOINT ***
            // http://localhost:3001/api/server => Locally
            // /api/server => Deployed
            const response = await fetch(`${hostname === 'localhost' ? 'http://localhost:3001/api/server' : '/api/server'}`, { // <-- IMPORTANT: This needs to be your backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();

            if (!response.ok) {
                // Handle backend errors (including reCAPTCHA verification failure)
                throw new Error(result.message || 'Submission failed.');
            }

            // Success!
            // alert('Message sent successfully!');


            // Sending The Email Using EmailJs
            await emailjs.send('service_m36zyjg', 'template_7cxu3bg', {
                from_name: form.name,
                from_email: form.email,
                to_name: 'Adrian',
                to_email: 'adrain@jsmastry.pro',
                message: form.message,
            }, 'jDKVUVCJDUSwD5ly-');
            setLoading(false);
            alert('Message Sent Successfully');
            setForm({
                name: '',
                email: '',
                message: '',
            });
        } catch (error) {
            setLoading(false);
            console.error(error);
            alert('An error occurred, Please try again later');
        }


    };
    return (
        <section className={'c-space my-20'} id={'contact'}>
            <div className={'relative min-h-screen flex flex-col justify-center items-center'}>
                <img src={'/assets/terminal.png'} alt={'terminal Background'}
                     className={'absolute min-h-screen inset-0 hidden lg:block'}/>
                <div className={'contact-container'}>
                    <h3 className={'head-text '}>Let&#39;s Talk</h3>
                    <p className={'text-white-600 text-lg'}>Whether you&#39;re looking to build a new website, Improve
                        Your Exiting Platform, Or bring a new unique project to life, I&#39;m here to help. </p>
                    <form ref={formRef} onSubmit={handleSubmit} className={'flex flex-col space-y-7 mt-12'}>
                        <label className={'space-y-3'}>
                            <span className={'field-label'}>Full Name</span>
                            <input type={'text'} name={'name'} value={form.name} onChange={handleChange} required
                                   className={'field-input'} placeholder={'John Doe'}/>
                        </label>
                        <label className={'space-y-3'}>
                            <span className={'field-label'}>Email</span>
                            <input type={'email'} name={'email'} value={form.email} onChange={handleChange} required
                                   className={'field-input'} placeholder={'johndoe@gmail.com'}/>
                        </label>
                        <label className={'space-y-3'}>
                            <span className={'field-label'}>Your Message</span>
                            <textarea name={'message'} value={form.message} onChange={handleChange} required rows={5}
                                      className={'field-input'} placeholder={"Hi, I'm interested in ..."}/>
                        </label>
                        <button type={'submit'} className={'field-btn'} disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}
                            <img src={'assets/arrow-up.png'} alt={'arrow up'} className={'field-btn_arrow'}/>
                        </button>
                    </form>
                </div>
            </div>

        </section>
    )
}
export default Contact
