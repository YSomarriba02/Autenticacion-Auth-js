export default class CodigoError extends Error {
    constructor(message: string) {
        super(message)
        this.name = "CodigoError"
    }
}