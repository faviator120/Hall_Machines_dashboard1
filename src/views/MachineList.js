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

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  CardFooter,
} from "reactstrap";
import { getDataOnce } from "FirebaseConfig/firebaseHelper";
import { UserContext } from "UserContext";

import { Link  } from "react-router-dom";
function MachineList() {
  const {userData,machineList,setMachineList} = useContext(UserContext)
  useEffect(()=>{

    const fetchData=async()=>{

      if(userData){
       let data = await getDataOnce('stations/'+userData.station+'/inventory')
       const temp = Object.keys(data).map((key) => ({
        Id: key,
        Cost: data[key].Cost,
        name: data[key].name,
        inStock: data[key].inStock,
        type: data[key].type,
      }));
      
       setMachineList(temp)
    }
}

fetchData()
  },[userData])



  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card >
              <CardHeader>
                <CardTitle tag="h4">Machines in this station</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Cost</th>
                      <th >Instock</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {machineList.map((machine)=>(
                      
                    <tr key={machine.Id}>
                      <td>{machine.Id}</td>
                      <td>{machine.name}</td>
                      <td>{machine.type}</td>
                      <th>{machine.Cost}</th>
                      <td >{machine.inStock?'yes':'no'}</td>
                      <td className="text-center">
                      <Link to={{ pathname: '/admin/machine/' +machine.Id }}>
                        <button className="btn-primary rounded" >View</button>
                        </Link>
                        <button className="btn-primary rounded">Edit</button>
                        <button  className="btn-primary rounded">Delete</button>
                      </td>
                  </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
              <CardFooter  className="text-center bg-dark">
                
              <button className="btn-primary rounded mr-1">Add New</button>
              <button  className="btn-primary rounded ml-1">Refresh</button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default MachineList;
