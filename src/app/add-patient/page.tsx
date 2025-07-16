"use client";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function AddPatient() {
    const [form, setForm] = useState({
        name: "",
        pesel: "",
        phone: "",
        email: "",
        gender: "",
    });
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/patients", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
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
                <h2 className="text-2xl font-bold mb-2 text-center">Dodaj pacjenta</h2>
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Imię i nazwisko"
                    required
                    className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-800"
                />
                <input
                    type="text"
                    name="pesel"
                    value={form.pesel}
                    onChange={handleChange}
                    placeholder="PESEL"
                    required
                    className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-800"
                />
                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Telefon"
                    required
                    className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-800"
                />
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-800"
                />
                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className="p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-slate-800"
                >
                    <option value="">Wybierz płeć...</option>
                    <option value="K">Kobieta</option>
                    <option value="M">Mężczyzna</option>
                    <option value="I">Inna</option>
                </select>
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition"
                >
                    Dodaj pacjenta
                </button>
            </form>
        </div>
    );
}