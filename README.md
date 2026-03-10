This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
next-auth
├─ app
│  ├─ api
│  │  ├─ auth
│  │  │  └─ [...nextauth]
│  │  │     └─ route.ts
│  │  └─ validaremail
│  │     └─ route.ts
│  ├─ auth
│  │  ├─ signin
│  │  │  ├─ page.tsx
│  │  │  └─ reestablecer
│  │  │     └─ page.tsx
│  │  └─ signup
│  │     └─ page.tsx
│  ├─ AuthProvider.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ lib
│  │  ├─ Actions
│  │  │  ├─ emailActions.ts
│  │  │  └─ userActions.ts
│  │  ├─ bd.ts
│  │  ├─ constants
│  │  │  └─ password-reset.ts
│  │  ├─ email-templates
│  │  │  └─ templateFunction.ts
│  │  ├─ Errors
│  │  │  └─ CodigoError.ts
│  │  ├─ repositories
│  │  │  ├─ findPasswordCodigo.ts
│  │  │  ├─ findTokenVerificacionEmail.ts
│  │  │  ├─ findUserBd.ts
│  │  │  ├─ insertCambiosPasswordCodigo.ts
│  │  │  ├─ insertTokenVerificacionEmail.ts
│  │  │  ├─ insertUserBd.ts
│  │  │  ├─ updatePassword.ts
│  │  │  ├─ updatePasswordCodigo.ts
│  │  │  ├─ updatePasswordCodigoIntento.ts
│  │  │  ├─ updateTokenVerificacionEmail.ts
│  │  │  └─ updateUserBd.ts
│  │  ├─ services
│  │  │  ├─ auth
│  │  │  │  ├─ loginUser.ts
│  │  │  │  ├─ signUp.ts
│  │  │  │  └─ signUpWithProvider.ts
│  │  │  └─ sendEmail
│  │  │     ├─ enviarEmail.ts
│  │  │     ├─ serviceCambioPasswordCodigo.ts
│  │  │     ├─ serviceReestablecerPassword.ts
│  │  │     └─ validarCodigoReset.ts
│  │  └─ types
│  │     ├─ cambioPasswordCodigo.ts
│  │     ├─ next-auth.t.d.ts
│  │     ├─ TokenVerificacionEmail.ts
│  │     └─ user.ts
│  ├─ page.tsx
│  └─ perfil
│     └─ page.tsx
├─ auth.tsx
├─ Components
│  ├─ auth
│  │  ├─ ButtonAuth.tsx
│  │  ├─ FormEmail.tsx
│  │  ├─ FormNuevaPassword.tsx
│  │  ├─ FormOtp.tsx
│  │  ├─ Login.tsx
│  │  ├─ Paso1.tsx
│  │  ├─ Paso2.tsx
│  │  ├─ Paso3.tsx
│  │  ├─ Provider.tsx
│  │  ├─ ProviderEmail.tsx
│  │  ├─ ReestablecerPasswordLayaout.tsx
│  │  └─ Signup.tsx
│  ├─ Field
│  │  ├─ Field.tsx
│  │  ├─ Input.tsx
│  │  └─ Label.tsx
│  ├─ LoadingText.tsx
│  ├─ NavBar.tsx
│  ├─ Profile
│  │  ├─ BoxCambiarContraseña.tsx
│  │  ├─ BoxComponent.tsx
│  │  ├─ BoxReestablecerContraseña.tsx
│  │  ├─ ButtonSingOut.tsx
│  │  ├─ FormCambiarContraseña.tsx
│  │  ├─ FormOtp.tsx
│  │  ├─ Modal.tsx
│  │  ├─ ModalCerrarSesion.tsx
│  │  ├─ NuevaPassword.tsx
│  │  ├─ OtpInput.tsx
│  │  ├─ ProfileOptions.tsx
│  │  └─ WizardReestablecerPassword.tsx
│  └─ Spinner.tsx
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ icons
│  │  ├─ advertencia-icon.png
│  │  ├─ arrow-left.png
│  │  ├─ googleIcon.png
│  │  ├─ logout-icon.png
│  │  ├─ password-icon.png
│  │  ├─ profile_no_image.png
│  │  ├─ reestablecerPassword-icon.png
│  │  └─ user-icon.png
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tsconfig.json
└─ utils
   ├─ compararHashes.ts
   ├─ compararPassword.ts
   ├─ encriptarPassword.ts
   ├─ enviarEmailCodigoOtp.ts
   ├─ enviarTokenEmail.ts
   ├─ generarCodigo.ts
   ├─ generarLinkToken.ts
   ├─ generarToken.ts
   ├─ isFechaExpirada.ts
   ├─ validarCodigo.ts
   └─ validarSeguridadPassword.ts

