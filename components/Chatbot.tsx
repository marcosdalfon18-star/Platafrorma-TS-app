import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, type Chat } from "@google/genai";
import { type Company, type ChatMessage } from '../types';
import Spinner from './common/Spinner';
import XMarkIcon from './icons/XMarkIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
import SostyAvatarIcon from './icons/SostyAvatarIcon';

interface ChatbotProps {
    isOpen: boolean;
    onClose: () => void;
    company: Company;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose, company }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatSessionRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Initialize chat on open
            const initializeChat = async () => {
                try {
                    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                    const systemInstruction = `Eres Sosty, un asistente de IA experto en Recursos Humanos para la empresa "${company.name}". Tu conocimiento se basa estrictamente en la siguiente información interna de la empresa: --- ${company.internalData || 'No se ha proporcionado información interna.'} ---. Responde a las preguntas de los empleados de forma amable, profesional y concisa. Basa tus respuestas únicamente en la información proporcionada. Si una pregunta no puede ser respondida con esa información, amablemente indica que no tienes acceso a esos datos y sugiere contactar a RRHH. No inventes información.`;

                    chatSessionRef.current = ai.chats.create({
                        model: 'gemini-2.5-flash',
                        config: {
                            systemInstruction,
                        },
                    });
                    
                    setMessages([{
                        id: Date.now(),
                        role: 'model',
                        text: `¡Hola! Soy Sosty, tu asistente de IA para ${company.name}. ¿En qué puedo ayudarte hoy?`
                    }]);

                } catch (error) {
                    console.error("Error initializing chat:", error);
                     setMessages([{
                        id: Date.now(),
                        role: 'model',
                        text: "Lo siento, no he podido inicializar el chat. Por favor, verifica la configuración de la API."
                    }]);
                }
            };
            initializeChat();
        } else {
            // Reset state when closed
            setMessages([]);
            setInput('');
            setIsLoading(false);
            chatSessionRef.current = null;
        }
    }, [isOpen, company]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading || !chatSessionRef.current) return;

        const userMessage: ChatMessage = { id: Date.now(), role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        const modelMessageId = Date.now() + 1;
        setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '' }]);

        try {
            const stream = await chatSessionRef.current.sendMessageStream({ message: input });
            let responseText = '';
            for await (const chunk of stream) {
                responseText += chunk.text;
                setMessages(prev => prev.map(msg => 
                    msg.id === modelMessageId ? { ...msg, text: responseText } : msg
                ));
            }
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prev => prev.map(msg => 
                msg.id === modelMessageId ? { ...msg, text: 'Lo siento, ha ocurrido un error al procesar tu solicitud.' } : msg
            ));
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed bottom-20 right-6 w-full max-w-sm h-[70vh] z-50">
            <div className="bg-white rounded-lg shadow-2xl flex flex-col h-full border border-slate-200">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b bg-slate-50 rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <SostyAvatarIcon className="h-10 w-10" />
                        <div>
                            <h3 className="text-lg font-bold text-slate-800">Asistente IA - Sosty</h3>
                            <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                En línea
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-200" aria-label="Cerrar chat">
                        <XMarkIcon />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                             {msg.role === 'model' && (
                                <div className="flex-shrink-0">
                                    <SostyAvatarIcon className="h-8 w-8" />
                                </div>
                            )}
                            <div className={`max-w-[80%] px-4 py-2 rounded-xl ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && messages[messages.length - 1]?.role === 'model' && (
                         <div className="flex items-end gap-2 justify-start">
                            <div className="flex-shrink-0">
                                <SostyAvatarIcon className="h-8 w-8" />
                            </div>
                            <div className="max-w-[80%] px-4 py-3 rounded-xl bg-slate-100 text-slate-800 flex items-center">
                                <Spinner />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t bg-white rounded-b-lg">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Escribe tu pregunta..."
                            className="w-full pl-4 pr-12 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="absolute right-1 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
                            aria-label="Enviar mensaje"
                        >
                            <PaperAirplaneIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;