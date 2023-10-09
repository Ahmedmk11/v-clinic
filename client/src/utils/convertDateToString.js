export function formatDateRange(startDate, endDate) {
    const dateOptions = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
    }

    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
    }

    const startDateObj = new Date(startDate)
    const formattedStartDate = startDateObj.toLocaleString('en-US', dateOptions)
    const formattedStartTime = startDateObj.toLocaleString('en-US', timeOptions)

    const endDateObj = new Date(endDate)
    const formattedEndDate = endDateObj.toLocaleString('en-US', dateOptions)
    const formattedEndTime = endDateObj.toLocaleString('en-US', timeOptions)

    if (startDateObj.getDay() === endDateObj.getDay()) {
        return `${formattedStartDate} from ${formattedStartTime} to ${formattedEndTime}`
    }

    return `From ${formattedStartDate} to ${formattedEndDate}`
}
