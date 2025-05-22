import { useEffect, useState } from "react";
import { FaLock, FaRedo } from 'react-icons/fa';

export function ResetPassword() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get('token');

    if (urlToken) {
      setToken(urlToken);
    } else {
      setStatus('Token não encontrado na URL.');
    }
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      return setStatus('Preencha todos os campos.');
    }
  
    if (newPassword !== confirmPassword) {
      return setStatus('As senhas não coincidem.');
    }
  
    try {
      const res = await fetch('http://localhost:3000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });
  
      const data = await res.json();

      if (!res.ok) {
        return setStatus(data.error || 'Erro ao redefinir a senha.');
      }

      setStatus('Senha redefinida com sucesso!');
    } catch (error) {
      console.error(error);
      setStatus('Erro inesperado.');
    }
  };

  return (
    <div className="container">
      <div className="title-container">
        <div className="icon-container">
          <FaLock size={24} color="#374151" />
        </div>

        <h2 className="title">Redefinir Senha</h2>
        <h3 className="subtitle">Insira sua nova senha abaixo</h3>

        {status && <p style={{ textAlign: 'center', color: status.includes('sucesso') ? 'green' : 'red' }}>{status}</p>}
      </div>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="label">Nova senha</label>
          <input 
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        
        <div className="input-container">
          <label className="label">Confirmar nova senha</label>
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="input"
          />
        </div>

        <button type="submit" className="button">
          <FaRedo style={{ marginRight: '0.5rem' }} />
          Redefinir Senha</button>
      </form>
    </div>
  );

}