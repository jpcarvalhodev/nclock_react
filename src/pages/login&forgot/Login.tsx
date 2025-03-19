import { Link, useNavigate } from "react-router-dom";
import "../../css/Login.css";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";

import * as apiService from "../../api/apiService";
import hidepass from "../../assets/img/login/hidepass.png";
import showpass from "../../assets/img/login/showpass.png";
import profileAvatar from "../../assets/img/navbar/navbar/profileAvatar.png";
import no_entity from "../../assets/img/navbar/no_entity.png";
import { CustomSpinner } from "../../components/CustomSpinner";
import { fetchWithoutAuth } from "../../components/FetchWithoutAuth";
import { useAds } from "../../context/AdsContext";
import { useEntity } from "../../context/EntityContext";
import { useKiosk } from "../../context/KioskContext";
import { useLicense } from "../../context/LicenseContext";
import { useAttendance } from "../../context/MovementContext";

import { useNavbar } from "../../context/NavbarContext";
import { usePersons } from "../../context/PersonsContext";
import { useTerminals } from "../../context/TerminalsContext";
import { LoginLicenseModal } from "../../modals/LoginLicenseModal";
import { License, LicenseKey } from "../../types/Types";
import { LoadingModal } from "../../modals/LoadingModal";

// Define a interface para os itens de campo
type FormControlElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

// Interface para o usuário
type User = {
  username: string;
  entidadeNif: number;
  password: string;
};

