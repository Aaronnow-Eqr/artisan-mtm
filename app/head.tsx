export default function Head() {
  return (
    <>
      {/* Forzar "sin favicon" (evita caché del navegador) */}
      <link rel="icon" href="data:," />
    </>
  );
}
