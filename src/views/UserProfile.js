/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { isValidElement, useContext, useEffect, useState } from 'react';
import { auth } from 'FirebaseConfig/firebaseConfig';
import { signInWithEmailAndPassword,updatePassword,getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import { UserContext } from 'UserContext';
import { updateData } from 'FirebaseConfig/firebaseHelper';

function UserProfile() {
  // State for error handling
  const [newUserData, setNewUserData] = useState({});
  const [pwd, setPwd] = useState({});
  const [pwdError, setPwdError] = useState({isError:false,errMessage:""});

  const { userData, setUserData } = useContext(UserContext);


  const handleSave = () => {
  const fetchData = async () => {
    await updateData("stationControler/" + user.uid,newUserData).then((data)=>{
      window.location.reload();
    })
    };
    fetchData()
  };

  const changePassword = async () => {
    console.log(pwd.oldPWD)
    if(!pwd.newPWD){
    setPwdError({isError:true,errMessage:"Enter new password"})
      return
  }
    if(pwd.newPWD !== pwd.rePWD) {  
      setPwdError({isError:true,errMessage:"Password do not match"})
      return}
    if(String(pwd.newPWD).length<8) {  
      setPwdError({isError:true,errMessage:"Password should be minumum 8 characters long"})
      return}

    try{
    let validate = await signInWithEmailAndPassword(auth,user.email,pwd.oldPWD)

        updatePassword(user,pwd.newPWD)
        setPwdError({isError:false,errMessage:""})
      }
      catch(err){
        setPwdError({isError:true,errMessage:"Current password wrong"})
      }
  }
  const [user] = useAuthState(auth);

  return (
    userData ?
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="5">
                        <FormGroup>
                          <label>Company (disabled)</label>
                          <Input
                            defaultValue="HHAL Machineries."
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="3">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue={user.email}
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder={user.email} type="email" 
                            disabled />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue={userData.firstName}
                            placeholder="Company"
                            type="text"
                            onChange={(e) =>
                              setNewUserData({ ...newUserData, firstName: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue={userData.lastName}
                            placeholder="Last Name"
                            type="text"
                            onChange={(e) =>
                              setNewUserData({ ...newUserData, lastName: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue={userData.Address}
                            placeholder="Home Address"
                            type="text"
                            onChange={(e) =>
                              setNewUserData({ ...newUserData, Address: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>District</label>
                          <Input
                            defaultValue={userData.District}
                            placeholder="District"
                            type="text"
                            onChange={(e) =>
                              setNewUserData({ ...newUserData, District: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Station Name</label>
                          <Input
                            defaultValue={userData.station}
                            placeholder="Station Name"
                            type="text"
                            onChange={(e) =>
                              setNewUserData({ ...newUserData, station: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="4">
                        <FormGroup>
                          <label>Pin Code</label>
                          <Input placeholder={userData.Pincode} type="number" 
                            onChange={(e) =>
                              setNewUserData({ ...newUserData, Pincode: e.target.value })
                            }/>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols="80"
                            defaultValue=""
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={handleSave}>
                    Save
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <h5 className="title">Change password</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="4">
                        <FormGroup>
                          <label>Old Password</label>
                          <Input
                            defaultValue=""
                            placeholder="Old Password"
                            type="password" 
                            onChange={(e) =>
                              setPwd({ ...pwd, oldPWD: e.target.value })
                            }
                          />
                  {pwdError.isError?<label className='text-danger'>{pwdError.errMessage}</label>:<></>}
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>New Password</label>
                          <Input
                            defaultValue=''
                            placeholder="New Password"
                            type="password"
                            onChange={(e) =>
                              setPwd({ ...pwd, newPWD: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="4">
                        <FormGroup>
                          <label>Re-enter new Password</label>
                          <Input
                            defaultValue=''
                            placeholder="Re-enter Password"
                            type="password"
                            onChange={(e) =>
                              setPwd({ ...pwd, rePWD: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary"  onClick={changePassword}>
                    Change Password
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/default-avatar.png")}
                      />
                      <h5 className="title">{userData.firstName + ' ' + userData.lastName}</h5>
                    </a>
                    <p className="description">Ceo/Co-Founder</p>
                  </div>
                  <div className="card-description">
                    Do not be scared of the truth because we need to restart the
                    human foundation in truth 
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </> :
      <></>
  );
}

export default UserProfile;
