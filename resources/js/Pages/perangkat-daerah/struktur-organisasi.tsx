import { Opd } from "@/types/opd";

interface Props {
    opd: Opd[];
}

export default function StrukturOrganisasi({
    opd,
}: Props) {
    return (
        <div className="space-y-6">
            {opd.map((item) => (
                <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl border bg-white"
                >
                    <img
                        src={`/storage/opd/${item.logo}`}
                        alt={item.nama}
                        className="w-full h-auto"
                    />
                </div>
            ))}
        </div>
    );
}