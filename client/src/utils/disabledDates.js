import moment from 'moment'

export const disabledDate = (current) => {
    const today = moment().format('YYYY-MM-DD')
    const currentDate = current.format('YYYY-MM-DD')

    return currentDate < today
}
