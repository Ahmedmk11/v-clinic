import PackageModel from '../models/packageModel.js'
import PatientModel from '../models/patientModel.js'

const updateAllPatientsPackageRenewal = async () => {
    try {
        const currentDate = new Date()
        const today = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate()
        ) // Extracting current date without time

        // Find all patients
        const patients = await PatientModel.find().populate('package')

        for (const patient of patients) {
            if (patient?.package == null) continue

            // Check if the package renewal date has passed or is today and the package status is active
            if (
                new Date(patient.packageRenewalDate).setHours(0, 0, 0, 0) <=
                    today &&
                patient.packageStatus === 'Active'
            ) {
                const allPackages = await PackageModel.find()
                const packagePrice = patient.package.price // Get the price of the package
                if (patient.wallet >= packagePrice) {
                    // Sufficient funds in wallet, so renew the package for 1 year
                    const newRenewalDate = new Date(
                        currentDate.getFullYear() + 1,
                        currentDate.getMonth(),
                        currentDate.getDate()
                    ) // Increment renewal date by 1 year

                    // Update renewal date and deduct package price from wallet
                    patient.packageRenewalDate = newRenewalDate
                    patient.wallet -= packagePrice

                    // Save the changes to the database
                    await patient.save()
                } else {
                    // Insufficient funds, remove package and block auto-renewal
                    patient.package = null
                    patient.packageStatus = 'Inactive'
                    patient.isAutoRenewalBlocked = true
                    // Save changes to the database
                    await patient.save()
                }
            } else if (
                new Date(patient.packageRenewalDate).setHours(0, 0, 0, 0) <=
                    today &&
                patient.packageStatus === 'Inactive'
            ) {
                patient.package = null
                await patient.save()
            }
        }
        console.log('Package renewal updated for all patients.')
    } catch (error) {
        console.error('Error updating package renewal for patients:', error)
    }
}

// Call the function to update package renewal for all patients at intervals
const updateInterval = 86400000 // Interval in milliseconds (e.g., every hour)
setInterval(updateAllPatientsPackageRenewal, updateInterval)
