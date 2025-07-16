import React from "react";

type EditAppointmentModalProps = {
    show: boolean;
    editForm: { date: string; patientId: string; doctorId: string };
    patients: any[];
    doctors: any[];
    onChange: (form: { date: string; patientId: string; doctorId: string }) => void;
    onSave: () => void;
    onClose: () => void;
};

export default function EditAppointmentModal({
                                                 show,
                                                 editForm,
                                                 patients,
                                                 doctors,
                                                 onChange,
                                                 onSave,
                                                 onClose
                                             }: EditAppointmentModalProps) {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-100 to-slate-300 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edytuj wizytę</h2>
                <label className="block mb-2">Data:
                    <input
                        type="datetime-local"
                        className="w-full border rounded p-2"
                        value={editForm.date}
                        onChange={e => onChange({ ...editForm, date: e.target.value })}
                    />
                </label>
                <label className="block mb-2">Pacjent:
                    <select
                        className="w-full border rounded p-2"
                        value={editForm.patientId}
                        onChange={e => onChange({ ...editForm, patientId: e.target.value })}
                    >
                        {patients.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </label>
                <label className="block mb-4">Lekarz:
                    <select
                        className="w-full border rounded p-2"
                        value={editForm.doctorId}
                        onChange={e => onChange({ ...editForm, doctorId: e.target.value })}
                    >
                        {doctors.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                </label>
                <div className="flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={onSave}>Zapisz</button>
                    <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>Anuluj</button>
                </div>
            </div>
        </div>
    );
}