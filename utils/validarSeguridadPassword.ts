export default function validarSeguridadPassword({ password }: { password: string }): string | true {

    const cadena = [...password]
    const numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const caracteresEspeciales = [
        '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
        '_', '+', '-', '=', '[', ']', '{', '}', '|', ';',
        ':', '"', '\'', '\\', ',', '.', '<', '>', '?', '/',
        '`', '~'
    ];

    const incluyeNumero = cadena.some(caracter => numeros.includes(caracter))
    const incluyeMayuscula = cadena.some(caracter => caracter == caracter.toUpperCase() && caracter != caracter.toLowerCase())
    const incluyeCaracterEspecial = cadena.some(caracter => caracteresEspeciales.includes(caracter))

    if (password.length < 8) {
        return "Contraseña debe tener al menos 8 caracteres"
    }
    if (!incluyeNumero) {
        return "Debe tener al menos 1 numero"
    }
    if (!incluyeMayuscula) {
        return "Debe tener al menos una letra mayuscula"
    }
    if (!incluyeCaracterEspecial) {
        return "Debe tener al menos 1 caracter especial"
    }

    return true
}