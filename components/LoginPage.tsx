import React, { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, db } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import Logo from './icons/Logo';
import Spinner from './common/Spinner';

const GoogleSignInButton = () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // If user is new, create a default profile.
                // The companyId would ideally be set during a proper onboarding flow.
                await setDoc(userDocRef, {
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    role: 'empleado', 
                    companyId: 1, // Defaulting to company 1 for new sign-ups
                });
            }
            // onAuthStateChanged in App.tsx will handle the rest.
        } catch (error) {
            console.error("Error during Google sign-in:", error);
            alert(`Error al iniciar sesión. Por favor, intente de nuevo.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform hover:scale-105 disabled:opacity-75 disabled:cursor-wait"
        >
            {isLoading ? <Spinner /> : <img className="w-5 h-5 mr-3" src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google logo" />}
            {isLoading ? 'Iniciando Sesión...' : 'Ingresar con Google'}
        </button>
    );
};

const EmailSignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // onAuthStateChanged in App.tsx will handle the rest.
        } catch (err: any) {
            console.error("Error signing in with email/password:", err);
            if (['auth/user-not-found', 'auth/wrong-password', 'auth/invalid-credential'].includes(err.code)) {
                setError('Correo electrónico o contraseña incorrectos.');
            } else {
                setError('Ocurrió un error al iniciar sesión.');
            }
        } finally {
            setIsLoading(false);
        }
    };

  return (
    <form onSubmit={handleSignIn} className="space-y-4 animate-fade-in">
      {error && <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md shadow">{error}</p>}
      <div className="relative">
        <label htmlFor="email" className="sr-only">Email</label>
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0zm0 0v1a4 4 0 01-8 0v-1" /></svg>
        </span>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="appearance-none rounded-md relative block w-full pl-10 px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm shadow"
          placeholder="Correo electrónico"
        />
      </div>
      <div className="relative">
        <label htmlFor="password" className="sr-only">Password</label>
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0v1a4 4 0 01-8 0v-1" /></svg>
        </span>
        <input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="appearance-none rounded-md relative block w-full pl-10 pr-10 px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm shadow"
          placeholder="Contraseña"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-blue-500 focus:outline-none">
          {showPassword ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a9 9 0 0118 0 9 9 0 01-18 0z" /></svg>
          ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M9.88 9.88A3 3 0 0012 15a3 3 0 002.12-5.12M6.1 6.1A9 9 0 0121 12a9 9 0 01-15.9-5.9" /></svg>
          )}
        </button>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed shadow-lg transition-all duration-200"
      >
        {isLoading ? <Spinner /> : 'Ingresar'}
      </button>
    </form>
  );
};


const LoginPage: React.FC = () => {
  return (
    <div 
      className="min-h-screen bg-slate-200 bg-cover bg-center flex items-center justify-center p-4"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-b413da4b2489?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-slate-900/70 backdrop-blur-sm"></div>
      
      <div className="relative z-10 container mx-auto flex flex-col lg:flex-row items-center justify-center">
        
        <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0 lg:pr-20 flex flex-col items-center lg:items-start">
          <Logo className="h-32 w-32 mb-6" />
          <h1 className="text-6xl font-bold text-white mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.6)'}}>Talento Sostenible</h1>
          <p className="mt-2 text-xl text-slate-200" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.6)'}}>
            Impulsando el crecimiento de PYMES con soluciones a medida.
          </p>
        </div>

        <div className="lg:w-1/2 w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">Bienvenido</h2>
            <p className="text-center text-slate-500 mb-6 text-sm">Inicie sesión para acceder a la plataforma.</p>
            <div className="space-y-4">
              <EmailSignInForm />
               <div className="relative my-4">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-slate-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">O continúa con</span>
                </div>
              </div>
              <GoogleSignInButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
