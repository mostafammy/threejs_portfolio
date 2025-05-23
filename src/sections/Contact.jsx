import {useEffect, useRef, useState} from "react";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import SendEmail from "../utils/SendEmail.js";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod/src/index.js";
import contactFormSchema from "../utils/ValidatiionSchema.js";


const Contact = () => {
    const formRef = useRef();
    const [loading, setLoading] = useState(false);
    const {executeRecaptcha} = useGoogleReCaptcha();
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [CanSubmit, setCanSubmit] = useState(true);
    const [timeLeft, setTimeLeft] = useState(15);
    const [isRunning, setIsRunning] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(contactFormSchema),
        mode: 'onTouched'
    })

    useEffect(() => {
        // Only start the timer if isRunning is true and time is greater than 0
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            setCanSubmit(true);
        }

        // Clean up the interval when component unmounts or dependencies change
        return () => {
            clearInterval(timer);
        };
    }, [isRunning, timeLeft]);

    const startTimer = () => {
        setIsRunning(true);
    };

    // const pauseTimer = () => {
    //     setIsRunning(false);
    // };
    //
    // const resetTimer = () => {
    //     setIsRunning(false);
    //     setTimeLeft(15);
    // };


    const handleChange = ({target: {name, value}}) => {
        setForm({...form, [name]: value});
    };
    // service_m36zyjg
    const OnSubmit = async (form) => {
        // e.preventDefault();

        if (!executeRecaptcha) {
            alert("reCAPTCHA not loaded yet");
            return;
        }
        setLoading(true);
        setCanSubmit(false);
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
            SendEmail(form);

            // Reset the form
            setLoading(false);

            alert('Message Sent Successfully');
            // Reset the form
            setForm({
                name: '',
                email: '',
                message: '',
            });
            // Start the timer
            startTimer();

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
                    <form ref={formRef} onSubmit={handleSubmit(OnSubmit)}
                          className={`flex flex-col space-y-7 ${errors.name || errors.email || errors.message ? 'mt-6' : 'mt-12'}`}
                          noValidate>
                        <label className={errors.name ? 'space-y-1' : 'space-y-3'}>
                            <span className={'field-label'}>Full Name</span>
                            <input type={'text'} name={'name'} required
                                   className={'field-input'} placeholder={'John Doe'} {...register('name')}/>
                            {errors.name && <p className={'text-red-500'}>{errors.name.message}</p>}
                        </label>
                        <label className={errors.name ? 'space-y-1' : 'space-y-3'}>
                            <span className={'field-label'}>Email</span>
                            <input type={'email'} name={'email'} required
                                   className={'field-input'} placeholder={'johndoe@gmail.com'} {...register('email')} />
                            {errors.email && <p className={'text-red-500'}>{errors.email.message}</p>}
                        </label>
                        <label className={errors.name ? 'space-y-1' : 'space-y-3'}>
                            <span className={'field-label'}>Your Message</span>
                            <textarea name={'message'} required rows={5}
                                      className={'field-input'}
                                      placeholder={"Hi, I'm interested in ..."} {...register('message')} />
                            {errors.message && <p className={'text-red-500'}>{errors.message.message}</p>}
                        </label>
                        <button type={'submit'} className={'field-btn'} disabled={loading || !CanSubmit}>
                            {loading ? 'Sending...' : 'Send Message'}
                            {!CanSubmit && (
                                <span className={'text-red-500 ml-2'}>
                                    {isRunning ? `Please wait ${timeLeft} seconds` : 'Please wait 15 seconds'}
                                </span>
                            )}
                            {CanSubmit && (
                                <img src={'assets/arrow-up.png'} alt={'arrow up'} className={'field-btn_arrow'}/>)}
                        </button>
                    </form>
                </div>
            </div>

        </section>
    )
}
export default Contact
