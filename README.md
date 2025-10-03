<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1c6QUGz10Ojwmhgw1OEcZGkgR1kJfweya

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Vista previa y uso de la app

1. Ejecuta la app localmente:
   ```bash
   npm run dev
   ```
   Accede a `http://localhost:5173` en tu navegador.

2. Inicia sesión con tu usuario (según el rol configurado en Firestore).

3. Si tu usuario tiene el rol `consultor`, verás el **ConsultorDashboard** con acceso global a empresas, empleados, reportes y gestión de usuarios.

4. Para otros roles, la app mostrará el dashboard y vistas correspondientes.

## Despliegue

Para desplegar en Firebase Hosting:

```bash
npm run build
firebase deploy --only hosting
```

## Estructura recomendada
- `/src/components/consultor/ConsultorDashboard.tsx`: Dashboard especial para consultores.
- `/src/components/{dominio}/`: Componentes por dominio (empresa, empleado, gestor, etc).
- `/src/services/`: Lógica centralizada de Firestore y negocio.

## Notas
- El archivo `.env.local` debe contener tu clave `GEMINI_API_KEY`.
- El README se puede adaptar para onboarding, instrucciones de roles y personalización visual.