```
```
next-auth
├─ app
│  ├─ api
│  │  ├─ auth
│  │  │  └─ [...nextauth]
│  │  └─ validaremail
│  │     └─ route.ts
│  ├─ auth
│  │  ├─ signin
│  │  │  ├─ page.tsx
│  │  │  └─ reestablecer
│  │  │     └─ page.tsx
│  │  └─ signup
│  │     └─ page.tsx
│  ├─ AuthProvider.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ lib
│  │  ├─ Actions
│  │  │  ├─ emailActions.ts
│  │  │  └─ userActions.ts
│  │  ├─ bd.ts
│  │  ├─ constants
│  │  │  └─ password-reset.ts
│  │  ├─ email-templates
│  │  │  └─ templateFunction.ts
│  │  ├─ Errors
│  │  │  └─ CodigoError.ts
│  │  ├─ repositories
│  │  │  ├─ findPasswordCodigo.ts
│  │  │  ├─ findTokenVerificacionEmail.ts
│  │  │  ├─ findUserBd.ts
│  │  │  ├─ insertCambiosPasswordCodigo.ts
│  │  │  ├─ insertTokenVerificacionEmail.ts
│  │  │  ├─ insertUserBd.ts
│  │  │  ├─ updatePassword.ts
│  │  │  ├─ updatePasswordCodigo.ts
│  │  │  ├─ updatePasswordCodigoIntento.ts
│  │  │  ├─ updateTokenVerificacionEmail.ts
│  │  │  └─ updateUserBd.ts
│  │  ├─ services
│  │  │  ├─ auth
│  │  │  │  ├─ loginUser.ts
│  │  │  │  ├─ signUp.ts
│  │  │  │  └─ signUpWithProvider.ts
│  │  │  └─ sendEmail
│  │  │     ├─ enviarEmail.ts
│  │  │     ├─ serviceCambioPasswordCodigo.ts
│  │  │     ├─ serviceReestablecerPassword.ts
│  │  │     └─ validarCodigoReset.ts
│  │  └─ types
│  │     ├─ cambioPasswordCodigo.ts
│  │     ├─ next-auth.t.d.ts
│  │     ├─ TokenVerificacionEmail.ts
│  │     └─ user.ts
│  ├─ page.tsx
│  └─ perfil
│     └─ page.tsx
├─ auth.tsx
├─ components
│  ├─ auth
│  │  ├─ ButtonAuth.tsx
│  │  ├─ FormEmail.tsx
│  │  ├─ FormNuevaPassword.tsx
│  │  ├─ FormOtp.tsx
│  │  ├─ Login.tsx
│  │  ├─ Paso1.tsx
│  │  ├─ Paso2.tsx
│  │  ├─ Paso3.tsx
│  │  ├─ Provider.tsx
│  │  ├─ ProviderEmail.tsx
│  │  ├─ ReestablecerPasswordLayaout.tsx
│  │  └─ Signup.tsx
│  ├─ Field
│  │  ├─ Field.tsx
│  │  ├─ Input.tsx
│  │  └─ Label.tsx
│  ├─ LoadingText.tsx
│  ├─ NavBar.tsx
│  ├─ Profile
│  │  ├─ BoxCambiarContrasena.tsx
│  │  ├─ BoxComponent.tsx
│  │  ├─ BoxReestablecerContrasena.tsx
│  │  ├─ ButtonSingOut.tsx
│  │  ├─ FormCambiarContrasena.tsx
│  │  ├─ FormOtp.tsx
│  │  ├─ Modal.tsx
│  │  ├─ ModalCerrarSesion.tsx
│  │  ├─ NuevaPassword.tsx
│  │  ├─ OtpInput.tsx
│  │  ├─ ProfileOptions.tsx
│  │  └─ WizardReestablecerPassword.tsx
│  └─ Spinner.tsx
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ icons
│  │  ├─ advertencia-icon.png
│  │  ├─ arrow-left.png
│  │  ├─ googleIcon.png
│  │  ├─ logout-icon.png
│  │  ├─ password-icon.png
│  │  ├─ profile_no_image.png
│  │  ├─ reestablecerPassword-icon.png
│  │  └─ user-icon.png
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tsconfig.json
└─ utils
   ├─ compararHashes.ts
   ├─ compararPassword.ts
   ├─ encriptarPassword.ts
   ├─ enviarEmailCodigoOtp.ts
   ├─ enviarTokenEmail.ts
   ├─ generarCodigo.ts
   ├─ generarLinkToken.ts
   ├─ generarToken.ts
   ├─ isFechaExpirada.ts
   ├─ validarCodigo.ts
   └─ validarSeguridadPassword.ts

