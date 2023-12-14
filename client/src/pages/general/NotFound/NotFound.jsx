import './notFound.css'
import { Result, Button } from 'antd'

const NotFound = () => {
    return (
        <div className='not-found-container'>
            <Result
                status='404'
                title='404'
                subTitle='Sorry, the page you visited does not exist.'
                extra={
                    <a href='/'>
                        <Button type='primary'>Back Home</Button>
                    </a>
                }
            />
        </div>
    )
}

export default NotFound
