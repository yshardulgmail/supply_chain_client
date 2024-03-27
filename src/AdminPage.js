import React, { useState } from "react";
import AdminLayout from "./AdminLayout";
import ShowActions from "./ShowActions";
// import AddProduct from "./AddProduct";
// import UpdateProduct from "./UpdateProduct";
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";

function AdminPage(props) {
	const { role } = props;

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<AdminLayout />}>
						<Route index element={<ShowActions />} />
						{/* <Route path="actions" element={<AddProduct />} />
						<Route path="addProduct" element={<AddProduct />} />
						<Route path="updateProduct" element={<UpdateProduct />} /> */}
					</Route>
				</Routes>
			</BrowserRouter>

			<Outlet />
		</>
	);
}

export default AdminPage;