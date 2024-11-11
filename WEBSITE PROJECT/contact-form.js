document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const thankYouMessage = document.getElementById('thank-you-message');
    const anotherMessageBtn = document.querySelector('.another-message-btn');
    
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent the default form submission
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                const formData = {
                    name: form.querySelector('[name="name"]').value.trim(),
                    email: form.querySelector('[name="email"]').value.trim(),
                    message: form.querySelector('[name="message"]').value.trim()
                };

                const response = await fetch('http://localhost:3000/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                
                if (result.status === 'success') {
                    form.reset();
                    if (thankYouMessage) {
                        form.classList.add('fade-out');
                        thankYouMessage.classList.add('fade-in');
                    }
                } else {
                    throw new Error(result.message || 'Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to send message: ' + error.message);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        });
    }

    if (anotherMessageBtn) {
        anotherMessageBtn.addEventListener('click', () => {
            form.classList.remove('fade-out');
            thankYouMessage.classList.remove('fade-in');
            form.reset(); // Clear the form fields
        });
    }
}); 