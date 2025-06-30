import { getPatients, createPatient } from '@/services/patientsService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const patients = await getPatients();
        return NextResponse.json(patients);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const patient = await createPatient(data);
        return NextResponse.json(patient, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}