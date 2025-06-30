import { getAppointmentById, updateAppointment, deleteAppointment, createAppointment, getAppointments } from '@/services/appointmentsService';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        const appointment = await updateAppointment(Number(params.id), data);
        return NextResponse.json(appointment);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        await deleteAppointment(Number(params.id));
        return NextResponse.json({ message: 'Deleted' });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        const appointment = await getAppointmentById(Number(params.id));
        if (!appointment) {
            return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
        }
        return NextResponse.json(appointment);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}