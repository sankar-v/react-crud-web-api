//https://bezkoder.com/react-crud-web-api/
import React, { Component } from "react";
import TutorialDataService from "../services/tutorial.service";
import MockTutorialDataService from "../services/mocktutorial.service";
import { v4 as uuidv4 } from 'uuid';

export default class AddTutorial extends Component {

    constructor(props) {
        super(props);
        //Replaced with arrow notation to remove bindings..
        /*
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);
        */

        this.state = {
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
        };
    }

    onChangeTitle =(e) => {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription = (e) => {
        this.setState({
            description: e.target.value
        });
    }
    
    //Does not uset he database..when backend is ready db method will be used.
    mockSaveTutorial = () => {
        let id = uuidv4();
        var data = {
            id: id,
            title: this.state.title,
            description: this.state.description
        };

        MockTutorialDataService.create(data)
            .then(response => {
                console.log(response);
                this.setState({
                    id: response.id,
                    title: response.title,
                    description: response.description,
                    published: response.published,
                    submitted: true
                });
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });
    }
 
    saveTutorial = () => {
        var data = {
            title: this.state.title,
            description: this.state.description
        };

        TutorialDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newTutorial = () => {
        this.setState({
            id: null,
            title: "",
            description: "",
            published: false,
            submitted: false
        });
    }

    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                            <button className="btn btn-success" onClick={this.newTutorial}>
                                Add
                            </button>
                    </div>
                ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    required
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    name="title"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    name="description"
                                />
                            </div>

                            <button onClick={this.mockSaveTutorial} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    )}
            </div>
        );
    }
}