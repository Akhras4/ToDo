import React,{useEffect,useState} from 'react';
import axios from 'axios';

export default function Githup() {
const [username,setusername]=useState("")
const [userrepo,setuserrepo]=useState([])
const [userinfo,setuserinf]=useState([])
const [errgit,seterrgit]=useState(null)
const [errinfo,seterrinfo]=useState(null)
const [errrepo,seterrrepo]=useState(null)
const clientId = "be2766792dd89cb0c93b";
const clientSecret ="c63166b1eb64bdd81f3dfe45c94c61e6e66e6e1c"

useEffect(()=>{
    fetchdata()
},[])
const fetchdata=()=>{
    if(!username){return} 
axios.get(`https://api.github.com/users/${username}?client_id=${clientId}&client_secret=${clientSecret}&sort=created`)
.then(info => {if(!info){seterrinfo('user not found') ;return}setuserinf(info.data);})
.catch(error => {seterrgit('user not found');})
axios.get(`https://api.github.com/users/${username}/repos`)
.then(repo => {if(!repo){seterrrepo('user user dont have any repo yet') ;return}setuserrepo(repo.data);})
.catch(error => {seterrgit('someting wrong pleace try again to show user repo');})
;}

const handleSubmit=(e)=>{
    e.preventDefault()
    setusername ([])
    setuserrepo ([])
    setuserinf ([])
     setusername(username)
     fetchdata(username)
}
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
        <div class="search-container">
                <form class="search-form"  onSubmit={handleSubmit}>
                    <input
                     class="search-input"
                       list="browsers"
                        type="text"
                        onChange={(e)=> {setusername(e.target.value) ;seterrgit ([]);
                            seterrinfo ([]);
                            seterrrepo ([]); }}
                        value={username}
                        placeholder='githup Username'
                        name="username"
                    />
                     <button class="search-button" type='submit'>Search</button>
                     </form>
        </div>
        <div className='mainco' style={{display:'flex',flexDirection:'row'}}>
        {errinfo && <p>{errinfo}</p>}
        { userinfo &&  (
        <div >
           <img src={userinfo.avatar_url} style={{borderradius:'50px' }} />
          <ul>
          { userinfo.name && <li>Fullname: { userinfo.name}</li>}
          { userinfo.login && <li>Username: { userinfo.login}</li>}
          { userinfo.location && <li>Location: { userinfo.location}</li>}
          { userinfo.email && <li>Email Address: { userinfo.email}</li>}
        </ul>
      </div>
        )}
        <div>
        { errrepo &&<h3>User Repositories</h3>}
            {errrepo && <p>{errrepo}</p>}
                <ul className="list-group">
                    {userrepo && userrepo.map((repo) => (
                    <li key={repo.id}><a href={repo.svn_url} target="_blank">{repo.name}</a>: {repo.description}</li>
                    ))}
                   </ul>
                </div>
            </div>
            {errgit && <p>{errgit}</p>}
    </div>
  )
}
