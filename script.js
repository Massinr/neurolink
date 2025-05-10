// Initialize EmailJS with your public key
(function() {
    emailjs.init("7XF-Pj49U3GIjP0za");
})();

// Toggle fixing bugs overlay with Ctrl+Shift+D
let isOverlayVisible = true;
const fixingBugsOverlay = document.querySelector('.fixing-bugs-overlay');

document.addEventListener('keydown', function(e) {
    // Check for Ctrl+Shift+D
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault(); // Prevent default browser behavior
        isOverlayVisible = !isOverlayVisible;
        fixingBugsOverlay.classList.toggle('visible', isOverlayVisible);
        
        // Toggle form interaction
        document.querySelectorAll('input, textarea, button').forEach(element => {
            element.disabled = isOverlayVisible;
        });
        
        // Log to console for developers
        console.log(`Fixing Bugs overlay ${isOverlayVisible ? 'enabled' : 'disabled'}`);
    }
});

// Show fixing bugs overlay on page load
document.addEventListener('DOMContentLoaded', function() {
    fixingBugsOverlay.classList.add('visible');
    
    // Prevent form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Disable all inputs
    document.querySelectorAll('input, textarea, button').forEach(element => {
        element.disabled = true;
    });
});

// Credits modal handling
const creditsButton = document.getElementById('creditsButton');
const creditsModal = document.getElementById('creditsModal');
const closeCredits = document.getElementById('closeCredits');

creditsButton.addEventListener('click', () => {
    creditsModal.classList.remove('hidden');
    setTimeout(() => {
        creditsModal.classList.add('visible');
    }, 50);
});

closeCredits.addEventListener('click', () => {
    creditsModal.classList.remove('visible');
    setTimeout(() => {
        creditsModal.classList.add('hidden');
    }, 300);
});

creditsModal.addEventListener('click', (e) => {
    if (e.target === creditsModal) {
        creditsModal.classList.remove('visible');
        setTimeout(() => {
            creditsModal.classList.add('hidden');
        }, 300);
    }
});

// Features menu handling
const featuresMenu = document.getElementById('featuresMenu');
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('mouseenter', () => {
    featuresMenu.classList.remove('hidden');
    setTimeout(() => {
        featuresMenu.classList.add('visible');
    }, 50);
});

contactForm.addEventListener('mouseleave', (e) => {
    if (!featuresMenu.matches(':hover')) {
        featuresMenu.classList.remove('visible');
        setTimeout(() => {
            featuresMenu.classList.add('hidden');
        }, 300);
    }
});

featuresMenu.addEventListener('mouseleave', () => {
    featuresMenu.classList.remove('visible');
    setTimeout(() => {
        featuresMenu.classList.add('hidden');
    }, 300);
});

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

// Add clear button functionality for message and email inputs
document.querySelectorAll('.clear-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.parentElement.querySelector('input, textarea');
        if (input) {
            input.value = '';
        }
    });
});

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const buttonText = document.getElementById('buttonText');
    const sendingAnimation = document.getElementById('sendingAnimation');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const fixingBugsOverlay = document.querySelector('.fixing-bugs-overlay');
    
    buttonText.style.opacity = '0';
    sendingAnimation.classList.remove('hidden');
    fixingBugsOverlay.classList.add('visible');
    
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const timestamp = new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    const phoneNumbers = Array.from(phoneInputs)
        .map(input => input.value)
        .filter(value => value.trim() !== '');
    
    const formattedMessage = `======📬 New Anonymous Message======\n` +
        `📧 Email: ${email}\n` +
        (phoneNumbers.length > 0 ? `📱 Phone Numbers:\n${phoneNumbers.map(num => `   • ${num}`).join('\n')}\n` : '') +
        `📝 Message:\n\n${message}\n\n` +
        `🕒 Submitted on: ${timestamp}`;
    
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
            fixingBugsOverlay.classList.remove('visible');
            
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
            fixingBugsOverlay.classList.remove('visible');
            
            setTimeout(() => {
                errorMessage.classList.add('hidden');
            }, 2000);
            
            console.error('Error sending email:', error);
        });
});

document.addEventListener('DOMContentLoaded', function() {
    // Hide features guide on mobile devices
    if (window.innerWidth <= 768) { // Standard mobile breakpoint
        featuresMenu.style.display = 'none';
    }

    // Add window resize listener to handle orientation changes
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            featuresMenu.style.display = 'none';
        } else {
            featuresMenu.style.display = 'block';
        }
    });
});

// Track cursor position for background effect
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.body.style.setProperty('--cursor-x', `${x}%`);
    document.body.style.setProperty('--cursor-y', `${y}%`);
});

// Reset position when mouse leaves window
document.addEventListener('mouseleave', () => {
    document.body.style.setProperty('--cursor-x', '50%');
    document.body.style.setProperty('--cursor-y', '50%');
});

// Developer Console
const DEV_PASSWORD = 'Gcnxf.iV5MQ!7Pp';
const devConsole = document.querySelector('.dev-console');
const devConsoleInput = document.querySelector('.dev-console-input');
const devConsoleOutput = document.querySelector('.dev-console-output');
const devConsoleClose = document.querySelector('.dev-console-close');

let isConsoleActive = false;

// Show console with Ctrl+Shift+D
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        devConsole.classList.add('visible');
        devConsoleInput.focus();
    }
});

// Handle password input
devConsoleInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (this.value === DEV_PASSWORD) {
            isConsoleActive = true;
            logToConsole('Console activated. Welcome, developer!');
            this.value = '';
            this.type = 'text';
            this.placeholder = 'Enter command...';
        } else {
            logToConsole('Invalid password');
            this.value = '';
        }
    }
});

// Handle console commands
devConsoleInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && isConsoleActive) {
        const command = this.value.trim();
        if (command) {
            logToConsole(`> ${command}`);
            handleCommand(command);
            this.value = '';
        }
    }
});

// Close console
devConsoleClose.addEventListener('click', function() {
    devConsole.classList.remove('visible');
    isConsoleActive = false;
    devConsoleInput.type = 'password';
    devConsoleInput.placeholder = 'Enter password...';
    devConsoleInput.value = '';
});

// Log to console
function logToConsole(message) {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = document.createElement('div');
    logEntry.textContent = `[${timestamp}] ${message}`;
    devConsoleOutput.appendChild(logEntry);
    devConsoleOutput.scrollTop = devConsoleOutput.scrollHeight;
}

// Handle console commands
function handleCommand(command) {
    switch (command.toLowerCase()) {
        case 'help':
            logToConsole('Available commands:');
            logToConsole('- help: Show this help message');
            logToConsole('- toggle: Toggle the fixing bugs overlay');
            logToConsole('- clear: Clear console output');
            break;
        case 'toggle':
            isOverlayVisible = !isOverlayVisible;
            fixingBugsOverlay.classList.toggle('visible', isOverlayVisible);
            document.querySelectorAll('input, textarea, button').forEach(element => {
                element.disabled = isOverlayVisible;
            });
            logToConsole(`Fixing Bugs overlay ${isOverlayVisible ? 'enabled' : 'disabled'}`);
            break;
        case 'clear':
            devConsoleOutput.innerHTML = '';
            logToConsole('Console cleared');
            break;
        default:
            logToConsole(`Unknown command: ${command}`);
    }
} 