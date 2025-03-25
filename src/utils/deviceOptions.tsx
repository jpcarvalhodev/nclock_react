import c3_100 from "../assets/img/terminais/c3_100.webp";
import c3_200 from "../assets/img/terminais/c3_200.webp";
import c3_400 from "../assets/img/terminais/c3_400.webp";
import inbio160 from "../assets/img/terminais/inbio160.webp";
import inbio260 from "../assets/img/terminais/inbio260.webp";
import inbio460 from "../assets/img/terminais/inbio460.webp";
import nface from "../assets/img/terminais/nface.webp";
import profacex from "../assets/img/terminais/profacex.webp";
import rfid_td from "../assets/img/terminais/rfid_td.webp";
import v5l_td from "../assets/img/terminais/v5l_td.webp";
import rpd001 from "../assets/img/terminais/rpd001.webp";

// Opções de dispositivos
export const deviceOptions = [
    { value: "ac", label: "------------Acessos/Assiduidade------------" },
    { value: "Nface-204_SISNID-1", label: "Nface-204_SISNID-1", img: nface },
    { value: "Relógio de Ponto Digital RPD001", label: "Relógio de Ponto Digital RPD001", img: rpd001 },
    { value: "SISNID-C3-100", label: "SISNID-C3-100", img: c3_100 },
    { value: "SISNID-C3-200", label: "SISNID-C3-200", img: c3_200 },
    { value: "SISNID-C3-400", label: "SISNID-C3-400", img: c3_400 },
    { value: "SISNID-INBIO160", label: "SISNID-INBIO160", img: inbio160 },
    { value: "SISNID-INBIO260", label: "SISNID-INBIO260", img: inbio260 },
    { value: "SISNID-INBIO460", label: "SISNID-INBIO460", img: inbio460 },
    { value: "SISNID-PROFACEX-TD", label: "SISNID-PROFACEX-TD", img: profacex },
    { value: "SpeedFace-RFID-TD", label: "SpeedFace-RFID-TD", img: rfid_td },
    { value: "Speedface-V5L-TD-1", label: "Speedface-V5L-TD-1", img: v5l_td },
    { value: "mb", label: "------------------Multibanco------------------" },
    { value: "Newland U1000", label: "Newland U1000" },
  ];