```
```
next-auth
├─ app
│  ├─ api
│  │  ├─ auth
│  │  │  └─ [...nextauth]
│  │  └─ validaremail
│  │     └─ route.ts
│  ├─ auth
│  │  ├─ signin
│  │  │  ├─ page.tsx
│  │  │  └─ reestablecer
│  │  │     └─ page.tsx
│  │  └─ signup
│  │     └─ page.tsx
│  ├─ AuthProvider.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ lib
│  │  ├─ Actions
│  │  │  ├─ emailActions.ts
│  │  │  └─ userActions.ts
│  │  ├─ bd.ts
│  │  ├─ constants
│  │  │  └─ password-reset.ts
│  │  ├─ email-templates
│  │  │  └─ templateFunction.ts
│  │  ├─ Errors
│  │  │  └─ CodigoError.ts
│  │  ├─ repositories
│  │  │  ├─ findPasswordCodigo.ts
│  │  │  ├─ findTokenVerificacionEmail.ts
│  │  │  ├─ findUserBd.ts
│  │  │  ├─ insertCambiosPasswordCodigo.ts
│  │  │  ├─ insertTokenVerificacionEmail.ts
│  │  │  ├─ insertUserBd.ts
│  │  │  ├─ updatePassword.ts
│  │  │  ├─ updatePasswordCodigo.ts
│  │  │  ├─ updatePasswordCodigoIntento.ts
│  │  │  ├─ updateTokenVerificacionEmail.ts
│  │  │  └─ updateUserBd.ts
│  │  ├─ services
│  │  │  ├─ auth
│  │  │  │  ├─ loginUser.ts
│  │  │  │  ├─ signUp.ts
│  │  │  │  └─ signUpWithProvider.ts
│  │  │  └─ sendEmail
│  │  │     ├─ enviarEmail.ts
│  │  │     ├─ serviceCambioPasswordCodigo.ts
│  │  │     ├─ serviceReestablecerPassword.ts
│  │  │     └─ validarCodigoReset.ts
│  │  └─ types
│  │     ├─ cambioPasswordCodigo.ts
│  │     ├─ next-auth.t.d.ts
│  │     ├─ TokenVerificacionEmail.ts
│  │     └─ user.ts
│  ├─ page.tsx
│  └─ perfil
│     └─ page.tsx
├─ auth.tsx
├─ components
│  ├─ auth
│  │  ├─ ButtonAuth.tsx
│  │  ├─ FormEmail.tsx
│  │  ├─ FormNuevaPassword.tsx
│  │  ├─ FormOtp.tsx
│  │  ├─ Login.tsx
│  │  ├─ Paso1.tsx
│  │  ├─ Paso2.tsx
│  │  ├─ Paso3.tsx
│  │  ├─ Provider.tsx
│  │  ├─ ProviderEmail.tsx
│  │  ├─ ReestablecerPasswordLayaout.tsx
│  │  └─ Signup.tsx
│  ├─ Field
│  │  ├─ Field.tsx
│  │  ├─ Input.tsx
│  │  └─ Label.tsx
│  ├─ LoadingText.tsx
│  ├─ NavBar.tsx
│  ├─ Profile
│  │  ├─ BoxCambiarContrasena.tsx
│  │  ├─ BoxComponent.tsx
│  │  ├─ BoxReestablecerContrasena.tsx
│  │  ├─ ButtonSingOut.tsx
│  │  ├─ FormCambiarContrasena.tsx
│  │  ├─ FormOtp.tsx
│  │  ├─ Modal.tsx
│  │  ├─ ModalCerrarSesion.tsx
│  │  ├─ NuevaPassword.tsx
│  │  ├─ OtpInput.tsx
│  │  ├─ ProfileOptions.tsx
│  │  └─ WizardReestablecerPassword.tsx
│  └─ Spinner.tsx
├─ eslint.config.mjs
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ icons
│  │  ├─ advertencia-icon.png
│  │  ├─ arrow-left.png
│  │  ├─ googleIcon.png
│  │  ├─ logout-icon.png
│  │  ├─ password-icon.png
│  │  ├─ profile_no_image.png
│  │  ├─ reestablecerPassword-icon.png
│  │  └─ user-icon.png
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tsconfig.json
└─ utils
   ├─ compararHashes.ts
   ├─ compararPassword.ts
   ├─ encriptarPassword.ts
   ├─ enviarEmailCodigoOtp.ts
   ├─ enviarTokenEmail.ts
   ├─ generarCodigo.ts
   ├─ generarLinkToken.ts
   ├─ generarToken.ts
   ├─ isFechaExpirada.ts
   ├─ validarCodigo.ts
   └─ validarSeguridadPassword.ts

```