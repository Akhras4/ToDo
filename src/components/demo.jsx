import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Demo() {
    const [inputval, setinputval] = useState('');
    const [user, setUser] = useState([]);
    const [err, seterr] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userchois,setchoisUsers]  =useState([])
    useEffect(() => {
        axios.get('https://dummyjson.com/users')
            .then(result => {
                setUser(result.data);
            })
            .catch(err => seterr('Something went wrong, please try again'));
    }, []);
    const handelinput=(e)=>{
        setFilteredUsers([])
        const searchTerm = e.target.value.toLowerCase();
        setinputval(searchTerm)
        console.log(user); 
        const filteredItemshint =  user.users.filter(user =>
            user.firstName.toLowerCase().startsWith(searchTerm)
        )
        setFilteredUsers(filteredItemshint);
        seterr(null)
        setchoisUsers(null);
 }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(inputval==''){return setFilteredUsers(null)} 
        const searchTerm = inputval.toLowerCase(); 
        const filteredItems =  user.users.filter(user =>
            user.firstName.toLowerCase().includes(searchTerm)
        )    
        if (filteredItems.length === 0 ){
            seterr("not found")
        }else{
        setchoisUsers(filteredItems);
    }setFilteredUsers(null)
    };
    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        onChange={ handelinput}
                        value={inputval}
                        placeholder='Username'
                    />
                    <button type='submit'>Search</button>
                </form>
                <ul>
                {inputval &&filteredUsers&&filteredUsers.map(user => <li key={user.id}>{user.firstName}</li>)}
                </ul>
                {userchois && userchois.map(user => <div key={user.id}>
                <h1>firstName:{user.firstName}</h1>
                <p>lastName:{user.lastName}</p>
                <p>email:{user.email}</p>
                <p>phone:{user.phone}</p>
                <p>hair:{user.hair.type}</p>
                </div>)}
                {err && <p>{err}</p>}
            </div>
        </div>
    );
}