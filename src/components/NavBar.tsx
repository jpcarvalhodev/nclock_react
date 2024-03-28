import '../css/NavBar.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { Employee } from '../types/Types';
import Nav from 'react-bootstrap/Nav';

interface MyTokenPayload extends JwtPayload {
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': string;
	'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
}

export const NavBar = () => {
	const [user, setUser] = useState({ name: '', email: '' });
	const [employee, setEmployee] = useState<Employee | null>(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const [key, setKey] = useState('home');
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			const decoded = jwtDecode<MyTokenPayload>(token);

			const userName = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
			const userEmail = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

			setUser({ name: userName, email: userEmail });
		}
	}, []);

	useEffect(() => {
		fetch('https://localhost:7129/api/Employees')
			.then(response => response.json())
			.then(data => setEmployee(data))
			.catch(error => console.error('Error:', error));
	}, []);

	const toggleDropdown = () => {
		setShowDropdown(!showDropdown);
	};

	const logout = () => {
		localStorage.removeItem('token');
		navigate('/');
	};

	return (
		<div>
			<Nav variant="tabs" defaultActiveKey="/home">
				<Nav.Item>
					<Nav.Link href="#">Active</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="link-1">Option 2</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey="disabled" disabled>
						Disabled
					</Nav.Link>
				</Nav.Item>
			</Nav>
		</div>
	);
};
