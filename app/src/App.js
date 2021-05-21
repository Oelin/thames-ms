import { BrowserRouter, Link, Redirect, Route, Switch } from "react-router-dom";

import Assignment from "./pages/Assignment";
import Class from "./pages/Class";
import Container from "react-bootstrap/Container";
import CreateAssignment from "./pages/CreateAssignment";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import NotFound from "./pages/NotFound";
import React from "react";
import Student from "./pages/Student";
import Test from "./pages/Test";
import useRole from "./hooks/useRole";

const App = () => {
	const [role] = useRole();

	return (
		<BrowserRouter>
			<Route path="/test" component={Test} />

			<Route exact path="/" component={role.none ? Login : Dashboard} />

			{/* <Nav /> */}
			{/* <Container> */}
				<Switch>
					{/* <Route
						exact
						path="/"
						component={role.none ? Login : Dashboard}
					/> */}

					{!role.none && (
						<Route path="/assignment/:id" component={Assignment} />
					)}
					{!role.none && (
						<Route path="/student/:id" component={Student} />
					)}

					{role.staff && (
						<Route path="/class/:id" component={Class} />
					)}
					{role.staff && (
						<Container>
							<Route
								path="/createAssignment"
								component={CreateAssignment}
							/>
						</Container>
					)}
					<Route path="/login" component={Login} />
					{/* {role.none && <Redirect from="/" to="/login" />} */}
					{/* <Route component={NotFound} /> */}
				</Switch>
			{/* </Container> */}
		</BrowserRouter>
	);
};

export default App;
