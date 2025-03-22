// Matrix Rain
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.matrix-bg').appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FF00';
    ctx.font = `${fontSize}px 'JetBrains Mono'`;
    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(draw, 50);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// EmailJS
emailjs.init("YOUR_PUBLIC_KEY");
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value
    })
    .then(() => {
        const msg = document.getElementById('form-message');
        msg.textContent = 'Thank you for your submission. We’ve received your email, and someone will reach out soon.';
        msg.style.display = 'block';
        msg.style.color = '#26A69A';
        this.reset();
    }, (error) => {
        console.error('EmailJS error:', error);
        const msg = document.getElementById('form-message');
        msg.textContent = 'Oops! Something went wrong. Please try again.';
        msg.style.display = 'block';
        msg.style.color = '#FF7043';
    });
});

// Smooth scroll + animations
document.querySelectorAll('.sidebar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const cards = entry.target.querySelectorAll('.card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150); // Slower stagger
            });
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.full-screen').forEach(section => observer.observe(section));