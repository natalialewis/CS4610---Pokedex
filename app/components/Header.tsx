export default function Header() {
  return (
    <header className="top-0 h-45 w-full bg-[url('/images/pokemon-background-tile.webp')] bg-repeat bg-top-left flex items-center justify-center" style={{ backgroundSize: '150px 100px' }}>
      {/* Pokédex Title and Subtitle */}
      <div className="flex flex-col gap-6 justify-center items-center py-3 px-3 bg-[var(--pokemon-red)]/92 rounded-lg shadow-md">
        <h1 className="font-[Pokemon] text-7xl">Pokédex</h1>
        <p className="text-xl">
          The Ultimate Pokémon Encyclopedia
        </p>
      </div>
    </header>
  );
}
