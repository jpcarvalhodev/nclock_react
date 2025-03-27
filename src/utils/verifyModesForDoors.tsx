import { OverlayTrigger, Tooltip } from "react-bootstrap";
import card from "../assets/img/terminais/card.png";
import faceScan from "../assets/img/terminais/faceScan.png";
import fprintScan from "../assets/img/terminais/fprintScan.png";
import key from "../assets/img/terminais/key.png";
import palmScan from "../assets/img/terminais/palmScan.png";
import userId from "../assets/img/terminais/userId.png";
import other from "../assets/img/terminais/other.png";

// Define as seleções de modo de verificação
export const verifyModeOptions = [
  { value: 0, label: "Detetar Automaticamente" },
  { value: 1, label: "Somente Digital" },
  { value: 2, label: "ID Utilizador" },
  { value: 3, label: "Somente Password" },
  { value: 4, label: "Somente Cartão" },
  { value: 5, label: "Digital ou Password" },
  { value: 6, label: "Digital ou Cartão" },
  { value: 7, label: "Cartão ou Password" },
  { value: 8, label: "ID Utilizador + Digital" },
  { value: 9, label: "Digital + Password" },
  { value: 10, label: "Cartão + Digital" },
  { value: 11, label: "Cartão + Password" },
  { value: 12, label: "Digital + Password + Cartão" },
  { value: 13, label: "ID Utilizador + Digital + Password" },
  { value: 14, label: "ID Utilizador + Digital ou Cartão + Password" },
  { value: 15, label: "Face" },
  { value: 16, label: "Face + Digital" },
  { value: 17, label: "Face + Password" },
  { value: 18, label: "Face + Cartão" },
  { value: 19, label: "Face + Digital + Cartão" },
  { value: 20, label: "Face + Digital + Password" },
  { value: 21, label: "Veia Digital" },
  { value: 22, label: "Veia Digital + Password" },
  { value: 23, label: "Veia Digital + Cartão" },
  { value: 24, label: "Veia Digital + Password + Cartão" },
  { value: 25, label: "Palma" },
  { value: 26, label: "Palma + Cartão" },
  { value: 27, label: "Palma + Face" },
  { value: 28, label: "Palma + Digital" },
  { value: 29, label: "Palma + Digital + Face" },
  { value: 200, label: "Outros" },
];

