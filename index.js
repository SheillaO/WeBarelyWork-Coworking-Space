// ========== WAITLIST FORM HANDLER ==========
const form = document.querySelector('.waitlist-form');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = form.querySelector('.email-input').value;
        const city = form.querySelector('.city-input').value;
        
        // In production, this would POST to a backend
        console.log('Waitlist signup:', { email, city });
        
        // Save to localStorage for demo
        const waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
        waitlist.push({ email, city, timestamp: Date.now() });
        localStorage.setItem('waitlist', JSON.stringify(waitlist));
        
        // Success feedback
        alert(`🎉 Welcome to the waitlist! We'll notify you when ${city || 'your city'} launches.`);
        form.reset();
    });
}

// ========== CHAT WIDGET ==========
function openChat() {
    alert('💬 Chat feature coming soon! For now, email us at hello@webarelywork.com');
}

// ========== ANALYTICS TRACKING (Demo) ==========
function trackEvent(eventName, data) {
    console.log(`📊 Event: ${eventName}`, data);
    
    // In production: Google Analytics, Mixpanel, etc.
    // gtag('event', eventName, data);
}

// Track page views
trackEvent('page_view', { page: window.location.pathname });

// Track CTA clicks
const ctaButtons = document.querySelectorAll('.btn-primary');
ctaButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const location = this.closest('.item')?.querySelector('h3')?.textContent || 'Unknown';
        trackEvent('cta_click', { location });
    });
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate items on scroll
document.querySelectorAll('.item, .problem-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});