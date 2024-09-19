await fetch('https://localhost:5000/send-email', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: FormData.email,
        pdf: pdfBuffer,
    }),
});