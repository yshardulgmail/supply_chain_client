import React from 'react';
import { useEffect, useMemo, useState } from 'react';
// import { fakeData, usStates } from './makeData';
import { getData, postData } from './SupplyChainService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Customers = () => {
    const [customerDetails, setCustomerDetails] = useState(<></>);
    const [customers, setCustomers] = useState([]);
    const [displayDetails, setDisplayDetails] = useState("none");
    const name = React.useRef(null);
    const phone = React.useRef(null);
    const email = React.useRef(null);
    const address = React.useRef(null);

    useEffect(() => {
        handleGetData();
    }, []);

    useEffect(() => {

    }, [customerDetails, displayDetails]);


    function handleAdd() {
        alert("inside");
        const details = <form>
                        <table>
                            <tr>
                                <td className='formTd'>Name</td>
                                <td><input type="text" id="name" name="name" class="formInput" placeholder="Name" required ref={name}></input></td>
                            </tr>
                            <tr>
                                <td className='formTd'>Phone</td>
                                <td><input type="text" id="phone" name="phone" class="formInput" placeholder="Phone Number" required ref={phone}></input></td>
                            </tr>
                            <tr>
                                <td className='formTd'>Email</td>
                                <td><input type="text" id="email" name="email" class="formInput" placeholder="Email" required ref={email}></input></td>
                            </tr>
                            <tr>
                                <td className='formTd'>Address</td>
                                <td><input type="text" id="price" name="price" class="formInput" placeholder="Price" required ref={address}></input></td>
                            </tr>
                        </table>
                        <input type="submit" class="submitButton" name="submitButton" value="Add Customer" onClick={handleAddData}/>
                        </form>;
        setDisplayDetails("block");
        setCustomerDetails(details);
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
        postData("customers", postCustData).then(data => {
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
        getData("customers").then(data => {
            setCustomers(data);
        });
    }

    const tableData = customers.map(item => {
        return <tr>
            <td>{item.name}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.address}</td>
            <td><button onClick={() => handleUpdate(item.cId)} style={{ width: "150px", margin: "10px" }}>Edit Customer</button>
                <button onClick={() => handleDelete(item.cId)} style={{ width: "150px", margin: "10px" }}>Delete Customer</button></td>
        </tr>
    });

    return (
        <div>
            <h2>Customers</h2>
            <hr />
            <button onClick={() => handleAdd()} style={{ width: "150px", margin: "20px" }} >Add Product</button>
            <table className="customers">
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                {tableData}

            </table>

            <div class="formContainer" style={{ display: displayDetails }}>
                <div class="leftSide">
                    <h2 class="formHeader">Customer Details</h2>
                    <div class="formContentContainer">
                        
                            {customerDetails}
                            
                    </div>
                </div>
                {/* <div class="rightSide">
                </div> */}
                {/* <div class="orCircle">or</div> */}
            </div>

        </div>
    );

}

export default Customers;

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
