test('zwraca null dla nieistniejącego pacjenta i wywołuje findUnique z poprawnym id', async () => {
    const prisma = { patient: { findUnique: jest.fn().mockResolvedValue(null) } };
    const result = await getPatientById(prisma, 999);
    expect(result).toBeNull();
    expect(prisma.patient.findUnique).toHaveBeenCalledWith({ where: { id: 999 } });
});