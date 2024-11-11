document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const learnMoreBtn = document.querySelector('.learn-more-btn');
    const inputs = document.querySelectorAll('.form-input');
    const contactForm = document.querySelector('.contact-form');
    
    // Toggle menu function
    const toggleMenu = () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    };
    
    // Close menu function
    const closeMenu = () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    };
    
    // Menu toggle click handler
    menuToggle.addEventListener('click', toggleMenu);
    
    // Add click handlers to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) { // Only on mobile
                closeMenu();
            }
            
            // Your existing click handler code here
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const aboutSection = document.querySelector('#about');
            
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    inputs.forEach(input => {
        // Handle input focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Handle input blur
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Handle input validation
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
    
    // Form submission handler
    function initializeContactForm() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const submitButton = contactForm.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                
                try {
                    // Get form data
                    const formData = {
                        name: contactForm.querySelector('[name="name"]').value.trim(),
                        email: contactForm.querySelector('[name="email"]').value.trim(),
                        message: contactForm.querySelector('[name="message"]').value.trim()
                    };

                    console.log('Sending data:', formData);

                    // Send request
                    const response = await fetch('http://localhost:3000/send-message', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    // Parse response
                    const result = await response.json();
                    console.log('Server response:', result);

                    if (result.status === 'success') {
                        alert('Message sent successfully!');
                        contactForm.reset();
                    } else {
                        throw new Error(result.message);
                    }

                } catch (error) {
                    console.error('Error:', error);
                    alert('Error sending message: ' + error.message);
                } finally {
                    submitButton.disabled = false;
                }
            });
        }
    }
    
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', initializeContactForm);
    
    // Add character counter functionality
    const messageTextarea = document.querySelector('textarea[name="message"]');
    const charCounter = document.querySelector('.char-counter');
    
    if (messageTextarea && charCounter) {
        messageTextarea.addEventListener('input', function() {
            const remaining = this.value.length;
            charCounter.textContent = `${remaining}/500`;
            
            // Add visual feedback as limit approaches
            if (remaining >= 450) {
                charCounter.classList.add('limit-near');
            } else {
                charCounter.classList.remove('limit-near');
            }
            
            if (remaining >= 500) {
                charCounter.classList.add('limit-reached');
            } else {
                charCounter.classList.remove('limit-reached');
            }
        });
    }
    
    // Function to fetch and display form submissions
    async function loadFormSubmissions() {
        try {
            const response = await fetch('get_messages.php');
            const data = await response.json();
            
            const formaContainer = document.querySelector('.FORMA');
            if (!formaContainer) return;
            
            // Clear existing content
            formaContainer.innerHTML = '';
            
            // Create table
            const table = document.createElement('table');
            table.className = 'submissions-table';
            
            // Add table header
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;
            
            // Add submissions to table
            const tbody = table.querySelector('tbody');
            data.forEach(submission => {
                const date = new Date(submission.timestamp.$date);
                const formattedDate = date.toLocaleDateString('hr-HR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${formattedDate}</td>
                    <td>${submission.name}</td>
                    <td>${submission.email}</td>
                    <td>${submission.message}</td>
                `;
                tbody.appendChild(row);
            });
            
            formaContainer.appendChild(table);
            
        } catch (error) {
            console.error('Error loading submissions:', error);
        }
    }
    
    // Call the function when page loads
    document.addEventListener('DOMContentLoaded', loadFormSubmissions);
});