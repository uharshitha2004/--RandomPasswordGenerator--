function generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols) {
    const lowercaseChars = "abcdefghiklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=";

    let allowedChars = "";
    let password = "";

    if (includeLowercase) allowedChars += lowercaseChars;
    if (includeUppercase) allowedChars += uppercaseChars;
    if (includeNumbers) allowedChars += numberChars;
    if (includeSymbols) allowedChars += symbolChars;

    if (length <= 0) {
        return "(Password length must be at least 1)";
    }
    if (allowedChars.length === 0) {
        return "(At least one character set must be selected)";
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }
    return password;
}

function generateAndDisplayPassword() {
    const length = document.getElementById("length").value;
    const includeLowercase = document.getElementById("lowercase").checked;
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeSymbols = document.getElementById("symbols").checked;

    const password = generatePassword(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
    document.getElementById("password").value = password;
    validatePassword(password);
}

function validatePassword(password) {
    const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    const strengthMsg = strongPattern.test(password) ? "Strong Password" : "Weak Password";
    document.getElementById("strength").textContent = strengthMsg;
    document.getElementById("strength").className = strongPattern.test(password) ? "valid" : "invalid";
}

function validateUserPassword() {
    const userPassword = document.getElementById("userPassword").value;
    validatePassword(userPassword, "userStrength");
}
function copyToClipboard() {
    const passwordField = document.getElementById("password");
    passwordField.select();
    document.execCommand("copy");
    alert("Password copied!");
}
