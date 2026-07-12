// For: about page (pages/about-us.html) - team & contact

// team expand/collapse
document.addEventListener('click', function(e){
  const btn = e.target.closest('.view-more');
  if(!btn) return;
  // allow anchors
  if (btn.tagName === 'A' && btn.getAttribute('href')) return;
  // require button
  if (btn.tagName !== 'BUTTON') return;
  const card = btn.closest('.team-card');
  const content = card.querySelector('.team-content');
  card.classList.toggle('expanded');
  if(card.classList.contains('expanded')){
    if(content) content.style.display = 'block';
    btn.textContent = 'View less';
  } else {
    if(content) content.style.display = 'none';
    btn.textContent = 'View more';
  }
});

// contact form validation
function validateForm() {
  // Get form input values and trim whitespace
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();
  
  // Clear any previous error messages from all error spans
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  
  let isValid = true;
  
  // validate name
  if (!name) {
    document.getElementById('name-error').textContent = 'Name is required';
    isValid = false;
  }
  
  // validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    document.getElementById('email-error').textContent = 'Please enter a valid email';
    isValid = false;
  }
  
  // validate phone
  if (!phone || phone.length < 7) {
    document.getElementById('phone-error').textContent = 'Please enter a valid phone number';
    isValid = false;
  }
  
  // validate message
  if (!message || message.length < 10) {
    document.getElementById('message-error').textContent = 'Message must be at least 10 characters';
    isValid = false;
  }
  
  // On successful validation: show confirmation message and reset form
  if (isValid) {
    alert('Thank you for your message! We will get back to you soon.');
    document.getElementById('contactForm').reset();
  }
  
  return isValid;
}
