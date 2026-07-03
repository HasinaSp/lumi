// src/app/admin/clients/page.tsx
import Image from "next/image";
import { prisma } from "src/lib/prisma";

export default async function AdminClientsPage() {
  const clients = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      auditRequests: true,
      payments: true,
    },
  });

  return (
    <div>
      <p className="text-sm uppercase tracking-[0.35em] text-neutral-400">
        Clients
      </p>

      <h1 className="mt-3 text-4xl font-semibold">
        Tous les clients
      </h1>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
        {clients.length === 0 ? (
          <p className="py-10 text-center text-neutral-400">
            Aucun client pour le moment.
          </p>
        ) : (
          <div className="space-y-4">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 p-5 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-4">
                  {client.image ? (
                    <Image
                      src={client.image}
                      alt={client.name ?? client.email}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-sm">
                      {client.email.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <h2 className="font-medium">
                      {client.name ?? "Client sans nom"}
                    </h2>

                    <p className="text-sm text-neutral-400">
                      {client.email}
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 text-sm text-neutral-300 md:grid-cols-3 md:text-right">
                  <div>
                    <p className="text-neutral-500">Rôle</p>
                    <p>{client.role}</p>
                  </div>

                  <div>
                    <p className="text-neutral-500">Paiements</p>
                    <p>{client.payments.length} Paiement(s)</p>
                    <p>
                      {(client.payments.reduce((sum, p) => sum + p.amount, 0) / 100).toFixed(2)}€
                    </p>
                  </div>

                  <div>
                    <p className="text-neutral-500">Audits</p>
                    <p>{client.auditRequests.length}</p>
                  </div>

                  <div>
                    <p className="text-neutral-500">Inscrit le</p>
                    <p>{client.createdAt.toLocaleDateString("fr-FR")}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
