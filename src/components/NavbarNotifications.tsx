import { useEffect, useState } from "react";
import { Dropdown, Badge } from "react-bootstrap";
import mail from "../assets/img/navbar/navbar/mail.svg";

export function NavbarNotifications() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotificationsDropdown, setShowNotificationsDropdown] =
    useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

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
    setLoadingNotifications(true);
    const token = localStorage.getItem("token");
    const url = `${
      process.env.REACT_APP_WS_DOOR
    }/notifications?access_token=${encodeURIComponent(token!)}`;
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log("Conexão WebSocket aberta.");
      setLoadingNotifications(false);
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
      setLoadingNotifications(false);
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

  return (
    <Dropdown
      onMouseEnter={() => setShowNotificationsDropdown(true)}
      onMouseLeave={() =>
        setTimeout(() => {
          setShowNotificationsDropdown(false);
        }, 200)
      }
      show={showNotificationsDropdown}
      className="dropdown-icon"
      id="dropdown-navbar"
    >
      <Dropdown.Toggle
        id="dropdown-basic-notifications"
        className="btn btn-light navbar-buttons"
        style={{ marginLeft: 5 }}
      >
        <span
          className="icon"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
          minWidth: "300px",
        }}
      >
        {loadingNotifications ? (
          <Dropdown.Item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
          </Dropdown.Item>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <Dropdown.Item
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              style={{
                backgroundColor: notification.read ? "transparent" : "#0050a0",
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