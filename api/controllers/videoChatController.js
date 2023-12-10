import qs from 'qs'
import axios from 'axios'

const getZoomToken = async (req, res, next) => {
    try {
        const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } =
            process.env
        const data = qs.stringify({
            grant_type: 'account_credentials',
            account_id: ZOOM_ACCOUNT_ID,
        })

        const request = await axios.post('https://zoom.us/oauth/token', data, {
            headers: {
                Authorization: `Basic ${Buffer.from(
                    `${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`
                ).toString('base64')}`,
            },
        })
        req.body = { ...req.body, ...request.data }
    } catch (error) {
        if (error.response && error.response.data)
            console.error('Error response from Zoom API:', error.response.data)
        else console.error('Error fetching access token:', error.message)
    }
    return next()
}

const createMeeting = async (req, res) => {
    const { topic, type, start_time, duration, timezone, access_token } =
        req.body
    const data = {
        agenda: 'My Meeting',
        default_password: false,
        password: '',
        settings: {
            allow_multiple_devices: true,
            approval_type: 0,
            join_before_host: true,
        },
    }

    const config = {
        method: 'post',
        url: 'https://api.zoom.us/v2/users/me/meetings',
        headers: {
            Authorization: 'Bearer ' + access_token,
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(data),
    }

    try {
        const response = await axios(config)
        return res.json(response.data)
    } catch (error) {
        console.error(
            'Error creating meeting:',
            error.response ? error.response.data : error.message
        )
        return res.status(500).json({ error: 'Failed to create meeting' })
    }
}

export { getZoomToken, createMeeting }
