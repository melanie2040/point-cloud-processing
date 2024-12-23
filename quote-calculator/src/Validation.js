export const verifyTabZero = (tabData) => {
    const tabErrors = {};

    if (!tabData.firstName) {
        tabErrors.firstName = "Please enter first name"
    }
    if (!tabData.lastName) {
        tabErrors.lastName = "Please enter last name"
    }
    const emailPattern = /^.+@.+\.[a-zA-Z]{2,63}$/;
    if (!tabData.email || !emailPattern.test(tabData.email) || tabData.email.includes('@gmail.com') || tabData.email.includes('@yahoo.com') || tabData.email.includes('@outlook.com') || tabData.email.includes('@hotmail.com')) {
        tabErrors.email = "Please enter valid corporate email"
    }
    if (!tabData.country) {
        tabErrors.country = "Please enter country"
    }
    if (!tabData.contact) {
        tabErrors.contact = "Please enter contact"
    }
    if (!tabData.industry) {
        tabErrors.industry = "Please enter industry"
    }
    if (!tabData.companyName) {
        tabErrors.companyName = "Please enter company name"
    }
    return tabErrors;

}

export const verifyTabOne = (tabData) => {
    const tabErrors = {};
    if (!tabData.qn1) {
        tabErrors.qn1 = "Please fill in this question"
    }
    if (!tabData.qn2) {
        tabErrors.qn2 = "Please fill in this question"
    }
    if (!tabData.qn3) {
        tabErrors.qn3 = "Please fill in this question"
    }
    return tabErrors;
}

export const verifyTabTwo = (tabData) => {
    const tabErrors = {};
    if (!tabData.qn4) {
        tabErrors.qn4 = "Please fill in this field"
    }
    if (!tabData.countryTwo) {
        tabErrors.countryTwo = "Please fill in this field"
    }
    if (!tabData.state) {
        tabErrors.state = "Please fill in this field"
    }
    if (!tabData.city) {
        tabErrors.city = "Please fill in this field"
    }
    if (!tabData.postalCode) {
        tabErrors.postalCode = "Please fill in this field"
    }
    if (!tabData.street) {
        tabErrors.street = "Please fill in this field"
    }
    if (!tabData.unit) {
        tabErrors.unit = "Please fill in this field"
    }
    if (!tabData.qn6) {
        tabErrors.qn6 = "Please fill in this field"
    }
    if (!tabData.qn7) {
        tabErrors.qn7 = "Please fill in this field"
    }
    if (!tabData.qn8) {
        tabErrors.qn8 = "Please fill in this field"
    }
    return tabErrors;
}

export const verifyTabThree = (tabData) => {
    const tabErrors = {};
    if (!tabData.width || tabData.width <= 0) {
        tabErrors.width = "Please enter a valid value"
    }
    if (!tabData.length || tabData.length <= 0) {
        tabErrors.length = "Please enter a valid value"
    }
    if (!tabData.height || tabData.height <= 0) {
        tabErrors.height = "Please enter a valid value"
    }
    return tabErrors;
}


export const verifyTabFour = (tabData) => {
    const tabErrors = {};
    if (!tabData.photos || tabData.photos.length === 0) {
        tabErrors.photos = "Please upload photos of your site"
    }
    if (!tabData.calendar) {
        tabErrors.calendar = "Please fill in this field"
    }
    return tabErrors;
}
