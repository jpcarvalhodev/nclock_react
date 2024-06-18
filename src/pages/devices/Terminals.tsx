import { useEffect, useState } from "react";
import { CustomOutlineButton } from "../../components/CustomOutlineButton";
import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";
import DataTable, { TableColumn } from "react-data-table-component";
import { customStyles } from "../../components/CustomStylesDataTable";
import "../../css/Terminals.css";
import { Button, Form, Tab, Tabs } from "react-bootstrap";
import { SelectFilter } from "../../components/SelectFilter";
import { Devices, Employee } from "../../helpers/Types";
import { deviceFields, employeeFields } from "../../helpers/Fields";
import { fetchWithAuth } from "../../components/FetchWithAuth";
import { ColumnSelectorModal } from "../../modals/ColumnSelectorModal";

// Define a interface para os filtros
interface Filters {
    [key: string]: string;
}

export const Terminals = () => {
    const [devices, setDevices] = useState<Devices[]>([]);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [mainTabKey, setMainTabKey] = useState('tasks');
    const [userTrackTabKey, setUserTrackTabKey] = useState('users-software');
    const [userTabKey, setUserTabKey] = useState('users');
    const [filters, setFilters] = useState<Filters>({});
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['deviceNumber', 'deviceName', 'ipAddress']);
    const [selectedUserColums, setSelectedUserColumns] = useState<string[]>(['enrollNumber', 'employeeName', 'cardNumber', 'statusFprint', 'statusFace']);
    const [selectedDevices, setSelectedDevices] = useState<Devices[]>([]);
    const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
    const [selectedDeviceToDelete, setSelectedDeviceToDelete] = useState<string>('');
    const [showUpdateDeviceModal, setShowUpdateDeviceModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showColumnSelector, setShowColumnSelector] = useState(false);
    const [resetSelection, setResetSelection] = useState(false);
    const [selectedDeviceRows, setSelectedDeviceRows] = useState<Devices[]>([]);
    const [selectedUserRows, setSelectedUserRows] = useState<Employee[]>([]);

    // Função para buscar todos os dispositivos
    const fetchAllDevices = async () => {
        try {
            const response = await fetchWithAuth('Zkteco/GetAllDevices');
            if (!response.ok) {
                return;
            }
            const data = await response.json();
            setDevices(data);
        } catch (error) {
            console.error('Erro ao buscar assiduidades:', error);
        }
    };

    // Função para buscar todos os utilizadores
    const fetchAllEmployees = async () => {
        try {
            const response = await fetchWithAuth('Employees/GetAllEmployees');
            if (!response.ok) {
                return;
            }
            const employeesData = await response.json();
            setEmployees(employeesData);
        } catch (error) {
            console.error('Erro ao buscar funcionários:', error);
        }
    }

    // Atualiza os dados de renderização
    useEffect(() => {
        fetchAllDevices();
        fetchAllEmployees();
    }, []);

    // Atualiza a seleção ao resetar
    useEffect(() => {
        if (resetSelection) {
            setResetSelection(false);
        }
    }, [resetSelection]);

    // Função para atualizar tudo
    const refreshAll = () => {
        fetchAllDevices();
    };

    // Função para resetar as colunas
    const handleResetColumns = () => {
        setSelectedColumns(['deviceNumber', 'deviceName', 'ipAddress']);
    };

    const handleMainSelect = (k: string | null) => {
        if (k) {
            setMainTabKey(k);
        }
    };

    const handleUserTrackSelect = (k: string | null) => {
        if (k) {
            setUserTrackTabKey(k);
        }
    };

    const handleUserSelect = (k: string | null) => {
        if (k) {
            setUserTabKey(k);
        }
    };

    // Função para alternar a visibilidade das colunas
    const handleColumnToggle = (columnKey: string) => {
        if (selectedColumns.includes(columnKey)) {
            setSelectedColumns(selectedColumns.filter(key => key !== columnKey));
        } else {
            setSelectedColumns([...selectedColumns, columnKey]);
        }
    };

    // Função para selecionar todas as colunas
    const handleSelectAllColumns = () => {
        const allColumnKeys = deviceFields.map(field => field.key);
        setSelectedColumns(allColumnKeys);
    };

    // Define a função de seleção de linhas de dispositivos
    const handleDeviceRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Devices[];
    }) => {
        setSelectedDeviceRows(state.selectedRows);
    };

    // Define a função de seleção de linhas de utilizadores
    const handleUserRowSelected = (state: {
        allSelected: boolean;
        selectedCount: number;
        selectedRows: Employee[];
    }) => {
        setSelectedUserRows(state.selectedRows);
    };

    // Função para formatar a data e a hora
    function formatDateAndTime(input: string | Date): string {
        const date = typeof input === 'string' ? new Date(input) : input;
        const options: Intl.DateTimeFormatOptions = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        };
        return new Intl.DateTimeFormat('pt-PT', options).format(date);
    }

    // Define as colunas de dispositivos
    const deviceColumns: TableColumn<Devices>[] = deviceFields
        .filter(field => selectedColumns.includes(field.key))
        .map(field => {
            const formatField = (row: Devices) => {
                switch (field.key) {
                    case 'productTime':
                        return formatDateAndTime(row[field.key]);
                    default:
                        return row[field.key];
                }
            };
            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={devices} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela de dispositivos
    const filteredDeviceDataTable = devices.filter(device =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(device[key]) === String(filters[key])
        )
    );

    // Define as colunas de utilizadores
    const userColumns: TableColumn<Employee>[] = employeeFields
        .filter(field => selectedUserColums.includes(field.key))
        .map(field => {
            const formatField = (row: Employee) => {
                switch (field.key) {
                    case 'birthday':
                        return row.birthday ? formatDateAndTime(row[field.key]) : '';
                    case 'status':
                        return row.status ? 'Activo' : 'Inactivo';
                    case 'statusEmail':
                        return row.statusEmail ? 'Activo' : 'Inactivo';
                    case 'rgpdAut':
                        return row.rgpdAut ? 'Autorizado' : 'Não Autorizado';
                    case 'departmentId':
                        return row.departmentName || '';
                    case 'professionId':
                        return row.professionName || '';
                    case 'categoryId':
                        return row.categoryName || '';
                    case 'groupId':
                        return row.groupName || '';
                    case 'zoneId':
                        return row.zoneName || '';
                    case 'externalEntityId':
                        return row.externalEntityName || '';
                    default:
                        return row[field.key] || '';
                }
            };

            return {
                name: (
                    <>
                        {field.label}
                        <SelectFilter column={field.key} setFilters={setFilters} data={employees} />
                    </>
                ),
                selector: row => formatField(row),
                sortable: true,
            };
        });

    // Filtra os dados da tabela
    const filteredUserDataTable = employees.filter(employee =>
        Object.keys(filters).every(key =>
            filters[key] === "" || String(employee[key]) === String(filters[key])
        )
    );

    // Define as opções de paginação de EN para PT
    const paginationOptions = {
        rowsPerPageText: 'Linhas por página',
        rangeSeparatorText: 'de',
    };

    // Define a função de abertura do modal de edição dos dispositivos
    const handleEditDevices = (row: Devices[]) => {
        setSelectedDevices(row);
        setShowUpdateDeviceModal(true);
    };

    // Define a função de abertura do modal de edição dos utilizadores
    const handleEditUsers = (row: Employee[]) => {
        setSelectedEmployees(row);
        setShowUpdateDeviceModal(true);
    };

    // Define a função de abertura do modal de exclusão dos dispositivos
    const handleOpenDeleteModal = (Id: string) => {
        setSelectedDeviceToDelete(Id);
        setShowDeleteModal(true);
    };

    // Define as colunas de ação de dispositivos
    const devicesActionColumn: TableColumn<Devices> = {
        name: 'Ações',
        cell: (row: Devices) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditDevices([row])} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.zktecoDeviceID)}>
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Devices) => row.employeeID,
        ignoreRowClick: true,
    };

    // Define as colunas de ação de utilizadores
    const userActionColumn: TableColumn<Employee> = {
        name: 'Ações',
        cell: (row: Employee) => (
            <div style={{ display: 'flex' }}>
                <CustomOutlineButton icon='bi bi-pencil-fill' onClick={() => handleEditUsers([row])} />
                <Button className='delete-button' variant="outline-danger" onClick={() => handleOpenDeleteModal(row.employeeID)}>
                    <i className="bi bi-trash-fill"></i>
                </Button>{' '}
            </div>
        ),
        selector: (row: Employee) => row.employeeID,
        ignoreRowClick: true,
    };

    return (
        <div className="main-container">
            <NavBar />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span>Terminais</span>
                </div>
                <div className="datatable-header">
                    <div className="buttons-container-others">
                        <CustomOutlineButton icon="bi-arrow-clockwise" onClick={refreshAll} />
                        <CustomOutlineButton icon="bi-plus" onClick={() => setShowAddModal(true)} iconSize='1.1em' />
                        <CustomOutlineButton icon="bi-eye" onClick={() => setShowColumnSelector(true)} iconSize='1.1em' />
                    </div>
                </div>
            </div>
            <div className="content-section" style={{ display: 'flex', flex: 1 }}>
                <div style={{ flex: 1, overflow: "auto" }}>
                    <DataTable
                        columns={[...deviceColumns, devicesActionColumn]}
                        data={filteredDeviceDataTable}
                        //onRowDoubleClicked={handleEditDepartment}
                        pagination
                        paginationComponentOptions={paginationOptions}
                        selectableRows
                        onSelectedRowsChange={handleDeviceRowSelected}
                        selectableRowsHighlight
                        noDataComponent="Não há dados disponíveis para exibir."
                        customStyles={customStyles}
                    />
                </div>
                <div style={{ flex: 2, overflow: "auto" }}>
                    <Tabs
                        id="controlled-tab-terminals"
                        activeKey={mainTabKey}
                        onSelect={handleMainSelect}
                        className="nav-modal"
                        style={{ marginBottom: 10 }}
                    >
                        <Tab eventKey="tasks" title="Actividade">
                            <p>DATATABLE DE TAREFAS</p>
                            {/* <DataTable
                                columns={[...tableColumns, actionColumn]}
                                data={filteredDataTable}
                                onRowDoubleClicked={handleEditDepartment}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                noDataComponent="Não há dados disponíveis para exibir."
                                customStyles={customStyles}
                            /> */}
                            <p>DATATABLE DE ACTIVIDADE</p>
                            {/* <DataTable
                                columns={[...tableColumns, actionColumn]}
                                data={filteredDataTable}
                                onRowDoubleClicked={handleEditDepartment}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                noDataComponent="Não há dados disponíveis para exibir."
                                customStyles={customStyles}
                            /> */}
                        </Tab>
                        <Tab eventKey="user-track" title="Manutenção de utilizadores">
                            <Tabs
                                id="controlled-tab-terminals-user-track"
                                activeKey={userTrackTabKey}
                                onSelect={handleUserTrackSelect}
                                className="nav-modal"
                                style={{ marginBottom: 10 }}
                            >
                                <Tab eventKey="users-software" title="Utilizadores no software">
                                    <div style={{ display: "flex" }}>
                                        <div style={{ overflowX: "auto", flex: 5 }}>
                                            <DataTable
                                                columns={[...userColumns, userActionColumn]}
                                                data={filteredUserDataTable}
                                                pagination
                                                paginationComponentOptions={paginationOptions}
                                                selectableRows
                                                onSelectedRowsChange={handleUserRowSelected}
                                                selectableRowsHighlight
                                                noDataComponent="Não há dados disponíveis para exibir."
                                                customStyles={customStyles}
                                            />
                                        </div>
                                        <div style={{ flex: 1, flexDirection: "column" }}>
                                            <Button variant="outline-primary" size="sm" className="button-terminals-users-track">
                                                <i className="bi bi-person-fill-up" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                                Enviar utilizadores seleccionados
                                            </Button>
                                            <Button variant="outline-primary" size="sm" className="button-terminals-users-track">
                                                <i className="bi bi-person-x-fill" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                                Remover utilizadores seleccionados
                                            </Button>
                                            <Button variant="outline-primary" size="sm" className="button-terminals-users-track">
                                                <i className="bi bi-person-fill-down" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                                Recolher utilizadores seleccionados
                                            </Button>
                                        </div>
                                    </div>
                                </Tab>
                                <Tab eventKey="users-terminal" title="Utilizadores no terminal">
                                    <p>DATATABLE DE UTILIZADORES NO TERMINAL</p>
                                    {/* <DataTable
                                    columns={[...tableColumns, actionColumn]}
                                    data={filteredDataTable}
                                    onRowDoubleClicked={handleEditDepartment}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    noDataComponent="Não há dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    /> */}
                                </Tab>
                                <Tab eventKey="facial-taken" title="Biometria recolhida">
                                    <p>DATATABLE DE BIOMETRIA RECOLHIDA</p>
                                    {/* <DataTable
                                    columns={[...tableColumns, actionColumn]}
                                    data={filteredDataTable}
                                    onRowDoubleClicked={handleEditDepartment}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    noDataComponent="Não há dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    /> */}
                                </Tab>
                                <Tab eventKey="cards-taken" title="Cartões recolhidos">
                                    <p>DATATABLE DE CARTÕES RECOLHIDOS</p>
                                    {/* <DataTable
                                    columns={[...tableColumns, actionColumn]}
                                    data={filteredDataTable}
                                    onRowDoubleClicked={handleEditDepartment}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    noDataComponent="Não há dados disponíveis para exibir."
                                    customStyles={customStyles}
                                    /> */}
                                </Tab>
                            </Tabs>
                        </Tab>
                        <Tab eventKey="state" title="Estado">
                            <p>DATATABLE DE ESTADO</p>
                            {/* <DataTable
                                columns={[...tableColumns, actionColumn]}
                                data={filteredDataTable}
                                onRowDoubleClicked={handleEditDepartment}
                                pagination
                                paginationComponentOptions={paginationOptions}
                                noDataComponent="Não há dados disponíveis para exibir."
                                customStyles={customStyles}
                            /> */}
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <div>
                <Tabs
                    id="controlled-tab-terminals-buttons"
                    activeKey={userTabKey}
                    onSelect={handleUserSelect}
                    className="nav-modal"
                    style={{ marginBottom: 10, marginTop: 10 }}
                >
                    <Tab eventKey="users" title="Utilizadores">
                        <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-arrow-down-circle" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Recolher utilizadores
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-arrow-up-circle" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Enviar todos os utilizadores
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-arrow-repeat" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Sincronizar utilizadores
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-arrow-left-right" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Recolher movimentos
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-trash" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Apagar utilizadores
                            </Button>
                            <div className="col-3">
                                <Form.Check type="checkbox" label="Utilizadores" className="mb-2" />
                                <Form.Check type="checkbox" label="Biometria digital" className="mb-2" />
                                <Form.Check type="checkbox" label="Biometria facial" className="mb-2" />
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="onOff" title="Ligação">
                        <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-power" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Ligar
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-bootstrap-reboot" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Reiniciar
                            </Button>
                        </div>
                    </Tab>
                    <Tab eventKey="access" title="Acessos">
                        <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-clock-history" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Enviar horários
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-door-open" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Abrir porta
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-pc" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Actualizar multiverificação
                            </Button>
                        </div>
                    </Tab>
                    <Tab eventKey="configuration" title="Configurações">
                        <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-calendar-check" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Acertar a hora
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-gear-wide" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Enviar configurações
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-send-arrow-up" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Enviar códigos de tarefas
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-bell" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Sincronizar toques da sirene
                            </Button>
                        </div>
                    </Tab>
                    <Tab eventKey="files" title="Ficheiros">
                        <div style={{ display: "flex", marginTop: 10, marginBottom: 10, padding: 10 }}>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-arrow-bar-down" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Importar movimentos
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-person-fill-down" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Importar utilizadores
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-fingerprint" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Importar biometria digital
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-file-arrow-down" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Importar movimentos do log
                            </Button>
                            <Button variant="outline-primary" size="sm" className="button-terminals-users">
                                <i className="bi bi-files-alt" style={{ marginRight: 5, fontSize: '1rem' }}></i>
                                Importar movimentos do log (auto)
                            </Button>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <Footer />
            {showColumnSelector && (
                <ColumnSelectorModal
                    columns={deviceFields}
                    selectedColumns={selectedColumns}
                    onClose={() => setShowColumnSelector(false)}
                    onColumnToggle={handleColumnToggle}
                    onResetColumns={handleResetColumns}
                    onSelectAllColumns={handleSelectAllColumns}
                />
            )}
        </div>
    );
};