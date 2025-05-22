import { useEffect, useState } from "react";

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
    <div>
      <h2>Redefinir Senha</h2>

      {status && <p>{status}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nova senha:</label>
          <input 
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label>Confirmar nova senha:</label>
          <input 
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Redefinir Senha</button>
      </form>
    </div>
  );

}