// Define a página de login
export const Login = () => {
  const navigate = useNavigate();
  const { fetchAds } = useAds();
  const { fetchAllEntity, fetchAllLoginLogs, fetchAllHistoryLogs, fetchAllHistoryLogsNoPagination, fetchAllLoginLogsNoPagination } = useEntity();
  const { fetchAllLicensesWithoutKey } = useLicense();
  const { fetchAllAttendances, fetchAllInitialAccessesbyDevice, fetchAllAccessesbyDevice } = useAttendance();
  const { registeredUsers, fetchAllData, fetchAllEmployees, fetchAllDepartments, fetchAllGroups, fetchAllRegisteredUsers, fetchAllCardData, fetchAllCategories, fetchAllExternalEntitiesData, fetchAllProfessions, fetchAllZones, fetchAllDisabledEmployees, fetchAllEmployeesNoPagination, fetchAllDisabledEmployeesNoPagination, fetchEmployeeVisitor, fetchVisitorsMotive } = usePersons();
  const { fetchAllDevices, fetchAllMBDevices, fetchAccessControl, fetchAllMBCloseOpen, fetchTimePeriods, fetchAllDoorData, fetchAllAux, fetchAllAuxData, fetchTimePlans, fetchCameras, fetchEventsDevice, fetchEventsAndTransactionDevice, fetchDeviceActivities } = useTerminals();
  const { fetchAllCoin, fetchAllCounter, fetchAllLimpezas, fetchAllManualOpen, fetchAllMoveCard, fetchAllMoveKiosk, fetchAllMoveVP, fetchAllOcorrencias, fetchAllPayCoins, fetchAllPayTerminal, fetchAllTasks, fetchAllMBAndCoin, fetchAllCardAndKiosk, fetchAllChartData } = useKiosk();
  const { fetchEmailConfig, fetchKioskConfig } = useNavbar();
  const [username, setUsername] = useState("");
  const [entityLogo, setEntityLogo] = useState<string>(no_entity);
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [company, setCompany] = useState<License[]>([]);
  const [selectedNif, setSelectedNif] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  // Obter a imagem do perfil do usuário
  useEffect(() => {
    const profileImage = localStorage.getItem('profileImage');
    if (!profileImage || profileImage === 'null') {
      setProfileImage(profileAvatar);
    } else {
      setProfileImage(profileImage);
    }
  }, []);

  // Função para buscar as licenças
  const fetchLicenseData = async () => {
    try {
      const data = await apiService.fetchLicensesWithoutKey();
      setCompany(data);
      setSelectedNif(Number(data[0].nif));
    } catch (error) {
      console.error("Erro ao buscar licenças:", error);
    }
  }

  // Função para obter a imagem da entidade
  const fetchLogo = async (selectedNif: number) => {
    try {
      const data = await apiService.fetchCompanyLogo(selectedNif);
      setEntityLogo(URL.createObjectURL(data));
    } catch (error) {
      console.error("Erro:", error);
      setEntityLogo(no_entity);
    }
  };

  // Obtém os dados da entidade selecionada ao montar o componente
  useEffect(() => {
    fetchLicenseData();
  }, []);

  // Obtém o logo da entidade selecionada ao montar o componente
  useEffect(() => {
    fetchLogo(selectedNif);
  }, [selectedNif]);

  // Verifica se o usuário já está logado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      const savedUsername = localStorage.getItem("rememberMeUser");
      const savedNif = localStorage.getItem("rememberMeNif");
      const savedPassword = localStorage.getItem("rememberMePassword");
      if (savedUsername && savedNif && savedPassword) {
        setUsername(savedUsername);
        setSelectedNif(Number(savedNif));
        setPassword(savedPassword);
        setRememberMe(true);
      }
    }
  }, [navigate]);

  // Função atualizada para setar o NIF junto com o nome da empresa
  const handleCompanyChange = (
    event: React.ChangeEvent<FormControlElement>
  ) => {
    const selectedLicense = company.find(
      (license: License) => license.name === event.target.value
    );
    if (selectedLicense) {
      fetchLogo(Number(selectedLicense.nif));
      setSelectedNif(Number(selectedLicense.nif));
      setCompanyName(selectedLicense.name);
    } else {
      setEntityLogo(no_entity);
      setSelectedNif(0);
      setCompanyName("");
    }
  };

  // Função para inserir a chave de licença
  const insertLicenseKey = async (licenseKey: Partial<LicenseKey>) => {
    try {
      const data = await apiService.importLicense(licenseKey);
      if (data.success) {
        toast.success(data.message || "Chave inserida com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao inserir chave:", error);
    } finally {
      setShowModal(false);
      window.location.reload();
    }
  };

  // Função para fazer login
  const handleLoginFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const user: User = {
      username,
      entidadeNif: selectedNif,
      password,
    };

    try {
      const response = await fetchWithoutAuth("Authentication/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.status === 401) {
        toast.error("Dados incorretos. Tente novamente.");
      } else if (!response.ok) {
        const data = await response.json();
        toast.error(data.message || "Erro ao fazer login. Tente novamente.");
        throw new Error();
      } else {
        const data = await response.json();

        localStorage.setItem("token", data.response.token);
        localStorage.setItem("username", username);
        localStorage.setItem("nif", selectedNif.toString());

        if (rememberMe) {
          localStorage.setItem("rememberMeUser", username);
          localStorage.setItem("rememberMeNif", selectedNif.toString());
          localStorage.setItem("rememberMePassword", password);
        } else {
          localStorage.removeItem("rememberMeUser");
          localStorage.removeItem("rememberMeNif");
          localStorage.removeItem("rememberMePassword");
        }

        setLoading(true);
        try {
          await Promise.all([
            fetchAllLicensesWithoutKey(),
            fetchAllDevices(),
            fetchAllData(),
            fetchAllEmployees(),
            fetchAllDisabledEmployees(),
            fetchAllEmployeesNoPagination(),
            fetchAllDisabledEmployeesNoPagination(),
            fetchEmployeeVisitor(),
            fetchVisitorsMotive(),
            fetchAllDepartments(),
            fetchAllGroups(),
            fetchAllRegisteredUsers(),
            fetchAllCardData(),
            fetchAllCategories(),
            fetchAllExternalEntitiesData(),
            fetchAllProfessions(),
            fetchAllZones(),
            fetchAds(),
            fetchAllEntity(),
            fetchAllLoginLogsNoPagination(),
            fetchAllLoginLogs(undefined, undefined, undefined, "1", "20"),
            fetchAllHistoryLogsNoPagination(),
            fetchAllHistoryLogs(undefined, undefined, undefined, "1", "20"),
            fetchAllAttendances(),
            fetchAllInitialAccessesbyDevice(undefined, undefined, undefined, "1", "20"),
            fetchAllAccessesbyDevice(),
            fetchAllMBDevices(),
            fetchAccessControl(),
            fetchAllMBCloseOpen(),
            fetchTimePeriods(),
            fetchAllDoorData(),
            fetchAllAux(),
            fetchAllAuxData(),
            fetchTimePlans(),
            fetchAllCoin(),
            fetchAllCounter(),
            fetchAllLimpezas(),
            fetchAllManualOpen(),
            fetchAllMoveCard(undefined, "3", undefined, undefined, undefined, undefined, undefined),
            fetchAllMoveKiosk(undefined, "4", undefined, undefined, undefined, undefined, undefined),
            fetchAllMoveVP(),
            fetchAllOcorrencias(),
            fetchAllPayCoins("2", undefined, undefined, undefined, undefined, undefined),
            fetchAllPayTerminal(),
            fetchAllMBAndCoin(),
            fetchAllCardAndKiosk(["3", "4"], undefined, undefined, undefined, undefined, undefined, undefined),
            fetchAllChartData(),
            fetchEmailConfig(),
            fetchKioskConfig(),
            fetchAllTasks(),
            fetchCameras(),
            fetchEventsDevice(),
            fetchEventsAndTransactionDevice(),
            fetchDeviceActivities(),
          ]);
          setLoading(false);
          toast.info(`Seja bem vindo ${username.toUpperCase()} aos Nsoftwares do NIDGROUP`);
          navigate("/dashboard");
          const userName = localStorage.getItem('username');
          const checkUser = registeredUsers.filter(user => user.userName === userName)
          if (checkUser) {
            localStorage.setItem('profileImage', checkUser[0].profileImage);
          }
        } catch (error) {
          console.error("Erro ao carregar dados após o login:", error);
        }
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Alterna a visibilidade da password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Função para truncar texto
  const truncateText = (text: string, limit: number) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <div className="background-login">
      <div className="div-logo-p" id="logo-login">
        <img className="logo-login" src="/logo_login.png" alt="Logo Login" />
      </div>
      <div className="login-container" id="login">
        <form className="form-login-entity">
          <div className="header-entity">
            <p style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              NIDGROUP - Business Solutions
            </p>
            <a style={{ fontSize: 10, marginTop: 7, color: 'white', textDecoration: 'none' }} href="https://nidgroup.pt/" target="_blank" rel="noopener noreferrer">www.nidgroup.pt</a>
          </div>
          <div className="username-password-labels">
            <Row className="row-username-password">
              <Col className="col-profile-img">
                <div className="image-container">
                  <img
                    className="profile-login-entity"
                    src={entityLogo}
                    alt="foto entidade"
                  />
                </div>
              </Col>
              <Col className="col-username-password">
                <Form.Group controlId="companySelect">
                  <Form.Label className="username-label">
                    Licenciado a Empresa:
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="input-username-password"
                    value={companyName}
                    onChange={handleCompanyChange}
                  >
                    {company.map((license: License, index: number) => (
                      <option key={index} value={license.name}>
                        {truncateText(license.name, 30)}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button
                  className="license-button"
                  variant="outline-light"
                  onClick={() => setShowModal(true)}
                >
                  Licenças
                </Button>
              </Col>
            </Row>
          </div>
          <footer className="footer-entity">
            <div className="language-login">
              <p style={{ fontSize: 10, margin: 0, color: "white" }}>Idioma:</p>
              <Button className="button-language" variant="outline-light">
                PT
              </Button>
            </div>
            <p style={{ fontSize: 10, margin: 0, color: "white" }}>
              Versão Software: {apiService.version}
            </p>
          </footer>
        </form>
        <form
          className="form-login"
          style={{ marginTop: 30 }}
          onSubmit={handleLoginFormSubmit}
        >
          <div className="username-password-labels">
            <Row className="row-username-password">
              <Col className="col-username-password">
                <Form.Group>
                  <Form.Label className="username-label">Nome de Utilizador:</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-username-password"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="password-label">Password:</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-username-password"
                    />
                    <InputGroup.Text
                      style={{
                        cursor: 'pointer',
                        background: 'transparent',
                        border: 'none',
                        marginLeft: '-45px',
                        height: '38px',
                        zIndex: 10
                      }}
                      onClick={togglePasswordVisibility}
                    >
                      <img src={showPassword ? hidepass : showpass} alt={showPassword ? "Esconder password" : "Mostrar password"} style={{ width: 20, height: 20 }} />
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col className="col-profile-img-2">
                <div className="image-container" style={{ borderRadius: '50%' }}>
                  <img
                    className="profile-login"
                    src={profileImage}
                    alt="foto perfil"
                  />
                </div>
              </Col>
            </Row>
          </div>
          <div className="buttons-container">
            <Button variant="outline-light" type="submit">
              Entrar
            </Button>
            <label style={{ color: "white" }}>
              Memorizar?
              <input
                style={{ marginLeft: "10px" }}
                type="checkbox"
                name="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </label>
            <Link style={{ color: "white", textDecoration: 'none' }} to="/login&forgot/forgotpassword">
              Recuperar password?
            </Link>
          </div>
          <footer className="footer-login">
            <p style={{ fontSize: 10, margin: 0, color: "white" }}>
              Developed by NSOFTWARES - Innovative Applications
            </p>
            <p style={{ fontSize: 10, margin: 0, color: "white" }}>
              <a style={{ color: 'white', textDecoration: 'none' }} href="https://nsoftwares.pt/" target="_blank" rel="noopener noreferrer">www.nsoftwares.pt</a>
            </p>
          </footer>
        </form>
      </div>
      <LoginLicenseModal
        title="Inserir Chave"
        open={showModal}
        onClose={() => setShowModal(false)}
        onSave={insertLicenseKey}
      />
      <LoadingModal show={loading} />
    </div>
  );
};