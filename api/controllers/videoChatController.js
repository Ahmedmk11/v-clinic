import axios from 'axios'

const generateRoomLink = async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.whereby.dev/v1/meetings',
            {
                startDate: new Date().toISOString(),
                endDate: new Date(Date.now() + 86400000).toISOString(),
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.WHEREBY_API_KEY}`,
                },
            }
        )

        const roomLink = response.data.roomUrl

        res.status(200).json({ roomLink })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export { generateRoomLink }
