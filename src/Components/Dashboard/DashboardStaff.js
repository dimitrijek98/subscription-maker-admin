import React, {Component} from 'react';
import AuthService from "../../Services/AuthService";
import SubscriptionService from "../../Services/SubscriptionService";

class DashboardStaff extends Component {
    constructor(props) {
        super(props);
        this.AuthService = new AuthService();
        this.SubscriptionService = new SubscriptionService();
        this.state = {
            plansData: [],
            contractsData: [],
            email: '',
            target: '',
            plan: {}
        }
    }
    componentDidMount = () => {
        if(!this.AuthService.getUser())
            this.props.history.push("/");
        this.getAllPlans();
    }

    getAllPlans = () => {
        this.SubscriptionService.getAllPlans()
            .then(response => {
                let data = response.data.map(reg => {
                    return { ...reg }
                })
                this.setState({ plansData: data });
            })
    }

    findUser = () => {
        this.SubscriptionService.findUser()
            .then();
    }

    getAllUsersContracts = () => {
        this.SubscriptionService.getAllUsersContracts()
            .then(response => {
                let data = response.data.map(reg => {
                    return { ...reg }
                })
                this.setState({ contractsData: data });
            })
    }

    deleteContract = (e) => {
        this.SubscriptionService.deleteContract(this.state.email, this.state.target)
            .then(response => {
                if (response.status === 200) {
                    alert("Contract has been deleted!");
                    window.location.reload();
                }
            }
            );
    }
    addContract = (e) => {
        this.SubscriptionService.setNewContract(this.state.email, this.state.target, this.state.plan)
            .then(response => {
                if (response.status === 200) {
                    alert("New contract is done.");
                    window.location.reload();
                }
            }
            );
    }
    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    
    logOut = () =>{
        this.AuthService.LogOut();
        this.props.history.push("/");
    }
    render() {
        return (
            <div className='container-fluid dashboard'>
                
            </div>
        );
    }
}

export default DashboardStaff;