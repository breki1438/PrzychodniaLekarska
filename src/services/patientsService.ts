import prisma from '@/lib/prisma';

export const getPatient = async (id: number) => {
    return prisma.patient.findUnique({ where: { id } });
};

export const createPatient = async (data: any) => {
    return prisma.patient.create({ data });
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