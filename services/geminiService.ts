

import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateJobDescription = async (
  title: string,
  responsibilities: string[]
): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Error: API key is not configured. Please set the API_KEY environment variable.");
  }

  const prompt = `
    Actúa como un experto en Recursos Humanos.
    Escribe una descripción de puesto profesional y atractiva para el siguiente rol:

    Puesto: ${title}

    Responsabilidades clave:
    ${responsibilities.map(r => `- ${r}`).join('\n')}

    La descripción debe ser clara, concisa y estar orientada a atraer a los mejores talentos. Estructura la respuesta en secciones como "Resumen del puesto", "Responsabilidades principales" y "Calificaciones deseadas".
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating job description:", error);
    throw new Error("Hubo un error al generar la descripción con la IA. Por favor, inténtelo de nuevo más tarde.");
  }
};

export const generateCybersecurityPractices = async (): Promise<string[]> => {
  if (!API_KEY) {
    throw new Error("API key is not configured.");
  }

  const prompt = `
    Actúa como un experto en ciberseguridad para PYMES.
    Genera una lista de 10 buenas prácticas de ciberseguridad fundamentales y accionables que cualquier PYME puede implementar.
    Cada práctica debe ser una frase corta y clara.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    practices: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.STRING,
                            description: "Una buena práctica de ciberseguridad."
                        }
                    }
                }
            }
        }
    });

    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    if (result && Array.isArray(result.practices)) {
        return result.practices;
    } else {
        console.warn("Unexpected JSON structure from AI:", result);
        const practicesArray = Object.values(result).find(val => Array.isArray(val) && val.every(item => typeof item === 'string'));
        if (practicesArray) {
            return practicesArray as string[];
        }
        throw new Error("No se pudieron extraer las prácticas del formato recibido.");
    }

  } catch (error) {
    console.error("Error generating cybersecurity practices:", error);
    if (error instanceof Error && error.message.includes("No se pudieron extraer")) {
        throw error;
    }
    throw new Error("Hubo un error al generar las recomendaciones de ciberseguridad. Por favor, inténtelo de nuevo más tarde.");
  }
};

export const generateHrPolicy = async (topic: string, keyPoints: string): Promise<string> => {
    if (!API_KEY) {
        throw new Error("Error: API key is not configured.");
    }

    const prompt = `
        Actúa como un consultor experto en Recursos Humanos.
        Redacta una política de empresa formal y completa sobre el tema: "${topic}".
        La política debe basarse en los siguientes puntos clave:
        ${keyPoints}
        
        Estructura el documento con secciones claras como '1. Propósito', '2. Alcance', '3. Detalles de la Política', y '4. Responsabilidades'.
        El tono debe ser profesional, claro y fácil de entender para todos los empleados.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating HR policy:", error);
        throw new Error("Hubo un error al generar la política con la IA.");
    }
};

export const generateOnboardingChecklist = async (name: string, position: string, startDate: string): Promise<Record<string, string[]>> => {
    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }

    const prompt = `
        Actúa como un especialista en Onboarding de RRHH.
        Crea una lista de tareas de incorporación detallada para la primera semana de un nuevo empleado.
        - Nombre del empleado: ${name}
        - Puesto: ${position}
        - Fecha de inicio: ${startDate}
        
        Devuelve la respuesta como un objeto JSON. Las claves deben ser "Dia 1", "Dia 2", "Dia 3", "Dia 4", "Dia 5".
        El valor de cada clave debe ser un array de strings, donde cada string es una tarea de onboarding específica para ese día.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        "Dia 1": { type: Type.ARRAY, items: { type: Type.STRING } },
                        "Dia 2": { type: Type.ARRAY, items: { type: Type.STRING } },
                        "Dia 3": { type: Type.ARRAY, items: { type: Type.STRING } },
                        "Dia 4": { type: Type.ARRAY, items: { type: Type.STRING } },
                        "Dia 5": { type: Type.ARRAY, items: { type: Type.STRING } },
                    }
                }
            }
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error generating onboarding checklist:", error);
        throw new Error("Hubo un error al generar el checklist de onboarding.");
    }
};