import { useEffect, useMemo, useState } from 'react';
// import { fakeData, usStates } from './makeData';
import { getData } from './SupplyChainService';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


const Customers = () => {
    const [customerDetails, setCustomerDetails] = useState({});
    const [customers, setCustomers] = useState([]);
    const [displayDetails, setDisplayDetails] = useState("none");

    useEffect(() => {
        handleGetData();
    }, []);

    useEffect(() => {

    }, [customerDetails]);


    function handleAdd() {
        const details = <table>
                            <tr>
                                <td>Name</td>
                                <td><input type="text" id="name" name="name"></input></td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td><input type="text" id="category" name="category"></input></td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td><input type="text" id="subcategory" name="subcategory"></input></td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td><input type="text" id="price" name="price"></input></td>
                            </tr>
                        </table>;
        setDisplayDetails("block");
        setCustomerDetails(details);
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
            <td>{item.customer_Name}</td>
            <td>{item.customer_Phone}</td>
            <td>{item.customer_Email}</td>
            <td>{item.address}</td>
            <td><button onClick={() => handleUpdate(item.customer_Id)} style={{ width: "150px", margin: "10px" }}>Edit Customer</button>
                <button onClick={() => handleDelete(item.customer_Id)} style={{ width: "150px", margin: "10px" }}>Delete Customer</button></td>
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

            <div style={{ display: displayDetails }}>
                
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
