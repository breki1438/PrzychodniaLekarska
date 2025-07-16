"use client";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function AddDoctor() {
    const [name, setName] = useState("");
    const [specialty, setSpecialty] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/doctors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, specialty }),
        });
        if (res.ok) setSuccess(true);
    };

    if (success) {
        redirect("/");
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 pt-20">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white text-slate-800 rounded-xl shadow-lg p-8 flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold mb-2 text-center">Dodaj lekarza</h2>
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Imię i nazwisko"
                    required
                    className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-800"
                />
                <input
                    type="text"
                    value={specialty}
                    onChange={e => setSpecialty(e.target.value)}
                    placeholder="Specjalizacja"
                    required
                    className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-800"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition"
                >
                    Dodaj lekarza
                </button>
            </form>
        </div>
    );
}