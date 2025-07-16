import prisma from '../lib/prisma';
import { getPatient } from './patientsService';


export const getAppointments = async () => {
    return prisma.appointment.findMany({ include: { patient: true, doctor: true } });
};

export const createAppointment = async (data: any) => {
    const patient = await getPatient(data.patientId);
    if (!patient) throw new Error('Patient not found');
    return prisma.appointment.create({
        data: {
            date: new Date(data.date),
            patient: { connect: { id: data.patientId } },
            doctor: { connect: { id: data.doctorId } }
        }
    });
};

export const updateAppointment = async (id: number, data: any) => {
    return prisma.appointment.update({
        where: { id },
        data: {
            date: new Date(data.date),
            patient: { connect: { id: data.patientId } },
            doctor: { connect: { id: data.doctorId } }
        }
    });
};

export const deleteAppointment = async (id: number) => {
    return prisma.appointment.delete({ where: { id } });
};

export const getAppointmentById = async (id: number) => {
    return prisma.appointment.findUnique({
        where: { id },
        include: { patient: true, doctor: true }
    });
};