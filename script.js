document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    document.getElementById('responseMessage').innerText = `Thank you, ${name}! Your message has been sent.`;

    
    document.getElementById('contactForm').reset();
});