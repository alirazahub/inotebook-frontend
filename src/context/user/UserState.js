import React, { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
    const host = "http://localhost:5000"; 

    // const userInitial=[];
    const [users, setUser] = useState({id: '', name: '', email: '', password: ''});


    //Gett users
        //Getting All Notes
        const getUser = async () => {
            //Api Call
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                }
            });
            const json = await response.json();
            // console.log(json);
            setUser(json);
        }


    //Edit User
    const editUser = async (id, name, email, password) => {
        //Api Call
        //eslint-disable-next-line 
        const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ name, email, password })
        });
        let newUser = JSON.parse(JSON.stringify(users));
            if (newUser._id === id) {
                newUser.name = name;
                newUser.password = password;
                newUser.email = email;
            }
        
        setUser(newUser);
    }
    return (
        <UserContext.Provider value={{ users,getUser,editUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;