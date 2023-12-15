import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts'
import { Card, Skeleton } from 'antd'

const AppointmentsGraph = ({ appointmentsLastWeek, loading }) => {
    return (
        <Card title='Appointments Last Week' className='apps-graph'>
            {loading ? (
                <Skeleton active size="large" />
            ) : (
                <LineChart width={600} height={300} data={appointmentsLastWeek}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='day' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type='monotone'
                        dataKey='appointments'
                        stroke='#8884d8'
                    />
                </LineChart>
            )}
        </Card>
    )
}
export default AppointmentsGraph