// Função para verificar o modo de verificação e retornar o ícone correspondente
export const getVerificationIcons = (verifyModeNo: number, cardNo: string) => {
  const icons: JSX.Element[] = [];

  switch (verifyModeNo) {
    case 1:
      icons.push(
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 2:
      icons.push(
        <img
          key="id"
          src={userId}
          alt="ID Utilizador"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 3:
      icons.push(
        <img
          key="pwd"
          src={key}
          alt="Password"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 4:
      icons.push(
        <OverlayTrigger
          key="card"
          placement="top"
          overlay={<Tooltip className="custom-tooltip">{cardNo || ""}</Tooltip>}
        >
          <img src={card} alt="Cartão" style={{ width: 20, marginRight: 5 }} />
        </OverlayTrigger>
      );
      break;
    case 5:
      icons.push(
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />,
        <span style={{ marginRight: 5 }}>ou</span>,
        <img
          key="pwd"
          src={key}
          alt="Password"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 6:
      icons.push(
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />,
        <span style={{ marginRight: 5 }}>ou</span>,
        <OverlayTrigger
          key="card"
          placement="top"
          overlay={<Tooltip className="custom-tooltip">{cardNo || ""}</Tooltip>}
        >
          <img src={card} alt="Cartão" style={{ width: 20, marginRight: 5 }} />
        </OverlayTrigger>
      );
      break;
    case 7:
      icons.push(
        <OverlayTrigger
          key="card"
          placement="top"
          overlay={<Tooltip className="custom-tooltip">{cardNo || ""}</Tooltip>}
        >
          <img src={card} alt="Cartão" style={{ width: 20, marginRight: 5 }} />
        </OverlayTrigger>,
        <span style={{ marginRight: 5 }}>ou</span>,
        <img
          key="pwd"
          src={key}
          alt="Password"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 8:
      icons.push(
        <img
          key="id"
          src={userId}
          alt="ID Utilizador"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 9:
      icons.push(
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="pwd"
          src={key}
          alt="Password"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 10:
      icons.push(
        <OverlayTrigger
          key="card"
          placement="top"
          overlay={<Tooltip className="custom-tooltip">{cardNo || ""}</Tooltip>}
        >
          <img src={card} alt="Cartão" style={{ width: 20, marginRight: 5 }} />
        </OverlayTrigger>,
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 11:
      icons.push(
        <OverlayTrigger
          key="card"
          placement="top"
          overlay={<Tooltip className="custom-tooltip">{cardNo || ""}</Tooltip>}
        >
          <img src={card} alt="Cartão" style={{ width: 20, marginRight: 5 }} />
        </OverlayTrigger>,
        <img
          key="pwd"
          src={key}
          alt="Password"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 12:
      icons.push(
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="pwd"
          src={key}
          alt="Password"
          style={{ width: 20, marginRight: 5 }}
        />,
        <OverlayTrigger
          key="card"
          placement="top"
          overlay={<Tooltip className="custom-tooltip">{cardNo || ""}</Tooltip>}
        >
          <img src={card} alt="Cartão" style={{ width: 20, marginRight: 5 }} />
        </OverlayTrigger>
      );
      break;
    case 13:
      icons.push(
        <img
          key="id"
          src={userId}
          alt="ID Utilizador"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="pwd"
          src={key}
          alt="Password"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 14:
      icons.push(
        <img
          key="id"
          src={userId}
          alt="ID Utilizador"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />,
        <span style={{ marginRight: 5 }}>ou</span>,
        <OverlayTrigger
          key="card"
          placement="top"
          overlay={<Tooltip className="custom-tooltip">{cardNo || ""}</Tooltip>}
        >
          <img src={card} alt="Cartão" style={{ width: 20, marginRight: 5 }} />
        </OverlayTrigger>,
        <img
          key="pwd"
          src={key}
          alt="Password"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 15:
      icons.push(
        <img
          key="face"
          src={faceScan}
          alt="Face"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 16:
      icons.push(
        <img
          key="face"
          src={faceScan}
          alt="Face"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 17:
      icons.push(
        <img
          key="face"
          src={faceScan}
          alt="Face"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="pwd"
          src={key}
          alt="Password"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 18:
      icons.push(
        <img
          key="face"
          src={faceScan}
          alt="Face"
          style={{ width: 20, marginRight: 5 }}
        />,
        <OverlayTrigger
          key="card"
          placement="top"
          overlay={<Tooltip className="custom-tooltip">{cardNo || ""}</Tooltip>}
        >
          <img src={card} alt="Cartão" style={{ width: 20, marginRight: 5 }} />
        </OverlayTrigger>
      );
      break;
    case 19:
      icons.push(
        <img
          key="face"
          src={faceScan}
          alt="Face"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />,
        <OverlayTrigger
          key="card"
          placement="top"
          overlay={<Tooltip className="custom-tooltip">{cardNo || ""}</Tooltip>}
        >
          <img src={card} alt="Cartão" style={{ width: 20, marginRight: 5 }} />
        </OverlayTrigger>
      );
      break;
    case 20:
      icons.push(
        <img
          key="face"
          src={faceScan}
          alt="Face"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="pwd"
          src={key}
          alt="Password"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 25:
      icons.push(
        <img
          key="palm"
          src={palmScan}
          alt="Palma"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 26:
      icons.push(
        <img
          key="palm"
          src={palmScan}
          alt="Palma"
          style={{ width: 20, marginRight: 5 }}
        />,
        <OverlayTrigger
          key="card"
          placement="top"
          overlay={<Tooltip className="custom-tooltip">{cardNo || ""}</Tooltip>}
        >
          <img src={card} alt="Cartão" style={{ width: 20, marginRight: 5 }} />
        </OverlayTrigger>
      );
      break;
    case 27:
      icons.push(
        <img
          key="palm"
          src={palmScan}
          alt="Palma"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="face"
          src={faceScan}
          alt="Face"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 28:
      icons.push(
        <img
          key="palm"
          src={palmScan}
          alt="Palma"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 29:
      icons.push(
        <img
          key="palm"
          src={palmScan}
          alt="Palma"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="finger"
          src={fprintScan}
          alt="Digital"
          style={{ width: 20, marginRight: 5 }}
        />,
        <img
          key="face"
          src={faceScan}
          alt="Face"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    case 200:
      icons.push(
        <img
          key="other"
          src={other}
          alt="Outros"
          style={{ width: 20, marginRight: 5 }}
        />
      );
      break;
    default:
      icons.push(<span key="number">{verifyModeNo}</span>);
      break;
  }

  return icons;
};
