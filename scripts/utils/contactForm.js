function openModal(modal) {
    // const modal = document.getElementById("contact-modal");
	// modal.style.display = "block";
    document.body.style.overflow = 'hidden';
    modal.showModal();
}

function closeModal(modal) {
    // const modal = document.getElementById("contact-modal");
    // modal.style.display = "none";
    document.body.style.overflow = '';
    modal.close();
}

// types of errors and associated messages for each form control
const FORM_ERRORS = {
    firstName: {
        empty: "Votre prénom est requis.",
        too_short: "Veuillez entrer 2 caractères ou plus pour le prénom.",
        invalid: "Veuillez entrer un prénom valide."
    },
    lastName: {
        empty: "Votre nom est requis.",
        too_short: "Veuillez entrer 2 caractères ou plus pour le nom.",
        invalid: "Veuillez entrer un nom valide."
    },
    email: {
        empty: "Une adresse mail est requise.",
        invalid: "Veuillez entrer une adresse email valide."
    },
    message: {
        empty: "Votre message est requis."
    }
};

function initForm() {
    const contactForm = document.forms.namedItem("contact-photographer");

    contactForm.addEventListener("submit", validateForm);

    // validate form controls when input is changed
    ["firstName", "lastName"].forEach(formControlName => {
        contactForm.elements.namedItem(formControlName).addEventListener("change", (event) => {
            event.preventDefault();
            resetFormControlError(event.target);
            if (!validateName(event.target)) {
                setElementFormDataErrorMessage(event.target);
                displayFormControlErrorMessage(event.target);
            }
        });
    });

    contactForm.elements.namedItem("email").addEventListener("change", (event) => {
        event.preventDefault();
        resetFormControlError(event.target);
        if (!validateMail(event.target)) {
            setElementFormDataErrorMessage(event.target);
            displayFormControlErrorMessage(event.target);
        }
    });

    contactForm.elements.namedItem("message").addEventListener("change", (event) => {
        event.preventDefault();
        resetFormControlError(event.target);
        if (!validateMessage(event.target)) {
            setElementFormDataErrorMessage(event.target);
            displayFormControlErrorMessage(event.target);
        }
    });

}

/**
 * Reset a form control error if previously set, and hide the error element. This is mandatory to be able to validate
 * the form control again with the Constraint Validation API.
 */
function resetFormControlError(formControl) {
    if (formControl.validity.customError) {
        // needed for validity.valid to be true
        formControl.setCustomValidity("");
        // hide previously displayed error message without removing it
        formControl.parentElement.removeAttribute("data-error-visible");
    }
}

/**
 * Set a form control error message depending on its name and the error type.
 * errorName is the name of the error in the FORM_ERRORS object. It can be "empty", "too_short" or "invalid".
 */
function setFormControlErrorMessage(formControl, errorName) {
    formControl.setCustomValidity(FORM_ERRORS[formControl.name][errorName]);
}

/**
 * Copy a form control error message to its form data error element for displaying.
 */
function setElementFormDataErrorMessage(formControl) {
    formControl.parentElement.setAttribute("data-error", formControl.validationMessage);
    formControl.parentElement.setAttribute("data-error-visible", "false");
}

/**
 * Display previously set and hidden errors messages in the form.
 */
function displayFormErrorsMessages(form) {
    form.querySelectorAll(":scope > .form-section[data-error-visible=false]").forEach((formDataError) => {
        formDataError.setAttribute("data-error-visible", "true");
    });
}

/**
 * Display previously set and hidden error message for a form control.
 */
function displayFormControlErrorMessage(formControl) {
    formControl.parentElement.setAttribute("data-error-visible", "true");
}

/**
 * Check if required form controls are not empty.
 */
function validateRequiredFormControl(formControl) {
    // check if the element has a required attribute and is empty
    if (formControl.validity.valueMissing) {
        setFormControlErrorMessage(formControl, "empty")
        return false;
    }
    return true;
}

/**
 * Validate name form control, being first or last.
 */
function validateName(formControl) {
    let isEmpty = !validateRequiredFormControl(formControl);
    if (isEmpty) {
        return false;
    } else if (formControl.validity.tooShort) {
        setFormControlErrorMessage(formControl, "too_short")
        return false;
    } else if (formControl.validity.patternMismatch) {
        setFormControlErrorMessage(formControl, "invalid")
        return false;
    }
    return true;
}

/**
 * Validate email form control.
 */
function validateMail(formControl) {
    let isEmpty = !validateRequiredFormControl(formControl);
    if (isEmpty) {
        return false;
    } else if (formControl.validity.typeMismatch || formControl.validity.patternMismatch) {
        formControl.setCustomValidity(`${FORM_ERRORS[formControl.name].invalid}`);
        return false;
    }
    return true;
}

/**
 * Validate message form control.
 */
function validateMessage(formControl) {
    let isEmpty = !validateRequiredFormControl(formControl);
    return !isEmpty;
}

function displayConfirmationMessage(formControlsCollection) {
    console.log("Formulaire validé.");
    for (const formControl of formControlsCollection) {
        if (formControl.type !== "submit") {
            console.log(`${formControl.name} : ${formControl.value}`);
        }
    }
}

/**
 * Validate the form and display the confirmation message if the form is valid.
 */
function validateForm(event) {
    event.preventDefault();

    let isFormValid = true;
    const form = event.target;
    const formControlsCollection = form.elements;

    // validate form controls implementing Constraint Validation API (all but radio buttons)
    for (const formControl of formControlsCollection) {
        // reset previous error message if any
        resetFormControlError(formControl);

        if (!formControl.validity.valid) {
            isFormValid = false;

            switch (formControl.name) {
                case "firstName":
                case "lastName":
                    validateName(formControl);
                    break;
                case "email":
                    validateMail(formControl);
                    break;
                case "message":
                    validateMessage(formControl);
                    break;
            }
            setElementFormDataErrorMessage(formControl);
        }
    }

    if (!isFormValid) {
        // display error messages. Separate loop for animation
        displayFormErrorsMessages(form);
        return false;
    }
    displayConfirmationMessage(formControlsCollection);
    form.reset();
    return true;
}