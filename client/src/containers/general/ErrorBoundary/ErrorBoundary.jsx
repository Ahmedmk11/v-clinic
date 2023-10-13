import { Component } from "react";
import './errorBoundary.css';
import maintenance from '../../../assets/imgs/maintenance.png';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super();
        this.state = {
            error: false
        }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error: true })
    }

    render() {
        return this.state.error ? (
            <div className="error-container">
                <img src={maintenance} alt="maintenance" />
                <h1 className="error">Website Undergoing Maintenance</h1>
                <h3>We're currently undergoing maintenance. We'll be back online as soon as possible. <br></br> Thank you for your patience.</h3>
            </div>) :
            this.props.children;
    }
}