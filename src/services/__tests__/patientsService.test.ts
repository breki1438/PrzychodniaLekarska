import * as patientsService from '../patientsService';
import prisma from '../../lib/prisma';

jest.mock('../../lib/prisma', () => ({
    patient: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    },
}));

describe('patientsService', () => {
    afterEach(() => jest.clearAllMocks());

    it('getPatients zwraca listę pacjentów', async () => {
        (prisma.patient.findMany as jest.Mock).mockResolvedValue([{ id: 1 }]);
        const result = await patientsService.getPatients();
        expect(result).toEqual([{ id: 1 }]);
        expect(prisma.patient.findMany).toHaveBeenCalled();
    });

    it('getPatient zwraca pacjenta po ID', async () => {
        (prisma.patient.findUnique as jest.Mock).mockResolvedValue({ id: 2 });
        const result = await patientsService.getPatient(2);
        expect(result).toEqual({ id: 2 });
        expect(prisma.patient.findUnique).toHaveBeenCalledWith({ where: { id: 2 } });
    });

    it('createPatient tworzy pacjenta', async () => {
        (prisma.patient.create as jest.Mock).mockResolvedValue({ id: 3 });
        const result = await patientsService.createPatient({ name: 'Jan' });
        expect(result).toEqual({ id: 3 });
        expect(prisma.patient.create).toHaveBeenCalledWith({ data: { name: 'Jan' } });
    });

    it('updatePatient aktualizuje pacjenta', async () => {
        (prisma.patient.update as jest.Mock).mockResolvedValue({ id: 4 });
        const result = await patientsService.updatePatient(4, { name: 'Anna' });
        expect(result).toEqual({ id: 4 });
        expect(prisma.patient.update).toHaveBeenCalledWith({ where: { id: 4 }, data: { name: 'Anna' } });
    });

    it('deletePatient usuwa pacjenta', async () => {
        (prisma.patient.delete as jest.Mock).mockResolvedValue({ id: 5 });
        const result = await patientsService.deletePatient(5);
        expect(result).toEqual({ id: 5 });
        expect(prisma.patient.delete).toHaveBeenCalledWith({ where: { id: 5 } });
    });
});