import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import MockTutorialDataService from "../services/mocktutorial.service";

const EditTutorial = (props) => {

    const { currentTutorial, message } = props;

    return (
        <div>
            {currentTutorial ? (
                <div className="edit-form">
                    <h4>Edit Tutorial</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                value={currentTutorial.title}
                                onChange={props.onChangeTitle}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                value={currentTutorial.description}
                                onChange={props.onChangeDescription}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentTutorial.published ? "Published" : "Pending"}
                        </div>
                    </form>

                    {currentTutorial.published ? (
                        <button
                            className="badge badge-primary mr-2"
                            onClick={() => props.updatePublished(false)}
                        >
                            UnPublish
                        </button>
                    ) : (
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => props.updatePublished(true)}
                            >
                                Publish
                            </button>
                        )}

                    <button
                        className="badge badge-danger mr-2"
                        onClick={props.deleteTutorial}
                    >
                        Delete
                    </button>

                    <button
                        className="badge badge-success"
                        onClick={props.updateTutorial(props.currentTutorial.id, props.currentTutorial)}
                    >
                        Update
                    </button>
                    <p>{props.message}</p>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                    </div>
                   
                )}
        </div>
    );
}

const MockEditTutorialContainer = props => {

    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        published: false
    };

    const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
    const [message, setMessage] = useState("")
    const [title, setTitle ] = useState("")
    const [description, setDescription] = useState("")

    useEffect(() => {
        getTutorial(props.match.params.id);
    }, [props.match.params.id]);

    const onChangeTitle = (e) => {
        const title = e.target.value;
        let tutorial = currentTutorial
        tutorial.title = title
        setTitle(title)
        setCurrentTutorial(tutorial)
    }
    
    const onChangeDescription = (e) => {
        const description = e.target.value;
        let tutorial = currentTutorial
        tutorial.description = description
        setDescription(description)
        setCurrentTutorial(tutorial)
    }

    const getTutorial = id => {
        MockTutorialDataService.get(id)
            .then(response => {
                setCurrentTutorial(response);
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updatePublished = (status) => {
        let d = {
            id: currentTutorial.id,
            title: currentTutorial.title,
            description: currentTutorial.description,
            published: status
        };

        /*
        alert("edit-tutorial - inside updatePublished ")
        console.log("edit-tutorial - updatePublished data ::")
        console.log(data);
        console.log(currentTutorial);
        */
        MockTutorialDataService.update(currentTutorial.id, d)
            .then(response => {
                setCurrentTutorial({ ...currentTutorial, published: status });
                console.log(response);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateTutorial = (id, tutorial) => {  
        MockTutorialDataService.update(id, tutorial)
            .then(response => {
                console.log(response);
                setMessage("The tutorial was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteTutorial = (id) => {
        MockTutorialDataService.delete(id)
            .then(response => {
                console.log(response);
                props.history.push("/tutorials");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleInputChange = (event, tutorial) => {
        const { name, value } = event.target;
        setCurrentTutorial({ ...tutorial, [name]: value });
    };

    /*END - Tutorial*/

    return (
        <EditTutorial
            handleInputChange={handleInputChange}
            deleteTutorial = {deleteTutorial}
            updateTutorial = {updateTutorial}
            updatePublished = {updatePublished}
            onChangeDescription = {onChangeDescription}
            onChangeTitle = {onChangeTitle}
            currentTutorial={currentTutorial}
            message = {message}
        />
    )
}

export { MockEditTutorialContainer, EditTutorial };