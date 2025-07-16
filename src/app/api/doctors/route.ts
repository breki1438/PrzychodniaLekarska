import { getDoctors, createDoctor } from '@/services/doctorService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    try {
        const doctors = await getDoctors();
        return NextResponse.json(doctors);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const doctor = await createDoctor(data);
        return NextResponse.json(doctor, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}