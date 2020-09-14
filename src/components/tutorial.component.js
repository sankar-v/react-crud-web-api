import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom"
import TutorialDataService from "../services/tutorial.service";

const TutorialVer2 = (props) => {

    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        published: false
    };

    const { currentTutorial, message } = props;

    return (
        <div >
            {currentTutorial ? (
                <div>
                    <h4>Tutorial</h4>
                    <div>
                        <label>
                            <strong>Title:</strong>
                        </label>{" "}
                        {currentTutorial.title}
                    </div>
                    <div>
                        <label>
                            <strong>Description:</strong>
                        </label>{" "}
                        {currentTutorial.description}
                    </div>
                    <div>
                        <label>
                            <strong>Status:</strong>
                        </label>{" "}
                        {currentTutorial.published ? "Published" : "Pending"}
                    </div>

                    <Link
                        to={"/tutorials/" + currentTutorial.id}
                        className="badge badge-warning"
                    >
                        Edit
        </Link>
                </div>
            ) : (
                    <div>
                        <br />
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
        </div>
    )
}

const TutorialContainer = props => {

    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        published: false
    };

    const [currentTutorial, setCurrentTutorial] = useState(initialTutorialState);
    const [message, setMessage] = useState("")

    useEffect(() => {
        getTutorial(props.match.params.id);
    }, [props.match.params.id]);

    const getTutorial = id => {
        TutorialDataService.get(id)
            .then(response => {
                setCurrentTutorial(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteTutorial = (id) => {
        TutorialDataService.remove(id)
            .then(response => {
                console.log(response.data);
                props.history.push("/tutorials");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateTutorial = (id, tutorial) => {
        TutorialDataService.update(id, tutorial)
            .then(response => {
                console.log(response.data);
                setMessage("The tutorial was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updatePublished = (status, tutorial) => {
        var data = {
            id: tutorial.id,
            title: tutorial.title,
            description: tutorial.description,
            published: status
        };

        TutorialDataService.update(tutorial.id, data)
            .then(response => {
                setCurrentTutorial({ ...tutorial, published: status });
                console.log(response.data);
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
        <TutorialVer2
            handleInputChange={handleInputChange}
            currentTutorial={currentTutorial}
        />
    )
}

export { TutorialContainer, TutorialVer2 };