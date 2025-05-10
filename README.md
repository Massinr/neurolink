# Professional Contact Form

A modern, responsive contact form with a sleek black and white design. Built with HTML, Tailwind CSS, and JavaScript, featuring EmailJS integration for seamless email functionality.

## Features

- Clean, modern UI with black and white theme
- Responsive design that works on all devices
- Dynamic phone number fields
- Animated placeholders and loading states
- EmailJS integration for reliable email delivery
- Form validation and error handling
- Success/error message animations

## Setup

1. Clone the repository:
```bash
git clone [your-repo-url]
```

2. Sign up for EmailJS (https://www.emailjs.com/) and get your:
   - Public Key
   - Service ID
   - Template ID

3. Update the EmailJS configuration in `script.js`:
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
// Update these values in the emailjs.send() call
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

4. Open `index.html` in your browser or deploy to your preferred hosting service.

## Files Structure

- `index.html` - Main HTML file
- `styles.css` - Custom styles and animations
- `script.js` - JavaScript functionality
- `.gitignore` - Git ignore rules

## Dependencies

- Tailwind CSS (via CDN)
- EmailJS (via CDN)

## License

MIT License - feel free to use this in your projects! 