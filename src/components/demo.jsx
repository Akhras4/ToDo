import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Demo() {
    const [inputval, setinputval] = useState('');
    const [user, setUser] = useState([]);
    const [err, seterr] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [userchois,setchoisUsers]  =useState()
    useEffect(() => {
        axios.get('https://dummyjson.com/users')
            .then(result => {
                setUser(result.data); 
            })
            .catch(err => seterr('Something went wrong, please try again'));
    }, []);
    const handelinput=(e)=>{
        const searchTerm = e.target.value.toLowerCase();
        setinputval(searchTerm)
        console.log(user); 
        const filteredItemshint =  user.users.filter(user =>
            user.firstName.toLowerCase().startsWith(searchTerm)
        )
        setFilteredUsers(filteredItemshint);
        seterr(null)
        setchoisUsers([]);
 }
    const handleSubmit = (e) => {
        e.preventDefault()
        if(inputval==''){return setFilteredUsers([])} 
        const searchTerm = inputval.toLowerCase(); 
        const filteredItems =  user.users.filter(user =>
            user.firstName.toLowerCase().includes(searchTerm)
        )    
        if (filteredItems.length === 0 ){
            seterr("not found")
        }else{
        setchoisUsers(filteredItems);
    }
    setFilteredUsers([])
    }
    const handleclick = (userId) => {
        const finduser = user.users.find(user => user.id === userId);
        if (finduser) {
            setchoisUsers([finduser]);
            setFilteredUsers([])
        }
    }
    
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
                {inputval &&filteredUsers&&filteredUsers.map(user => <li key={user.id} onClick={() => handleclick(user.id)}>{user.firstName}</li>)}
                </ul>
                {userchois && userchois.map(user => <div key={user.id}>
                <h1>firstName:{user.firstName}</h1>
                <p>lastName:{user.lastName}</p>
                <p>email:{user.email}</p>
                <p>phone:{user.phone}</p>
                <p>hair:{user?.hair?.type}</p>
                </div>)}
                {err && <p>{err}</p>}
            </div>
        </div>
    );
}