import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

import { useCardScroll } from "../context/CardScrollContext";

interface CardContainerProps {
    cards: {
        title: string;
        img: string;
        tab?: string;
    }[];
    handleCardClick: (title: string) => void;
}

export const CardContainer = ({ cards, handleCardClick }: CardContainerProps) => {
    const { scrollPosition, setScrollPosition } = useCardScroll();
    const location = useLocation();
    const cardContainerRef = useRef<HTMLDivElement>(null);
    const [maxVisibleCards, setMaxVisibleCards] = useState(10);
    const [isReady, setIsReady] = useState(false);

    // Checar se o componente está pronto
    useEffect(() => {
        setIsReady(true);
    }, []);

    // Define o tipo CardTitle
    type CardTitle = 'Quiosques' | 'Torniquetes' | 'Vigilância' | 'Alarmes' |
        'Assiduidade' | 'Acessos' | 'Parques' | 'Automatismos' | 'Rondas' | 'Cartões' | 'NSoftwares' |
        'Programação' | 'Sistemas' | 'Aplicativos' | 'Cibernética' | 'Transformação' | 'Integração' |
        'Automação' | 'Equipamentos' | 'Projetos' | 'Contador' | 'Obras' | 'Autocaravanas' | 'Oficinas' |
        'Eventos' | 'Serviços' | 'Tarefas' | 'Produção' | 'Bilhetes' | 'CRM' | 'Faturação' | 'Documental' |
        'Desporto' | 'Ginásios' | 'Escolar' | 'Clínicas' | 'Ópticas' | 'Ourivesarias' |
        'Inteligência' | 'Virtual' | 'Hologramas' | 'Energias' | 'Recarga' | 'Mobilidade' |
        'Multimédia' | 'Incêndios' |
        'Mobiliário' | 'Divisórias' | 'Design' | 'Redes' | 'Electricidade' | 'Iluminação' |
        'Climatização' | 'Áudio' | 'Domótica';

    // Define o objeto tabData
    const tabData: Record<CardTitle, { route: string; tabKey: string; ribbonKey: string }> = {
        Quiosques: { route: '/nkiosk/nkioskdashboard', tabKey: 'showNkioskTab', ribbonKey: 'showNkioskRibbon' },
        Torniquetes: { route: '/nvisitor/nvisitordashboard', tabKey: 'showNvisitorTab', ribbonKey: 'showNvisitorRibbon' },
        Vigilância: { route: '/nview/nviewdashboard', tabKey: 'showNviewTab', ribbonKey: 'showNviewRibbon' },
        Alarmes: { route: '/nsecur/nsecurdashboard', tabKey: 'showNsecurTab', ribbonKey: 'showNsecurRibbon' },
        Assiduidade: { route: '/nclock/nclockdashboard', tabKey: 'showNclockTab', ribbonKey: 'showNclockRibbon' },
        Acessos: { route: '/naccess/naccessdashboard', tabKey: 'showNaccessTab', ribbonKey: 'showNaccessRibbon' },
        Parques: { route: '/npark/nparkdashboard', tabKey: 'showNparkTab', ribbonKey: 'showNparkRibbon' },
        Automatismos: { route: '/ndoor/ndoordashboard', tabKey: 'showNdoorTab', ribbonKey: 'showNdoorRibbon' },
        Rondas: { route: '/npatrol/npatroldashboard', tabKey: 'showNpatrolTab', ribbonKey: 'showNpatrolRibbon' },
        Cartões: { route: '/ncard/ncarddashboard', tabKey: 'showNcardTab', ribbonKey: 'showNcardRibbon' },
        Programação: { route: '/nsoftware/nsoftwaredashboard', tabKey: 'showNsoftwareTab', ribbonKey: 'showNsoftwareRibbon' },
        Sistemas: { route: '/nsystem/nsystemdashboard', tabKey: 'showNsystemTab', ribbonKey: 'showNsystemRibbon' },
        Aplicativos: { route: '/napp/nappdashboard', tabKey: 'showNappTab', ribbonKey: 'showNappRibbon' },
        Cibernética: { route: '/ncyber/ncyberdashboard', tabKey: 'showNcyberTab', ribbonKey: 'showNcyberRibbon' },
        Transformação: { route: '/ndigital/ndigitaldashboard', tabKey: 'showNdigitalTab', ribbonKey: 'showNdigitalRibbon' },
        Integração: { route: '/nserver/nserverdashboard', tabKey: 'showNserverTab', ribbonKey: 'showNserverRibbon' },
        Automação: { route: '/naut/nautdashboard', tabKey: 'showNautTab', ribbonKey: 'showNautRibbon' },
        Equipamentos: { route: '/nequip/nequipdashboard', tabKey: 'showNequipTab', ribbonKey: 'showNequipRibbon' },
        Projetos: { route: '/nproject/nprojectdashboard', tabKey: 'showNprojectTab', ribbonKey: 'showNprojectRibbon' },
        Contador: { route: '/ncount/ncountdashboard', tabKey: 'showNcountTab', ribbonKey: 'showNcountRibbon' },
        Obras: { route: '/nbuild/nbuilddashboard', tabKey: 'showNbuildTab', ribbonKey: 'showNbuildRibbon' },
        Autocaravanas: { route: '/ncaravan/ncaravandashboard', tabKey: 'showNcaravanTab', ribbonKey: 'showNcaravanRibbon' },
        Oficinas: { route: '/nmechanic/nmechanicdashboard', tabKey: 'showNmechanicTab', ribbonKey: 'showNmechanicRibbon' },
        Eventos: { route: '/nevents/neventsdashboard', tabKey: 'showNeventsTab', ribbonKey: 'showNeventsRibbon' },
        Serviços: { route: '/nservice/nservicedashboard', tabKey: 'showNserviceTab', ribbonKey: 'showNserviceRibbon' },
        Tarefas: { route: '/ntask/ntaskdashboard', tabKey: 'showNtaskTab', ribbonKey: 'showNtaskRibbon' },
        Produção: { route: '/nproduction/nproductiondashboard', tabKey: 'showNproductionTab', ribbonKey: 'showNproductionRibbon' },
        Bilhetes: { route: '/nticket/nticketdashboard', tabKey: 'showNticketTab', ribbonKey: 'showNticketRibbon' },
        CRM: { route: '/nsales/nsalesdashboard', tabKey: 'showNsalesTab', ribbonKey: 'showNsalesRibbon' },
        Faturação: { route: '/ninvoice/ninvoicedashboard', tabKey: 'showNinvoiceTab', ribbonKey: 'showNinvoiceRibbon' },
        Documental: { route: '/ndoc/ndocdashboard', tabKey: 'showNdocTab', ribbonKey: 'showNdocRibbon' },
        Desporto: { route: '/nsports/nsportsdashboard', tabKey: 'showNsportsTab', ribbonKey: 'showNsportsRibbon' },
        Ginásios: { route: '/ngym/ngymdashboard', tabKey: 'showNgymTab', ribbonKey: 'showNgymRibbon' },
        Escolar: { route: '/nschool/nschooldashboard', tabKey: 'showNschoolTab', ribbonKey: 'showNschoolRibbon' },
        Clínicas: { route: '/nclinic/nclinicdashboard', tabKey: 'showNclinicTab', ribbonKey: 'showNclinicRibbon' },
        Ópticas: { route: '/noptics/nopticsdashboard', tabKey: 'showNopticsTab', ribbonKey: 'showNopticsRibbon' },
        Ourivesarias: { route: '/ngold/ngolddashboard', tabKey: 'showNgoldTab', ribbonKey: 'showNgoldRibbon' },
        Inteligência: { route: '/nsmart/nsmartdashboard', tabKey: 'showNsmartTab', ribbonKey: 'showNsmartRibbon' },
        Virtual: { route: '/nreality/nrealitydashboard', tabKey: 'showNrealityTab', ribbonKey: 'showNrealityRibbon' },
        Hologramas: { route: '/nhologram/nhologramdashboard', tabKey: 'showNhologramTab', ribbonKey: 'showNhologramRibbon' },
        Energias: { route: '/npower/npowerdashboard', tabKey: 'showNpowerTab', ribbonKey: 'showNpowerRibbon' },
        Recarga: { route: '/ncharge/nchargedashboard', tabKey: 'showNchargeTab', ribbonKey: 'showNchargeRibbon' },
        Mobilidade: { route: '/ncity/ncitydashboard', tabKey: 'showNcityTab', ribbonKey: 'showNcityRibbon' },
        Multimédia: { route: '/nled/nleddashboard', tabKey: 'showNledTab', ribbonKey: 'showNledRibbon' },
        Incêndios: { route: '/nfire/nfiredashboard', tabKey: 'showNfireTab', ribbonKey: 'showNfireRibbon' },
        Mobiliário: { route: '/nfurniture/nfurnituredashboard', tabKey: 'showNfurnitureTab', ribbonKey: 'showNfurnitureRibbon' },
        Divisórias: { route: '/npartition/npartitiondashboard', tabKey: 'showNpartitionTab', ribbonKey: 'showNpartitionRibbon' },
        Design: { route: '/ndecor/ndecordashboard', tabKey: 'showNdecorTab', ribbonKey: 'showNdecorRibbon' },
        Redes: { route: '/nping/npingdashboard', tabKey: 'showNpingTab', ribbonKey: 'showNpingRibbon' },
        Electricidade: { route: '/nconnect/nconnectdashboard', tabKey: 'showNconnectTab', ribbonKey: 'showNconnectRibbon' },
        Iluminação: { route: '/nlight/nlightdashboard', tabKey: 'showNlightTab', ribbonKey: 'showNlightRibbon' },
        Climatização: { route: '/ncomfort/ncomfortdashboard', tabKey: 'showNcomfortTab', ribbonKey: 'showNcomfortRibbon' },
        Áudio: { route: '/nsound/nsounddashboard', tabKey: 'showNsoundTab', ribbonKey: 'showNsoundRibbon' },
        Domótica: { route: '/nhome/nhomedashboard', tabKey: 'showNhomeTab', ribbonKey: 'showNhomeRibbon' },
        NSoftwares: { route: '/nsoftware/nsoftwaredashboard', tabKey: 'showSoftwaresTab', ribbonKey: 'showSoftwaresRibbon' }
    };

    // Função para verificar se o título é válido
    const isValidCardTitle = (title: string): title is CardTitle => {
        return title in tabData;
    };

    // Efeito para redimensionar o número de cartões visíveis
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setMaxVisibleCards(screenWidth <= 1366 ? 9 : 10);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Função para lidar com o scroll
    useLayoutEffect(() => {
        if (isReady && cardContainerRef.current) {
            setTimeout(() => {
                if (cardContainerRef.current) {
                    cardContainerRef.current.scrollLeft = scrollPosition;
                }

                const handleScroll = () => {
                    if (cardContainerRef.current) {
                        setScrollPosition(cardContainerRef.current.scrollLeft);
                    }
                };
    
                if (cardContainerRef.current) {
                    cardContainerRef.current.addEventListener('scroll', handleScroll);
                }
                return () => {
                    if (cardContainerRef.current) {
                        cardContainerRef.current.removeEventListener('scroll', handleScroll);
                    }
                };
            }, 300);
        }
    }, [isReady]);

    // Função para rolar para a esquerda
    const scrollLeft = () => {
        if (cardContainerRef.current) {
            cardContainerRef.current.scrollBy({ left: -130, behavior: 'smooth' });
        }
    };

    // Função para rolar para a direita
    const scrollRight = () => {
        if (cardContainerRef.current) {
            cardContainerRef.current.scrollBy({ left: 130, behavior: 'smooth' });
        }
    };

    // Numerar os cards
    const numCards = cards.length;

    // Define a classe de alinhamento
    const alignmentClass = numCards <= maxVisibleCards ? 'cards-center' : 'cards-left';

    return (
        <div className="dashboard-cards-container">
            {numCards > maxVisibleCards && (
                <Button id="arrow-cards" style={{ backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', color: 'black' }} className="arrows-cards" onClick={scrollLeft}>{"<"}</Button>
            )}
            <div id="cardContainer" className={`card-container ${alignmentClass}`} ref={cardContainerRef}>
                {cards.map((card, index) => {
                    const isCurrentPage = isValidCardTitle(card.title) && location.pathname === tabData[card.title].route;
                    return (
                        <div onClick={() => handleCardClick(card.title)} className="card-link" key={index}>
                            <Card className={`card ${isCurrentPage ? 'current-card' : ''}`}>
                                <Card.Img variant="top" src={card.img} className="card-img" />
                                <Card.Body>
                                    <Card.Title className="card-title">{card.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </div>
            {numCards > maxVisibleCards && (
                <Button className="arrows-cards" style={{ backgroundColor: '#D9D9D9', borderColor: '#D9D9D9', color: 'black' }} onClick={scrollRight}>{">"}</Button>
            )}
        </div>
    );
};