import React from 'react'

function AboutUser(props) {
    //Updating A User

    const { users, updateUser } = props;
    return (
        <>
            <div className="mx-auto col-md-6 col-10">
                <div className="card my-4">
                    <div className="card-body">
                        <div className="card-title row">
                        <div className="col-md-8 col-4">Name: </div>
                        <div className="col-md-4 col-8 float-right">{users.name}</div>
                        </div>
                        <div className="card-title row">
                        <div className="col-md-8 col-4">Email: </div>
                        <div className="col-md-4 col-8 float-right">{users.email}</div>
                        </div>
                        <div className="card-title row">
                        <div className="col-md-8 col-4">Password: </div>
                        <div className="col-md-4 col-8 float-right">{users.password}</div>
                        </div>
                        <div className="row">
                            <div className="col-md-3 mx-auto col-6">
                            Edit Info: <i className="fa-regular fa-pen-to-square mx-3" onClick={() => { updateUser(users) }}></i>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUser;