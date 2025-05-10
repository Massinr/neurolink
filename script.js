// Initialize EmailJS with your public key
(function() {
    emailjs.init("7XF-Pj49U3GIjP0za");
})();

document.getElementById('addPhone').addEventListener('click', function() {
    const phoneContainer = document.getElementById('phoneContainer');
    const newPhoneDiv = document.createElement('div');
    newPhoneDiv.className = 'flex items-center space-x-2';
    newPhoneDiv.innerHTML = `
        <input
            type="tel"
            class="w-full px-4 py-2 border-2 border-black rounded-none focus:outline-none focus:border-black"
            placeholder="Enter phone number..."
        />
        <button
            type="button"
            class="px-4 py-2 border-2 border-black hover:bg-black hover:text-white transition-all duration-200 remove-phone"
        >
            -
        </button>
    `;
    phoneContainer.insertBefore(newPhoneDiv, this);

    newPhoneDiv.querySelector('.remove-phone').addEventListener('click', function() {
        newPhoneDiv.remove();
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const buttonText = document.getElementById('buttonText');
    const sendingAnimation = document.getElementById('sendingAnimation');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    buttonText.style.opacity = '0';
    sendingAnimation.classList.remove('hidden');
    
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const timestamp = new Date().toLocaleString();
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    const phoneNumbers = Array.from(phoneInputs)
        .map(input => input.value)
        .filter(value => value.trim() !== '');
    
    const formattedMessage = `=== New Contact Form Submission ===\n\n` +
        `📧 Contact Information:\n` +
        `Email: ${email}\n` +
        (phoneNumbers.length > 0 ? `📱 Phone Numbers:\n${phoneNumbers.map(num => `   • ${num}`).join('\n')}\n` : '') +
        `\n📝 Message:\n${message}\n\n` +
        `⏰ Submitted: ${timestamp}\n` +
        `=====================`;
    
    const templateParams = {
        to_email: 'massinetalbi2007@gmail.com',
        message: formattedMessage
    };
    
    emailjs.send('service_52nyrgd', 'template_4vh2d0x', templateParams)
        .then(function() {
            successMessage.classList.remove('hidden');
            errorMessage.classList.add('hidden');
            document.getElementById('message').value = '';
            document.getElementById('email').value = '';
            const phoneInputs = document.querySelectorAll('input[type="tel"]');
            phoneInputs.forEach(input => input.value = '');
            const additionalPhones = document.querySelectorAll('#phoneContainer > div');
            additionalPhones.forEach(div => div.remove());
            
            buttonText.style.opacity = '1';
            sendingAnimation.classList.add('hidden');
            buttonText.textContent = 'Send';
            
            setTimeout(() => {
                successMessage.classList.add('hidden');
            }, 2000);
        })
        .catch(function(error) {
            errorMessage.classList.remove('hidden');
            successMessage.classList.add('hidden');
            
            buttonText.style.opacity = '1';
            sendingAnimation.classList.add('hidden');
            buttonText.textContent = 'Send';
            
            setTimeout(() => {
                errorMessage.classList.add('hidden');
            }, 2000);
            
            console.error('Error sending email:', error);
        });
}); 