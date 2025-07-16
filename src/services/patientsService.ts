import prisma from '../lib/prisma';

export const getPatient = async (id: number) => {
    return prisma.patient.findUnique({ where: { id } });
};

export const createPatient = async (data: any) => {
    const { name, pesel, phone, email, gender } = data;
    if (!name || !pesel || !phone || !email || !gender) {
        throw new Error("Wszystkie pola są wymagane.");
    }
    return prisma.patient.create({ data: { name, pesel, phone, email, gender } });
};

export const updatePatient = async (id: number, data: any) => {
    return prisma.patient.update({ where: { id }, data });
};

export const deletePatient = async (id: number) => {
    return prisma.patient.delete({ where: { id } });
};

export const getPatients = async () => {
    return prisma.patient.findMany();
};

export const getPatientById = async (prismaInstance: any, id: number) => {
    return prismaInstance.patient.findUnique({ where: { id } });
};