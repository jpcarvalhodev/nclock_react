import { useEffect, useState } from "react";
import { Dropdown, Badge } from "react-bootstrap";
import mail from "../assets/img/navbar/navbar/mail.svg";

export function NavbarNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] =
    useState(false);
  const [loading, setLoading] = useState(false);

  // Conta as notificações não lidas
  const unreadCount = notifications.filter((not) => !not.read).length;

  // Marca a notificação como lida
  const handleNotificationClick = (id: number) => {
    setNotifications((prev) =>
      prev.map((not) => (not.id === id ? { ...not, read: true } : not))
    );
  };

  // Busca as notificações do utilizador
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const url = `${
      process.env.REACT_APP_WS_DOOR
    }/notifications?access_token=${encodeURIComponent(token!)}`;
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("Conexão WebSocket aberta.");
      setLoading(false);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setNotifications((prev) => [...prev, data]);
      } catch (error) {
        console.error("Erro ao processar mensagem WebSocket:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("Erro no WebSocket:", error);
      setLoading(false);
    };

    socket.onclose = () => {
      console.log("Conexão WebSocket fechada.");
    };

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  // Função para abrir o menu
  const handleMouseEnterMenu = () => {
    setShowNotificationsDropdown(true);
  };

  // Função para fechar com delay
  const handleMouseLeaveMenu = () => {
    setTimeout(() => {
      setShowNotificationsDropdown(false);
    }, 200);
  };

  return (
    <Dropdown
      onMouseEnter={handleMouseEnterMenu}
      onMouseLeave={handleMouseLeaveMenu}
      show={showNotificationsDropdown}
      className="dropdown-icon"
      id="dropdown-navbar"
    >
      <Dropdown.Toggle
        id="dropdown-basic-notifications"
        className="btn btn-light navbar-buttons"
        style={{ marginLeft: 5, position: "relative" }}
      >
        <span
          className="icon"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <img
            src={mail}
            alt="botão mensagens"
            style={{ width: 20, height: 20, marginTop: 3 }}
          />
          {unreadCount > 0 && (
            <Badge
              bg="danger"
              pill
              style={{
                position: "absolute",
                top: -5,
                right: -5,
              }}
            >
              {unreadCount}
            </Badge>
          )}
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        align="end"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "300px",
        }}
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Dropdown.Item
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              style={{
                backgroundColor: notification.read ? "transparent" : "#f7f7f7",
              }}
            >
              {notification.title}
            </Dropdown.Item>
          ))
        ) : (
          <Dropdown.Item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Nenhuma nova mensagem
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
