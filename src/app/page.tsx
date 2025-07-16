'use client';
import { useEffect, useState } from 'react';
import Link from "next/link";
import DoctorsList from "@/components/DoctorList";
import PatientList from "@/components/PatientList";
import AppointmentList from "@/components/AppointmentList";
import EditAppointmentModal from "@/components/EditAppointmentModal";

export default function Home() {
    const [patients, setPatients] = useState<any[]>([]);
    const [appointments, setAppointments] = useState<any[]>([]);
    const [doctors, setDoctors] = useState<any[]>([]);
    const [editingAppointment, setEditingAppointment] = useState<any | null>(null);
    const [editForm, setEditForm] = useState({ date: '', patientId: '', doctorId: '' });
    const [showEditModal, setShowEditModal] = useState(false);

    const fetchData = async () => {
        const patientData = await fetch('http://localhost:3000/api/patients');
        setPatients(await patientData.json());

        const appointmentData = await fetch('http://localhost:3000/api/appointments');
        setAppointments(await appointmentData.json());

        const doctorData = await fetch('http://localhost:3000/api/doctors');
        setDoctors(await doctorData.json());
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleEdit = (id: number) => {
        const appt = appointments.find(a => a.id === id);
        if (appt) {
            setEditingAppointment(appt);
            setEditForm({
                date: new Date(appt.date).toISOString().slice(0, 16),
                patientId: appt.patient.id,
                doctorId: appt.doctor?.id || ''
            });
            setShowEditModal(true);
        }
    };

    const handleEditSave = async () => {
        await fetch(`http://localhost:3000/api/appointments/${editingAppointment.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editForm)
        });
        setShowEditModal(false);
        setEditingAppointment(null);
        fetchData();
    };

    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:3000/api/appointments/${id}`, {
            method: 'DELETE'
        });
        fetchData();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 flex flex-col items-center py-10 pt-20">
            <PatientList />
            <AppointmentList
                appointments={appointments}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
            <DoctorsList />
            <EditAppointmentModal
                show={showEditModal}
                editForm={editForm}
                patients={patients}
                doctors={doctors}
                onChange={setEditForm}
                onSave={handleEditSave}
                onClose={() => setShowEditModal(false)}
            />
        </div>
    );
}