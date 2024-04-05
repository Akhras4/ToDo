import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Demo() {
    /* The code snippet you provided is using the `useState` hook from React to declare multiple state
    variables in a functional component. Here's a breakdown of what each line is doing: */
    const [inputval, setinputval] = useState('');
    const [user, setUser] = useState([]);
    const [err, seterr] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userchois, setchoisUsers] = useState()
    /* The `useEffect` hook in the provided code snippet is making an HTTP GET request to the URL
    'https://dummyjson.com/users' when the component mounts for the first time. */
    useEffect(() => {
        axios.get('https://dummyjson.com/users')
            .then(result => {
                setUser(result.data);
            })
            .catch(err => seterr('Something went wrong, please try again'));
    }, []);
    /**
     * The function `handelinput` filters a list of users based on the input value and updates the state
     * variables accordingly.
     */
    const handelinput = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        setinputval(searchTerm)
        console.log(user);
        const filteredItemshint = user.users.filter(user =>
            user.firstName.toLowerCase().startsWith(searchTerm)
        )
        setFilteredUsers(filteredItemshint);
        seterr(null)
        setchoisUsers([]);
    }
 
/**
 * The handleSubmit function takes a search term, filters a list of users based on their first name
 * matching the search term, and updates state accordingly.
 */
    const handleSubmit = (e) => {
        e.preventDefault()
        const searchTerm = inputval.toLowerCase();
        const filteredItems = user.users.find(user =>
            user.firstName.toLowerCase() === searchTerm
        )
        if (!filteredItems) {
            seterr("not found")
        } else {
            setchoisUsers(filteredItems);
        }
        setFilteredUsers([])
    }
    /**
     * The `handleclick` function finds a user by their ID and updates the state with the found user.
     */
    const handleclick = (userId) => {
        const finduser = user.users.find(user => user.id === userId);
        if (finduser) {
            setchoisUsers([finduser]);
            setFilteredUsers([])
        }
    }
    return (
        <div>
            <div class="search-container">
                <form class="search-form"  onSubmit={handleSubmit}>
                    <input
                     class="search-input"
                       list="browsers"
                        type="text"
                        onChange={handelinput}
                        value={inputval}
                        placeholder='Username'
                    />
                     <button class="search-button" type='submit'>Search</button>
                     </form>
                    <ul className="search-results" id="searchResults">
                    {inputval && filteredUsers && filteredUsers.map(user =><li key={user.id} onClick={() => handleclick(user.id)}>{user.firstName}</li>)}
                     </ul>
                     </div>

                {userchois && userchois.map(user => <div key={user.id}>
                    <h1>firstName:{user.firstName}</h1>
                    <p>lastName:{user.lastName}</p>
                    <p>email:{user.email}</p>
                    <p>phone:{user.phone}</p>
                    <p>hair:{user.hair.type}</p>
                </div>)}
                {err && <p>{err}</p>}
          
        </div>
    );
}