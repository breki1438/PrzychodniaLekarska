"use client";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

export default function AddAppointment() {
    const [patientId, setPatientId] = useState("");
    const [doctorId, setDoctorId] = useState("");
    const [date, setDate] = useState("");
    const [success, setSuccess] = useState(false);
    const [doctors, setDoctors] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        fetch("/api/doctors")
            .then(res => res.json())
            .then(data => setDoctors(data));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/appointments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ patientId: Number(patientId), doctorId: Number(doctorId), date }),
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
                className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6"
            >
                <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">Dodaj wizytę</h2>
                <input
                    type="number"
                    value={patientId}
                    onChange={e => setPatientId(e.target.value)}
                    placeholder="ID pacjenta"
                    required
                    className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-700"
                />
                <select
                    value={doctorId}
                    onChange={e => setDoctorId(e.target.value)}
                    required
                    className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-700 bg-white"
                >
                    <option value="" disabled hidden>Wybierz lekarza</option>
                    {doctors.map(doc => (
                        <option key={doc.id} value={doc.id}>{doc.name}</option>
                    ))}
                </select>
                <input
                    type="datetime-local"
                    value={date || ""}
                    onChange={e => setDate(e.target.value)}
                    required
                    step="60"
                    className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-700"
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition"
                >
                    Dodaj wizytę
                </button>
            </form>
        </div>
    );
}