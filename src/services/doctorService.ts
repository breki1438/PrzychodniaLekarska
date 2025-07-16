import prisma from '../lib/prisma';

export async function getDoctors() {
    return prisma.doctor.findMany();
}

export async function createDoctor(data: { name: string; specialty: string }) {
    return prisma.doctor.create({ data });
}

export async function getDoctor(id: number) {
    return prisma.doctor.findUnique({ where: { id } });
}

export async function updateDoctor(id: number, data: { name?: string; specialty?: string }) {
    return prisma.doctor.update({ where: { id }, data });
}

export async function deleteDoctor(id: number) {
    return prisma.doctor.delete({ where: { id } });
}