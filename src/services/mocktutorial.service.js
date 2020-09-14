import React, {useState} from "react";
import data from './data';

//https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
const singers = [
    { name: 'Steven Tyler', band: 'Aerosmith', born: 1948 },
    { name: 'Karen Carpenter', band: 'The Carpenters', born: 1950 },
    { name: 'Kurt Cobain', band: 'Nirvana', born: 1967 },
    { name: 'Stevie Nicks', band: 'Fleetwood Mac', born: 1948 },
];

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}

function compareTutorialsById(a,b){
    const i = parseInt(a.i);
    const j = parseInt(b.i)
  
    let comparison = 0;
    if (i > j) {
      comparison = 1;
    } else if (i < j) {
      comparison = -1;
    }
    return comparison;
  }

data.sort(compareTutorialsById)


class MockTutorialDataService{
        
    constructor(){
        this.reset = false;
        this.store = data;
    }
    
    async getAll(){
        
        let promise = Promise.resolve(this.store);
        let result = await promise;
        return result;
    }

    async get(id) {
        let found = null
        let promise = new Promise((resolve,reject)=>{
            if (this.store !== null && this.store.length > 0){
                this.store.map((tutorial, index) => {
                    if (parseInt(id) === parseInt(tutorial.id )){
                        found = tutorial
                    }
                })
            }
            if (found !== null){
                resolve(found)
            }else{
                reject("No match found")    
            }
        })
        let result = await promise;
        //console.log(result)
        return result;
    }

    //Not the proper implementation.. unique id isneeded for id..guid or calculate .. 
    async create(d) {
        console.log("inside create")
        console.log(d)
        let promise = new Promise((resolve,reject)=>{
            if (d !== null){
                this.store.push(d);
                console.log(this.store)
                resolve(d)
            }else{
                reject("Could not create Tutorial")
            }
        })
        let result = await promise;
        return result;
    }

    async update(id, d){
        let updatedData = this.store;
        let promise = new Promise((resolve,reject)=>{
            if (d !== null){
                updatedData.map((tutorial, index) =>{
                    if (parseInt(tutorial.id) === parseInt(id)){
                        console.log("DESCR:" + d.description);
                        tutorial.description =  d.description
                        console.log(d);
                        tutorial.title = d.title
                        tutorial.status = d.status
                    }
                })
            }
            if (d !== null){
               //data = updatedData;
                this.store = updatedData 
                resolve("Tutorial id " + id + " updated SUCCESSFULLY");
            }else{
                reject("Update of tutorial id " + id + " unsuccessful!!");
            }
        })

        let result = await promise;
        return result;
    }

    async delete(id) {
        let msg = ''
        let promise = new Promise((resolve,reject)=>{
            if (this.store !== null) {
                this.store.map((tutorial, index) => {
                    if (parseInt(tutorial.id) === parseInt(id)){
                        delete this.store[index]
                        msg = "Tutorial ::" + id + " deleted successfully"
                    }   
                })
            }
            if (msg !== '' && msg.length > 0){
                resolve(msg)
            }
            else{
                msg = "Could NOT delete tutorial :: " + id
                reject(msg)
            }
        })
        let result = await promise;
        return result
    }

    async deleteAll() {
        let msg = ""
        let promise = new Promise((resolve, reject) =>{
            if (this.store !== null && this.store.length > 0 ){
                this.store.length = 0;  //emptying the array elements; A=[] works but array is lost 
                msg = "Deleted all tutorials successfully"
                resolve(msg)
            }else{
                msg = "Error deleting all tutorials"
                reject(msg)
            }
        })
        let result = await promise;
        return result
    }

    //There could be more than one item with the same title..
    async findByTitle(title) {
        alert("inside findbyTitle::" + title)
        let matchedTutorials = []
        let promise = new Promise((resolve,reject)=>{
            if (this.store !== null && title.length > 0 && title !== null){
                this.store.map((tutorial, index)=>{
                    if (tutorial.title.toString() === title.toString()){
                        matchedTutorials.push(tutorial)
                    }
                })
            }
            if (matchedTutorials.length > 0){
                resolve(matchedTutorials)
            }else{
                reject(this.store)
            }
        })
        let result = await promise;
        return result
    }
}

export default new MockTutorialDataService();