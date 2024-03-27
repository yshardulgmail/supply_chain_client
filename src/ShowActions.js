import "./admin.css"
import { useNavigate } from 'react-router-dom';


const categories = [
	{
		url: "/resources/customers.png",
		name: "Customers",
		category: "customers",
		description: "Customer Actions",
		navigate: "/customers",
		roles: ["SalesManager", "SalesAdmin"]
	},
	{
		url: "/resources/employees.png",
		name: "Employees",
		category: "employees",
		description: "Employees Actions",
		navigate: "/employees",
		roles: ["SalesAdmin"]
	},
	{
		url: "/resources/orders.png",
		name: "Orders",
		category: "orders",
		description: "Orders Actions",
		navigate: "/orders",
		roles: ["SalesProfessional", "SalesAdmin"]
	},
	{
		url: "/resources/products.png",
		name: "Products",
		category: "products",
		description: "Products Actions",
		navigate: "/products",
		roles: ["SalesManager", "SalesAdmin"]
	},
];



function ShowActions(props) {
	const { role } = props;
	const history = useNavigate();

	return (
		<>
			<div className="headerWrapper">
				<h2>Actions</h2>
			</div>
			<div id="wrapper" style={{ display: "inline-flex" }}>
			{
				categories.map((item) => {
					if(item.roles.includes(role))
						return (
							<div className="card" onClick={() => history(item.navigate, { state: { category: item.category } })}>
								<img src={process.env.PUBLIC_URL + item.url} alt="Avatar" style={{ width: "100%", height: "40%" }} />
								<div className="container">
									<h4><b>{item.name}</b></h4>
									<p>{item.description}</p>
								</div>
							</div>
						)
				})};
			</div>
		</>
	);
};

export default ShowActions;