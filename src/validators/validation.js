const mongoose= require('mongoose');

const isValid = function (valid) {
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(valid);
};

const isValidPhone = function (phone) {
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    return phoneRegex.test(phone);
};

const isValidEmail = function (email) {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
    return emailRegex.test(email);
};

const isValidDate = function (date) {
    const dateRegex = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;
    return dateRegex.test(date)
};



module.exports= {isValid,isValidPhone,isValidEmail,isValidDate}