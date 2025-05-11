import emailjs from "@emailjs/browser";

async function SendEmail(FormInfo) {
    await emailjs.send('service_m36zyjg', 'template_7cxu3bg', {
        from_name: FormInfo.name,
        from_email: FormInfo.email,
        to_name: 'Adrian',
        to_email: 'adrain@jsmastry.pro',
        message: FormInfo.message,
    }, 'jDKVUVCJDUSwD5ly-');
}

export default SendEmail;