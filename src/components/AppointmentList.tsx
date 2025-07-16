import React from 'react';

type AppointmentListProps = {
    appointments: any[];
    onDelete: (id: number) => void;
    onEdit: (id: number) => void;
};

export default function AppointmentList({ appointments, onDelete, onEdit }: AppointmentListProps) {
    return (
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 mb-8">
            <p className="text-3xl font-bold text-slate-800 mb-4">Lista wizyt</p>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                    <thead>
                    <tr>
                        <th className="p-3 text-left font-semibold text-slate-600">Pacjent</th>
                        <th className="p-3 text-left font-semibold text-slate-600">Data</th>
                        <th className="p-3 text-left font-semibold text-slate-600">Lekarz</th>
                        <th className="p-3 text-left font-semibold text-slate-600">Specjalizacja</th>
                        <th className="p-3 text-left font-semibold text-slate-600">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {appointments.map((appointment: any, idx: number) => {
                        const date = new Date(appointment.date);
                        const formatted = date.toLocaleString('pl-PL', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                        return (
                            <tr
                                key={appointment.id}
                                className={idx % 2 === 0 ? "bg-slate-50" : "bg-white"}
                            >
                                <td className="p-3 text-slate-700">{appointment.patient.name}</td>
                                <td className="p-3 text-slate-700">{formatted}</td>
                                <td className="p-3 text-slate-700">{appointment.doctor?.name || 'brak danych'}</td>
                                <td className="p-3 text-slate-700">{appointment.doctor?.specialty || 'brak danych'}</td>
                                <td className="p-3 flex gap-2">
                                    <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg shadow transition"
                                        onClick={() => onEdit(appointment.id)}
                                    >
                                        Edytuj
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg shadow transition"
                                        onClick={() => onDelete(appointment.id)}
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}