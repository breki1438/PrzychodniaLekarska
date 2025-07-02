import * as appointmentsService from '../appointmentsService';
import prisma from '../../lib/prisma';
import * as patientsService from '../patientsService';

jest.mock('../../lib/prisma', () => ({
    appointment: {
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        findUnique: jest.fn(),
    },
}));
jest.mock('../patientsService');

describe('appointmentsService', () => {
    afterEach(() => jest.clearAllMocks());

    it('getAppointments zwraca listę wizyt', async () => {
        (prisma.appointment.findMany as jest.Mock).mockResolvedValue([{ id: 1 }]);
        const result = await appointmentsService.getAppointments();
        expect(result).toEqual([{ id: 1 }]);
        expect(prisma.appointment.findMany).toHaveBeenCalled();
    });

    it('createAppointment rzuca błąd, gdy pacjent nie istnieje', async () => {
        (patientsService.getPatient as jest.Mock).mockResolvedValue(null);
        await expect(appointmentsService.createAppointment({ patientId: 1 }))
            .rejects.toThrow('Patient not found');
    });

    it('createAppointment tworzy wizytę, gdy pacjent istnieje', async () => {
        (patientsService.getPatient as jest.Mock).mockResolvedValue({ id: 1 });
        (prisma.appointment.create as jest.Mock).mockResolvedValue({ id: 2 });
        const result = await appointmentsService.createAppointment({ patientId: 1 });
        expect(result).toEqual({ id: 2 });
        expect(prisma.appointment.create).toHaveBeenCalled();
    });

    it('updateAppointment aktualizuje wizytę', async () => {
        (prisma.appointment.update as jest.Mock).mockResolvedValue({ id: 3 });
        const result = await appointmentsService.updateAppointment(3, { data: 123 });
        expect(result).toEqual({ id: 3 });
        expect(prisma.appointment.update).toHaveBeenCalledWith({ where: { id: 3 }, data: { data: 123 } });
    });

    it('deleteAppointment usuwa wizytę', async () => {
        (prisma.appointment.delete as jest.Mock).mockResolvedValue({ id: 4 });
        const result = await appointmentsService.deleteAppointment(4);
        expect(result).toEqual({ id: 4 });
        expect(prisma.appointment.delete).toHaveBeenCalledWith({ where: { id: 4 } });
    });

    it('getAppointmentById zwraca wizytę po ID', async () => {
        (prisma.appointment.findUnique as jest.Mock).mockResolvedValue({ id: 5 });
        const result = await appointmentsService.getAppointmentById(5);
        expect(result).toEqual({ id: 5 });
        expect(prisma.appointment.findUnique).toHaveBeenCalledWith({ where: { id: 5 }, include: { patient: true } });
    });
});