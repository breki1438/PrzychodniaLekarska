// src/components/PatientList.tsx
'use client';
import { useEffect, useState } from 'react';

export default function PatientList() {
    const [patients, setPatients] = useState<any[]>([]);

    const fetchPatients = async () => {
        const res = await fetch('/api/patients');
        setPatients(await res.json());
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleDelete = async (id: number) => {
        await fetch(`/api/patients/${id}`, { method: 'DELETE' });
        fetchPatients();
    };

    return (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 mt-8 mb-8">
            <p className="text-3xl font-bold text-slate-800 mb-4">Lista pacjentów</p>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                    <tr>
                        <th className="p-3 text-left font-semibold text-slate-600">ID</th>
                        <th className="p-3 text-left font-semibold text-slate-600">Imię i nazwisko</th>
                        <th className="p-3 text-left font-semibold text-slate-600">Email</th>
                        <th className="p-3 text-left font-semibold text-slate-600">Telefon</th>
                        <th className="p-3 text-left font-semibold text-slate-600">Płeć</th>
                        <th className="p-3 text-left font-semibold text-slate-600">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {patients.map((patient, idx) => (
                        <tr key={patient.id} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                            <td className="p-3 text-slate-700">{patient.id}</td>
                            <td className="p-3 text-slate-700">{patient.name}</td>
                            <td className="p-3 text-slate-700">{patient.email}</td>
                            <td className="p-3 text-slate-700">{patient.phone}</td>
                            <td className="p-3 text-slate-700">{patient.gender}</td>
                            <td className="p-3">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition"
                                    onClick={() => handleDelete(patient.id)}
                                >
                                    Usuń
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}