import { useNavigate, Link } from "react-router-dom";
import "../../css/Login.css";
import { useEffect, useState } from "react";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { fetchWithoutAuth } from "../../components/FetchWithoutAuth";
import profileAvatar from "../../assets/img/navbar/navbar/profileAvatar.png";
import no_entity from "../../assets/img/navbar/no_entity.png";
import hidepass from "../../assets/img/login/hidepass.png";
import showpass from "../../assets/img/login/showpass.png";
import * as apiService from "../../helpers/apiService";
import { License, LicenseKey } from "../../helpers/Types";
import { LoginLicenseModal } from "../../modals/LoginLicenseModal";
import { useAds } from "../../context/AdsContext";
import { useEntity } from "../../context/EntityContext";
import { useAttendance } from "../../context/MovementContext";
import { useLicense } from "../../context/LicenseContext";
import { usePersons } from "../../context/PersonsContext";
import { useTerminals } from "../../context/TerminalsContext";

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
  const { fetchAllEntity } = useEntity();
  const { fetchAllLicensesWithoutKey } = useLicense();
  const { fetchAllAttendances } = useAttendance();
  const { fetchAllEmployees, fetchAllDepartments, fetchAllGroups, fetchAllRegisteredUsers, fetchAllCardData } = usePersons();
  const { fetchAllDevices, fetchAllMBDevices } = useTerminals();
  const [username, setUsername] = useState("");
  const [entityLogo, setEntityLogo] = useState<string>(no_entity);
  const [resizedSrc, setResizedSrc] = useState<string>(no_entity);
  const [companyName, setCompanyName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [company, setCompany] = useState<License[]>([]);
  const [selectedNif, setSelectedNif] = useState<number>(0);
  const [showModal, setShowModal] = useState(false);

  // Função para obter os dados da licença
  const fetchLicenseData = async () => {
    try {
      const data = await apiService.fetchLicensesWithoutKey();
      setCompany(data);
      setSelectedNif(Number(data[0].nif));
      if (!data.ok) {
        console.error("Falha ao obter os dados da licença.");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Função para obter a imagem da entidade
  const fetchLogo = async (selectedNif: number) => {
    try {
      const data = await apiService.fetchCompanyLogo(selectedNif);
      setEntityLogo(URL.createObjectURL(data));
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  // Redimensiona a imagem da entidade
  useEffect(() => {
    const img = new Image();
    img.src = entityLogo;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 512;
      canvas.height = 512;

      const minDimension = Math.min(img.width, img.height);
      const startX = (img.width - minDimension) / 2;
      const startY = (img.height - minDimension) / 2;

      const size = minDimension;

      ctx?.drawImage(img, startX, startY, size, size, 0, 0, canvas.width, canvas.height);

      setResizedSrc(canvas.toDataURL('image/png'));
    };
  }, [entityLogo]);

  // Obtém os dados da licença ao montar o componente
  useEffect(() => {
    fetchLicenseData();
  }, []);

  // Obtém a imagem da entidade selecionada ao montar o componente
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
  const handleCompanyChange = (event: React.ChangeEvent<FormControlElement>) => {
    const selectedLicense = company.find(license => license.name === event.target.value);
    if (selectedLicense) {
      fetchLogo(Number(selectedLicense.nif));
      setSelectedNif(Number(selectedLicense.nif));
      setCompanyName(selectedLicense.name);
    } else {
      setEntityLogo(no_entity);
      setSelectedNif(0);
      setCompanyName('');
    }
  };

  // Função para inserir a chave de licença
  const insertLicenseKey = async (licenseKey: Partial<LicenseKey>) => {
    try {
      const data = await apiService.importLicense(licenseKey);
      toast.success(data.message || "Chave inserida com sucesso!");
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

    if (selectedNif === 0) {
      toast.warn("Selecione uma entidade primeiro!");
      return;
    }

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
        toast.error(data.message || "Erro ao fazer login.");
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

        toast.info(
          `Seja bem vindo ${username.toUpperCase()} aos Nsoftwares do NIDGROUP`
        );

        try {
          await Promise.all([
            fetchAllLicensesWithoutKey(),
            fetchAllEmployees(),
            fetchAllDepartments(),
            fetchAllGroups(),
            fetchAllRegisteredUsers(),
            fetchAllCardData(),
            fetchAds(),
            fetchAllEntity(),
            fetchAllAttendances(),
            fetchAllDevices(),
            fetchAllMBDevices()
          ]);
          navigate("/dashboard");
        } catch (error) {
          console.error('Erro ao carregar dados após o login:', error);
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
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

  return (
    <div className="background-login">
      <div className="div-logo-p">
        <img className="logo-login" src="/logo_login.png" alt="Logo Login" />
      </div>
      <div className="login-container" id="login">
        <form className="form-login-entity">
          <div className="header-entity">
            <p style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              NIDGROUP - Business Solutions
            </p>
            <p style={{ fontSize: 10, marginTop: 7, color: "white" }}>
              www.nidgroup.pt
            </p>
          </div>
          <div className="username-password-labels">
            <Row className="row-username-password">
              <Col className="col-profile-img">
                <div className="image-container">
                  <img
                    className="profile-login-entity"
                    src={resizedSrc}
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
                    {company.map((license, index) => (
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
                <label className="username-label">
                  <p>Nome de Utilizador:</p>
                  <input
                    className="input-username-password"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </label>
                <label className="password-label">
                  <p>Password:</p>
                  <div className="password-input-container">
                    <input
                      className="input-username-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="toggle-password"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <img src={hidepass} alt="esconde password" />
                      ) : (
                        <img src={showpass} alt="mostra password" />
                      )}
                    </button>
                  </div>
                </label>
              </Col>
              <Col className="col-profile-img-2">
                <div className="image-container">
                  <img
                    className="profile-login"
                    src={profileAvatar}
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
              Memorizar dados?
              <input
                style={{ marginLeft: "10px" }}
                type="checkbox"
                name="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            </label>
            <Link style={{ color: "white" }} to="/login&forgot/forgotpassword">
              Recuperar password?
            </Link>
          </div>
          <footer className="footer-login">
            <p style={{ fontSize: 10, margin: 0, color: "white" }}>
              Developed by NIDSOF - Smart Solutions
            </p>
            <p style={{ fontSize: 10, margin: 0, color: "white" }}>
              www.nidsof.pt
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
    </div>
  );
};
