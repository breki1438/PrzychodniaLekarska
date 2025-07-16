import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="w-full bg-white shadow-md py-3 px-6 flex items-center justify-between mb-8 fixed">
            <Link href="/" className="text-2xl font-bold text-slate-800 tracking-tight">
                Recepcja sp.zooo
            </Link>
            <div className="flex gap-4">
                <Link
                    href="/add-patient"
                    className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-4 py-2 rounded-xl transition shadow"
                >
                    Dodaj pacjenta
                </Link>
                <Link
                    href="/add-appointment"
                    className="bg-green-600 hover:bg-green-700 text-white text-lg px-4 py-2 rounded-xl transition shadow"
                >
                    Dodaj wizytę
                </Link>
                <Link
                    href="/add-doctor"
                    className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-4 py-2 rounded-xl transition shadow"
                >
                    Dodaj lekarza
                </Link>
            </div>
        </nav>
    );
}