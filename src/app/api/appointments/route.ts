import { createAppointment, getAppointments } from '@/services/appointmentsService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const appointments = await getAppointments();
        return NextResponse.json(appointments);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const appointment = await createAppointment(data);
        return NextResponse.json(appointment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}