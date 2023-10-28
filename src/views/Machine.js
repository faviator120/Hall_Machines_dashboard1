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
import React,{useEffect,useContext,useState} from "react";
import { useLocation,useParams } from 'react-router-dom';

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
  CardImg,
} from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "UserContext";
import { updateData } from "FirebaseConfig/firebaseHelper";

function Machine({props}) {
    let { id } = useParams()
    const [newItem,setNewItem] = useState(false)
    const [machineDetails,setMachineDetails] = useState()
   
  const {userData,machineList,setMachineList} = useContext(UserContext)
useEffect(()=>{
    if(id==='new')
        setNewItem(true)
},[id])
useEffect(()=>{
  if(!newItem){   
    machineList.map((element)=>{
      if(element.Id===id)
        setMachineDetails(element)
    }) 
}
},[id, machineList, newItem])

const handleSubmit = async ()=>{
  await updateData('stations/'+userData.station+'/inventory/'+id,machineDetails).then((data)=>{
    console.log("updated",data)
  })
}

if(machineDetails)
  return (
    <>
        <div className="content">
          <Row>
            <Col md="8" xs='12'>
              <Card className="h-100">
                <CardHeader>
                  <h1 className="title">Machine: {machineDetails.name}</h1>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Machine Name</label>
                          <Input
                            defaultValue={machineDetails.name}
                            placeholder="Machien Name"
                            type="text"
                            onChange={(e) =>
                              setMachineDetails({ ...machineDetails, name: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Machine Type</label>
                          <Input
                            defaultValue={machineDetails.type}
                            placeholder="Type"
                            type="text"
                            onChange={(e) =>
                              setMachineDetails({ ...machineDetails, type: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Company</label>
                          <Input
                            defaultValue={machineDetails.CompanyName}
                            placeholder="Company Name"
                            type="text"
                            onChange={(e) =>
                              setMachineDetails({ ...machineDetails, CompanyName: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                      <FormGroup>
                        <label >Date Recieved</label>
                        <Input
                          id="exampleDate"
                          name="date"
                          defaultValue={machineDetails.DateRecieved}
                          placeholder="date placeholder"
                          type="date"
                          onChange={(e) =>
                            setMachineDetails({ ...machineDetails, DateRecieved: e.target.value })
                          }
                        />
                      </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label>Recieved By:</label>
                          <Input
                            defaultValue={machineDetails.RecievedBy}
                            placeholder="Full name"
                            type="text"
                            onChange={(e) =>
                              setMachineDetails({ ...machineDetails, RecievedBy: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Machine Id</label>
                          <Input
                            defaultValue={machineDetails.Id}
                            placeholder="This will be filled automayically"
                            type="text"
                            disabled
                          />
                        </FormGroup>
                      </Col>
                     
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <label>Cost of Machine</label>
                          <Input
                            defaultValue={machineDetails.Cost}
                            placeholder="Cost of machine in Rupees"
                            type="number"
                            onChange={(e) =>
                              setMachineDetails({ ...machineDetails, Cost: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Rent Rate (per day)</label>
                          <Input
                            defaultValue={machineDetails.RentRate}
                            placeholder="Rent Rate in rupees per day"
                            type="number"
                          />
                        </FormGroup>
                      </Col>
                     
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>About Machine</label>
                          <Input
                            cols="80"
                            defaultValue={machineDetails.About}
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                            onChange={(e) =>
                              setMachineDetails({ ...machineDetails, About: e.target.value })
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" color="primary" type="submit" onClick={handleSubmit}>
                    {newItem?'Save':'Update'}
                  </Button>
                </CardFooter>
              </Card>
             
            </Col>
            <Col md="4" xs='12'>
              <Card className="h-100 text-center " >
                <CardImg
                  alt="Card image cap"
                  src={require('assets/img/'+id+'.png')}
                  top
                  className="p-2 rounded"
                />
                <CardBody>
                  
                  </CardBody>
                  </Card>
                  </Col>
             </Row>
        </div>
    </>
  );
}

export default Machine;
