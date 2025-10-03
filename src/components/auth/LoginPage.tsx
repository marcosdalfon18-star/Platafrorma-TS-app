

import React, { useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../services/firebase';

const LoginPage: React.FC = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err: any) {
			setError('Credenciales inválidas o usuario no encontrado.');
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleLogin = async () => {
		setLoading(true);
		setError(null);
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
		} catch (err: any) {
			setError('Error al ingresar con Google.');
		} finally {
			setLoading(false);
		}
	};

	// Handlers para registrar y recuperar contraseña (solo placeholders)
	const handleRegister = () => {
		alert('Funcionalidad de registro próximamente.');
	};
	const handleForgotPassword = () => {
		alert('Funcionalidad de recuperación próximamente.');
	};

	return (
		<div className="min-h-screen flex items-stretch bg-gradient-to-br from-[#e8f5e9] to-[#e3f2fd]">
			{/* Lado izquierdo: branding profesional */}
			<div className="hidden md:flex flex-col justify-center items-center bg-white w-1/2 p-12 border-r border-[#2E7D32]/10">
				<div className="flex flex-col items-center justify-center w-full">
					<img src="/logo.png" alt="TS" className="mb-6 mx-auto" style={{height:120, width:120, objectFit:'contain'}} />
					<h1 className="text-5xl font-extrabold text-[#2E7D32] mb-2 tracking-tight text-center">Talento Sostenible</h1>
					<span className="text-base font-semibold text-[#1976D2] mb-4 text-center">Consultora de Innovación Empresarial</span>
					<p className="text-lg text-gray-600 font-medium text-center mt-2">Plataforma inteligente para potenciar tu empresa</p>
				</div>
			</div>
			{/* Lado derecho: formulario profesional */}
			<div className="flex flex-1 items-center justify-center bg-transparent">
				<div className="bg-white rounded-2xl shadow-2xl px-10 py-8 w-full flex flex-col items-center border border-[#2E7D32]/10" style={{maxWidth:'400px', minWidth:'320px'}}>
					<h2 className="text-2xl font-bold text-[#2E7D32] mb-4 tracking-tight text-center">Acceso a la plataforma</h2>
					<form className="w-full space-y-5" onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
							<input
								id="email"
								type="email"
								placeholder="ejemplo@empresa.com"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-base"
								value={email}
								onChange={e => setEmail(e.target.value)}
								autoFocus
								required
							/>
						</div>
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
							<input
								id="password"
								type="password"
								placeholder="••••••••"
								className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] text-base"
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className="flex justify-between items-center text-sm mt-1">
							<button type="button" className="text-[#1976D2] hover:underline" onClick={handleForgotPassword}>¿Olvidaste tu contraseña?</button>
							<button type="button" className="text-[#2E7D32] hover:underline" onClick={handleRegister}>Registrarse</button>
						</div>
						<button
							type="submit"
							className={`w-full py-2 bg-[#2E7D32] hover:bg-[#1976D2] text-white font-semibold rounded-lg transition-all text-base flex items-center justify-center shadow ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
							disabled={loading}
						>
							{loading ? 'Ingresando...' : 'Ingresar'}
						</button>
					</form>
					{error && <div className="mt-3 text-red-600 text-sm text-center">{error}</div>}
					<div className="mt-6 text-xs text-gray-400 text-center">© 2025 Talento Sostenible</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;