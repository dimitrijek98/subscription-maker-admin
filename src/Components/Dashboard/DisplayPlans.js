import React, {Component} from 'react';
import SubscriptionService from "../../Services/SubscriptionService";
import Loader from "react-loader-spinner";

class DisplayPlans extends Component {
    constructor(props) {
        super(props);
        this.SubscriptionService = new SubscriptionService();
        this.state = {
            plansData: [],
            loading: false,
        }
    }
    componentDidMount = () => {
        this.getAllPlans();
    }

    getAllPlans = () => {
        this.SubscriptionService.getAllPlans()
            .then(response => {
                let data = response.data.map(reg => {
                    return {...reg}
                });
                this.setState({plansData: data, loading: false});
            })
    };

    deletePlan = (name) => {
        this.SubscriptionService.deletePlan(name)
            .then(response => {
                if (response.status === 200) {
                    window.location.reload();
                }
            }
            );
    };

    renderPlans = () => {
        if (this.state.plansData.length === 0) {
            return <div className='col-12 p-5'>
                <h3>There is no plans</h3>
            </div>
        } else {
        return this.state.plansData.map(plan => {
            return <div className='col-lg-5 mt-3 ml-3 contract-card'>
                <h3>{`${plan.name}`}</h3>
                <h5>{`Price: ${plan.price} RSD`}</h5>
                <h3>{`Info:`}</h3>
                {plan.services.map(service => {
                    if (service.type === 'Internet') {
                        return <div>
                            <h5>Internet</h5>
                            <h6>{`Speed: ${service.speed}`}</h6>
                        </div>
                    } else if(service.type === 'Mobile'){
                        return <div>
                            <h5>Mobile</h5>
                            <h6>{`Internet: ${service.internet}`}</h6>
                            <h6>{`Minutes: ${service.minutes}`}</h6>
                            <h6>{`SMS: ${service.sms}`}</h6>
                        </div>
                    } else if(service.type === 'Cable') {
                        return <div>
                            <h5>Cable</h5>
                            <h6>{`Channels: ${service.channels}`}</h6>
                        </div>
                    } else {
                        return <div>
                            <h5>Phone</h5>
                            <h6>{`Minutes: ${service.minutes}`}</h6>
                        </div>
                    }
                })}
                <button onClick={() => this.deletePlan(plan.name)} className='btn btn-danger mt-5'>Delete plan</button>
            </div>
        })
    }
}
    render() {
        return (
            <div className='container full-height pt-5'>
                {this.state.loading ?
                    <div className='col-12 p-5'>
                        <Loader
                            type="Puff"
                            color="#00BFFF"
                            height={100}
                            width={100}
                            timeout={0} //3 secs

                        />
                    </div>
                    :
                    <div className='row'>
                    {this.renderPlans()}
                    </div>
                }

            </div>
        );
    }
}

export default DisplayPlans;
