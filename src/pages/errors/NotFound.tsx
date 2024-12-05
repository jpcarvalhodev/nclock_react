import { Button } from 'react-bootstrap';
import '../../css/ErrorPages.css';
import { fetchWithAuth } from '../../components/FetchWithAuth';
import { useNavigate } from 'react-router-dom';

// Define a página de erro 404
export const NotFound = () => {
  const navigate = useNavigate();

  // Remove o token do localStorage e redireciona para a página de login
  const returnToLogin = async () => {
		try {
			const token = localStorage.getItem('token');
			const response = await fetchWithAuth('Authentication/Logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
			});
			if (response.ok) {
				localStorage.clear();
				navigate('/');
			} else {
				console.error('Erro:', response);
			}
		} catch (error) {
			console.error('Erro:', error);
		}

	};

  return (
    <div className='background'>
      <div className="error-container">
        <form className="form-error">
          <img className='logo-img' src="/logo_login.png" alt="logo" />
          <p style={{ color: 'white' }}>
            Funcionalidade não disponível. Contacte o administrador do sistema.
          </p>
          <Button style={{ marginTop: 20 }} onClick={returnToLogin} variant='outline-light'>Voltar para o login</Button>
        </form>
      </div>
    </div>
  );
};