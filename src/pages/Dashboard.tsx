import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { Category, Department, Employee, ExternalEntity, Group, Profession, Zone } from "../types/Types";
import { Bar } from 'react-chartjs-2';
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';
import '../css/PagesStyles.css';

Chart.register(BarController, BarElement, CategoryScale, LinearScale);

export const Dashboard = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [externalEntities, setExternalEntities] = useState<ExternalEntity[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [zones, setZones] = useState<Zone[]>([]);
    const [professions, setProfessions] = useState<Profession[]>([]);

    const fetchEmployees = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Employees', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching employees');
                }
                return response.json();
            })
            .then(data => {
                setEmployees(data);
            })
            .catch(error => console.error('Error fetching the employees', error));
    };

    const fetchDepartments = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Departaments', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching departments data');
                }
                return response.json();
            })
            .then(data => {
                setDepartments(data);
            })
            .catch(error => console.error('Error fetching the departments', error));
    };

    const fetchGroups = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Groups', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching groups data');
                }
                return response.json();
            })
            .then(data => {
                setGroups(data);
            })
            .catch(error => console.error('Error fetching the groups', error));
    };

    const fetchCategories = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Categories', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching categories data');
                }
                return response.json();
            })
            .then(data => {
                setCategories(data);
            })
            .catch(error => console.error('Error fetching the categories', error));
    };

    const fetchProfessions = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Professions', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching professions data');
                }
                return response.json();
            })
            .then(data => {
                setProfessions(data);
            })
            .catch(error => console.error('Error fetching the professions', error));
    };

    const fetchZones = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/Zones', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching zones data');
                }
                return response.json();
            })
            .then(data => {
                setZones(data);
            })
            .catch(error => console.error('Error fetching the zones', error));
    };

    const fetchExternalEntities = () => {
        const token = localStorage.getItem('token');

        fetch('https://localhost:7129/api/ExternalEntities', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching external entities data');
                }
                return response.json();
            })
            .then(data => {
                setExternalEntities(data);
            })
            .catch(error => console.error('Error fetching the external entities', error));
    };

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
        fetchExternalEntities();
        fetchGroups();
        fetchProfessions();
        fetchCategories();
        fetchZones();
    }, []);

    return (
        <div>
            <NavBar />
            <div>
                <div className="dashboard-grid">
                    <div>
                        <h2 className="mb-5">Quantidade de Funcionários</h2>
                        {employees && (
                            <div>
                                <div className="mb-4">
                                    <Bar
                                        data={{
                                            labels: ['Employees'],
                                            datasets: [
                                                {
                                                    label: 'Quantidade',
                                                    data: [employees.length],
                                                    backgroundColor: '#6495ed',
                                                    borderColor: '#1976d2',
                                                    borderWidth: 1
                                                }
                                            ]
                                        }}
                                        options={{
                                            indexAxis: 'x',
                                            plugins: {
                                                title: {
                                                    display: false
                                                },
                                                legend: {
                                                    display: false
                                                },
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="mb-5">Quantidade de Departamentos</h2>
                        {departments && (
                            <div>
                                <div className="mb-4">
                                    <Bar
                                        data={{
                                            labels: ['Departments'],
                                            datasets: [
                                                {
                                                    label: 'Quantidade',
                                                    data: [departments.length],
                                                    backgroundColor: '#6495ed',
                                                    borderColor: '#1976d2',
                                                    borderWidth: 1
                                                }
                                            ]
                                        }}
                                        options={{
                                            indexAxis: 'x',
                                            plugins: {
                                                title: {
                                                    display: false
                                                },
                                                legend: {
                                                    display: false
                                                }
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="mb-5">Quantidade de Grupos</h2>
                        {groups && (
                            <div>
                                <div className="mb-4">
                                    <Bar
                                        data={{
                                            labels: ['Groups'],
                                            datasets: [
                                                {
                                                    label: 'Quantidade',
                                                    data: [groups.length],
                                                    backgroundColor: '#6495ed',
                                                    borderColor: '#1976d2',
                                                    borderWidth: 1
                                                }
                                            ]
                                        }}
                                        options={{
                                            indexAxis: 'x',
                                            plugins: {
                                                title: {
                                                    display: false
                                                },
                                                legend: {
                                                    display: false
                                                }
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="mb-5">Quantidade de Categorias</h2>
                        {categories && (
                            <div>
                                <div className="mb-4">
                                    <Bar
                                        data={{
                                            labels: ['Categories'],
                                            datasets: [
                                                {
                                                    label: 'Quantidade',
                                                    data: [categories.length],
                                                    backgroundColor: '#6495ed',
                                                    borderColor: '#1976d2',
                                                    borderWidth: 1
                                                }
                                            ]
                                        }}
                                        options={{
                                            indexAxis: 'x',
                                            plugins: {
                                                title: {
                                                    display: false
                                                },
                                                legend: {
                                                    display: false
                                                }
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="mb-5">Quantidade de Profissões</h2>
                        {professions && (
                            <div>
                                <div className="mb-4">
                                    <Bar
                                        data={{
                                            labels: ['Professions'],
                                            datasets: [
                                                {
                                                    label: 'Quantidade',
                                                    data: [professions.length],
                                                    backgroundColor: '#6495ed',
                                                    borderColor: '#1976d2',
                                                    borderWidth: 1
                                                }
                                            ]
                                        }}
                                        options={{
                                            indexAxis: 'x',
                                            plugins: {
                                                title: {
                                                    display: false
                                                },
                                                legend: {
                                                    display: false
                                                }
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="mb-5">Quantidade de Zonas</h2>
                        {zones && (
                            <div>
                                <div className="mb-4">
                                    <Bar
                                        data={{
                                            labels: ['Zones'],
                                            datasets: [
                                                {
                                                    label: 'Quantidade',
                                                    data: [zones.length],
                                                    backgroundColor: '#6495ed',
                                                    borderColor: '#1976d2',
                                                    borderWidth: 1
                                                }
                                            ]
                                        }}
                                        options={{
                                            indexAxis: 'x',
                                            plugins: {
                                                title: {
                                                    display: false
                                                },
                                                legend: {
                                                    display: false
                                                }
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="mb-5">Quantidade de Entidades Externas</h2>
                        {externalEntities && (
                            <div>
                                <div className="mb-4">
                                    <Bar
                                        data={{
                                            labels: ['External Entities'],
                                            datasets: [
                                                {
                                                    label: 'Quantidade',
                                                    data: [externalEntities.length],
                                                    backgroundColor: '#6495ed',
                                                    borderColor: '#1976d2',
                                                    borderWidth: 1
                                                }
                                            ]
                                        }}
                                        options={{
                                            indexAxis: 'x',
                                            plugins: {
                                                title: {
                                                    display: false
                                                },
                                                legend: {
                                                    display: false
                                                }
                                            },
                                            scales: {
                                                y: {
                                                    beginAtZero: true
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}