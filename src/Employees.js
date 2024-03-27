import React from 'react';
import { useEffect, useMemo, useState } from 'react';
// import { fakeData, usStates } from './makeData';
import { getData, postData } from './SupplyChainService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Employees = () => {
    const [employeeDetails, setEmployeeDetails] = useState(<></>);
    const [employees, setEmployees] = useState([]);
    const [users, setUsers] = useState([]);
    const [userroles, setUserroles] = useState([]);
    const [roles, setRoles] = useState([]);
    const [displayDetails, setDisplayDetails] = useState("none");
    const name = React.useRef(null);
    const phone = React.useRef(null);
    const email = React.useRef(null);
    const address = React.useRef(null);

    useEffect(() => {
        handleGetData();
    }, []);

    useEffect(() => {

    }, [employeeDetails, displayDetails]);


    function handleAdd() {
        alert("inside");
        const details = <form>
                        <table>
                            <tr>
                                <td className='formTd'>Name</td>
                                <td><input type="text" id="name" name="name" class="formInput" placeholder="Name" required ref={name}></input></td>
                            </tr>
                            <tr>
                                <td className='formTd'>Password</td>
                                <td><input type="text" id="phone" name="phone" class="formInput" placeholder="Phone Number" required ref={phone}></input></td>
                            </tr>
                            <tr>
                                <td className='formTd'>Role</td>
                                <td><input type="text" id="email" name="email" class="formInput" placeholder="Email" required ref={email}></input></td>
                            </tr>
                        </table>
                        <input type="submit" class="submitButton" name="submitButton" value="Add Employee" onClick={handleAddData}/>
                        </form>;
        setDisplayDetails("block");
        setEmployeeDetails(details);
    }

    function handleAddData(event) {
        event.preventDefault();
        const min = 1;
        const max = 10000;
        const custId = Math.floor(min + (Math.random() * (max - min)));
        const postCustData = {
            cID: custId,
            name: name.current.value,
            phone: phone.current.value,
            email: email.current.value,
            address: address.current.value
        }
        console.log();
        console.log(name.current.value);
        postData("employees", postCustData).then(data => {
            console.log(data)
        });
        // console.log(event.target.name.value);
    }

    function handleUpdate(id) {
        alert(id);
    }

    function handleDelete(id) {
        alert(id);
    }

    function handleGetData() {
        // let users = [];
        // let userroles = [];
        // let roles = [];
        getData("users").then(data => setUsers(data));
        getData("userroles").then(data => setUserroles(data));
        getData("roles").then(data => setRoles(data));

        console.log(users);
        console.log(userroles);
        console.log(roles);
        const finalData = users.map(item => {
            let temp = {};
            temp["user_id"] = item.user_id;
            temp["user_name"] = item.username;
            temp["password"] = item.password;
            temp["role"] = roles.filter(k => k.role_id == userroles.filter(i => i.user_id == item.user_id)[0].role_id).role_name;
            
            return temp;
        });

        setEmployees(finalData);

    }

    const tableData = employees.map(item => {
        return <tr>
            <td>{item.user_name}</td>
            <td>{item.password}</td>
            <td>{item.role}</td>
            <td><button onClick={() => handleUpdate(item.cId)} style={{ width: "150px", margin: "10px" }}>Edit Employee</button>
                <button onClick={() => handleDelete(item.cId)} style={{ width: "150px", margin: "10px" }}>Delete Employee</button></td>
        </tr>
    });

    return (
        <div>
            <h2>Employees</h2>
            <hr />
            <button onClick={() => handleAdd()} style={{ width: "150px", margin: "20px" }} >Add Product</button>
            <table className="customers">
                <tr>
                    <th>Name</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                {tableData}

            </table>

            <div class="formContainer" style={{ display: displayDetails }}>
                <div class="leftSide">
                    <h2 class="formHeader">Employee Details</h2>
                    <div class="formContentContainer">
                        
                            {employeeDetails}
                            
                    </div>
                </div>
                {/* <div class="rightSide">
                </div> */}
                {/* <div class="orCircle">or</div> */}
            </div>

        </div>
    );

}

export default Employees;

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
    !!email.length &&
    email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );

function validateUser(user) {
    return {
        firstName: !validateRequired(user.firstName)
            ? 'First Name is Required'
            : '',
        lastName: !validateRequired(user.lastName) ? 'Last Name is Required' : '',
        email: !validateEmail(user.email) ? 'Incorrect Email Format' : '',
    };
}
