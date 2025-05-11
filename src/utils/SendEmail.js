import emailjs from "@emailjs/browser";

async function SendEmail(FormInfo) {
    const ServiceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TemplateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    await emailjs.send(ServiceID, TemplateID, {
        from_name: FormInfo.name,
        from_email: FormInfo.email,
        to_name: 'Mostafa',
        to_email: 'mostafa.fexh.business@gmail.com',
        message: FormInfo.message,
    }, PublicKey);
}

export default SendEmail;