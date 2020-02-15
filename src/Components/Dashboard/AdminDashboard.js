import React, {Component} from 'react';
import CreateWizard from "./CreateWizard";
import DisplayPlans from "./DisplayPlans";
import AuthService from "../../Services/AuthService";

class AdminDashboard extends Component {
    constructor(props) {
        super(props);
        this.AuthService = new AuthService();
        this.state = {
            selected: 0
        }
    }

    componentDidMount = () => {
        if (!this.AuthService.getUser())
            this.props.history.push("/");
        if(this.AuthService.getUser().rollID === "1")
            this.props.history.push("/employeeDashboard");
    };

    logout = () => {
        this.AuthService.LogOut();
        this.props.history.push("/");
    }

    render() {
        return (
            <div className='container full-height pt-5'>
                <div className='row'>
                    <div className={'col-12'}>
                        <button onClick={() => this.setState({selected: 0})} className={'btn btn-lg btn-light mb-3 mr-5'}>Add Plan</button>
                        <button onClick={() => this.setState({selected: 1})} className={'btn btn-lg btn-light mb-3 mr-5'}>Delete Plan</button>
                        <button onClick={() => this.logout()} className={'btn btn-lg btn-light mb-3'}>Log Out</button>
                    </div>
                    {this.state.selected===0 &&
                    <div className='col-12'>
                        <h1>Add new subscription plan</h1>
                        <CreateWizard/>
                    </div>}
                    {this.state.selected===1 &&
                    <div className='col-12'>
                        <h1>Choose plan to delete</h1>
                        <DisplayPlans />
                    </div>}
                </div>
            </div>
        );
    }
}

export default AdminDashboard;
