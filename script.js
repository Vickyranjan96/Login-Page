const container = document.querySelector('.container');
const registerLink = document.querySelector('.reg');
const loginLink = document.querySelector('.log');
const inputs = document.querySelectorAll('.input-box2 input');
const submitBtn = document.querySelector('.btn2');

const createErrorMessage = (input, message) => {
    const errorSpan = document.createElement('span');
    errorSpan.classList.add('error-message');
    errorSpan.textContent = message;
    input.parentElement.appendChild(errorSpan);
};

const removeErrorMessages = (input) => {
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
};

const validateField = (input, regex, errorMessage) => {
    if (!regex.test(input.value)) {
        removeErrorMessages(input);
        createErrorMessage(input, errorMessage);
        input.style.borderColor = 'red';
        return false;
    }
    removeErrorMessages(input);
    input.style.borderColor = '';
    return true;
};

registerLink.onclick = () => container.classList.add('active');
loginLink.onclick = () => container.classList.remove('active');

inputs.forEach(input => {
    input.addEventListener('input', () => {
        let valid = false;
        switch (input.type) {
            case 'text':
                valid = validateField(input, /^[A-Za-z]{2,}$/, 'Enter Your Name');
                break;
            case 'email':
                valid = validateField(input, /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,6}$/, 'Please enter a valid email');
                break;
            case 'password':
                valid = validateField(input, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Minimum 8 with upper, lower, number, special.');
                break;
            case 'tel':
                valid = validateField(input, /^[0-9]{10}$/, 'Enter Valid number') && !/^12345/.test(input.value);
                break;
        }
    });
});

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const allValid = [...inputs].every(input => input.style.borderColor === '');
    if (allValid) alert('Form submitted successfully!');
    else alert('Please correct the highlighted errors before submitting.');
});
