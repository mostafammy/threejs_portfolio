async function SendEmailRequest(FormData) {
    // 1. Get the hostname
    const hostname = window.location.hostname;
    // Prepare data to send to backend
    const dataToSend = FormData;

    const response = await fetch(`${hostname === 'localhost' ? 'http://localhost:3001/api/server/sendemail' : '/api/server/sendemail'}`, { // <-- IMPORTANT: This needs to be your backend endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
    });

    const result = await response.json();
    console.log('Email Response:', result); // Log for debugging
    alert('Email Sent Successfully');

    if (!response.ok) {
        throw new Error(result.message || 'Submission failed.');
    }
}

export default SendEmailRequest;