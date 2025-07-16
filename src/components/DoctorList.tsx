'use client';
import { useEffect, useState } from 'react';

export default function DoctorsList() {
    const [doctors, setDoctors] = useState<any[]>([]);

    const fetchDoctors = async () => {
        const res = await fetch('/api/doctors');
        setDoctors(await res.json());
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleDelete = async (id: number) => {
        await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
        fetchDoctors();
    };

    return (
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 mb-8">
            <p className="text-3xl font-bold text-slate-800 mb-4">Lista lekarzy</p>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                    <tr>
                        <th className="p-3 text-left font-semibold text-slate-600">Imię i nazwisko</th>
                        <th className="p-3 text-left font-semibold text-slate-600">Specjalizacja</th>
                        <th className="p-3 text-left font-semibold text-slate-600">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {doctors.map((doctor, idx) => (
                        <tr key={doctor.id} className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                            <td className="p-3 text-slate-700">{doctor.name}</td>
                            <td className="p-3 text-slate-700">{doctor.specialty}</td>
                            <td className="p-3">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition"
                                    onClick={() => handleDelete(doctor.id)}
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