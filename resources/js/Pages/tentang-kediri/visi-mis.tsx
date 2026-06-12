export default function VisiMisi({
    visi,
    misi,
}: any) {
    return (
        <div className="space-y-8">
            <div className="rounded-3xl bg-primary/5 p-8">
                <h3 className="text-lg font-bold text-center">
                    VISI
                </h3>

                <div className="text-center"
                    dangerouslySetInnerHTML={{
                        __html: visi.deskripsi,
                    }}
                />
            </div>

            <div>
                <h3 className="mb-6 text-lg font-bold text-center">
                    MISI
                </h3>

                <div className="space-y-4">
                    {misi.map(
                        (item: any, index: number) => (
                            <div
                                key={item.id}
                                className="rounded-xl border p-4"
                            >
                                <div className="flex gap-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                                        {index + 1}
                                    </div>

                                    <div>
                                        {item.deskripsi}
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}