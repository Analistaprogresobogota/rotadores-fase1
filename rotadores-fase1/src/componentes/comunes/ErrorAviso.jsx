export function ErrorAviso({ mensaje }) {
  if (!mensaje) return null;
  return (
    <div className="aviso-error" role="alert">
      {mensaje}
    </div>
  );
}
