export default function normalizarFecha(fecha: Date | string): Date {
  if (fecha instanceof Date) {
    return new Date(fecha.toISOString());
  }

  return new Date(fecha.replace(" ", "T") + "Z");
}