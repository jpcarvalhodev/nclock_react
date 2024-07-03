import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
`;

const FadeInOutDiv = styled.div`
    animation: ${fadeInOut} 2s infinite;
    font-size: 25px;
    color: white;
    font-weight: bold;
`;

const OverlayDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface OverlayProps {
    isLoading: boolean;
}

export const Overlay = ({ isLoading }: OverlayProps) => {
    if (!isLoading) return null;

    return (
        <OverlayDiv>
            <FadeInOutDiv>Operação em andamento, aguarde...</FadeInOutDiv>
        </OverlayDiv>
    );
};
