// Invitación para cumpleaños de Tere Ortiz - React + Tailwind CSS

import React, { useState } from "react";

export default function App() {
  const [rsvp, setRsvp] = useState({ name: "", guests: "1" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("https://script.google.com/macros/s/AKfycbyG3Y9huk6fWXI0elrYww5yXn6-D3dOfbDWlAZ1qOu4Pi_jzmFSPOJoJ2LiFo_eWoR4/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rsvp),
      });
      setSubmitted(true);
    } catch (error) {
      alert("Hubo un problema al confirmar la asistencia.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadICS = () => {
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Cumpleaños de Tere Ortiz\nDESCRIPTION:¡Vamos a celebrar los 60 años de Tere Ortiz en casita!\nLOCATION:En casita\nDTSTART:20240705T140000\nDTEND:20240705T170000\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cumple_tere_ortiz.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-[#fff6ed] text-[#6b2c1c] font-sans p-6 flex flex-col items-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 text-center">
        <div className="text-4xl mb-2">🎉</div>
        <h1 className="text-2xl font-bold">¡Estás invitado!</h1>

        <div className="text-4xl mt-4 mb-2">🎂</div>
        <h2 className="text-xl font-bold text-[#b54627]">Tere Ortiz</h2>
        <p className="text-lg font-medium text-[#b54627]">cumple 60 años</p>

        <div className="mt-6 space-y-2 text-[#5a321d]">
          <p>📅 Sábado, 5 de julio</p>
          <p>🕒 14:00 PM</p>
          <p>📍 En casita</p>
        </div>

        <a
          href="https://maps.app.goo.gl/bVF9XyPYnNQJxoxw6"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block bg-[#f7a78c] text-white font-semibold py-2 px-4 rounded-xl shadow hover:bg-[#f28d73]"
        >
          Ver ubicación en Maps
        </a>

        <p className="mt-6 text-[#4a2b1a]">
          Ven a celebrar con nosotros un día lleno de alegría, recuerdos y muchas sonrisas. ¡No faltes!
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3 text-left">
            <label className="block">
              <span className="text-sm font-medium">Tu nombre</span>
              <input
                type="text"
                required
                value={rsvp.name}
                onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                className="mt-1 w-full border border-gray-300 rounded-md p-2"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold py-2 px-4 rounded-xl ${loading ? 'bg-gray-400' : 'bg-[#f56a4e] hover:bg-[#e65c42]'} text-white`}
            >
              {loading ? 'Enviando...' : 'Confirmar asistencia'}
            </button>
          </form>
        ) : (
          <p className="mt-6 font-medium text-[#4a2b1a]">¡Gracias por confirmar tu asistencia! 🎉</p>
        )}

        <button
          onClick={downloadICS}
          className="mt-4 w-full bg-[#f7a78c] text-white font-bold py-2 px-4 rounded-xl hover:bg-[#f28d73]"
        >
          Agregar al calendario
        </button>

        <p className="mt-6 text-sm text-[#5f3a2e]">Tere, familia y amigos te esperan</p>
      </div>
    </main>
  );
}
