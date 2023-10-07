const calcAge = (birthdate) => {
    birthdate = new Date(birthdate)
    const currentDate = new Date()
    const age = currentDate.getFullYear() - birthdate.getFullYear()

    // Check if the current date has passed the birthday this year
    const hasBirthdayPassed =
        currentDate.getMonth() > birthdate.getMonth() ||
        (currentDate.getMonth() === birthdate.getMonth() &&
            currentDate.getDate() >= birthdate.getDate())

    // If the birthday hasn't occurred this year, subtract 1 from the age
    return hasBirthdayPassed ? age : age - 1
}

export default calcAge // Export the function