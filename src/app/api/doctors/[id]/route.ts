import { getDoctor, updateDoctor, deleteDoctor } from '@/services/doctorService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        const doctor = await getDoctor(Number(params.id));
        return NextResponse.json(doctor);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await req.json();
        const doctor = await updateDoctor(Number(params.id), data);
        return NextResponse.json(doctor);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
    try {
        await deleteDoctor(Number(params.id));
        return NextResponse.json({ message: 'Deleted' });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}