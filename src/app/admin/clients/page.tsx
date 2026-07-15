export const dynamic = "force-dynamic";

import Image from "next/image";
import { redirect } from "next/navigation";

import { prisma } from "src/lib/prisma";
import { requireAdmin } from "src/lib/admin";
import ConfirmDeleteForm from "src/components/admin/ConfirmDeleteForm";

async function deleteClient(formData: FormData) {
  "use server";

  const session = await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("Identifiant du client manquant.");
  }

  if (id === session.user.id) {
    throw new Error(
      "Vous ne pouvez pas supprimer votre propre compte administrateur."
    );
  }

  const client = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      role: true,
    },
  });

  if (!client) {
    throw new Error("Client introuvable.");
  }

  if (client.role === "ADMIN") {
    throw new Error(
      "Un compte administrateur ne peut pas être supprimé ici."
    );
  }

  await prisma.user.delete({
    where: { id },
  });

  redirect("/admin/clients");
}

export default async function AdminClientsPage() {
  await requireAdmin();

  const clients = await prisma.user.findMany({
    where: {
      role: "CLIENT",
    },
    orderBy: {
      createdAt: "desc",
    },
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
            {clients.map((client) => {
              const totalPaid = client.payments.reduce(
                (sum, payment) => sum + payment.amount,
                0
              );

              const currency =
                client.payments[0]?.currency?.toUpperCase() ?? "EUR";

              return (
                <div
                  key={client.id}
                  className="rounded-2xl border border-white/10 p-5"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-center gap-4">
                      {client.image ? (
                        <Image
                          src={client.image}
                          alt={client.name ?? client.email}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-medium">
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

                    <div className="grid gap-5 text-sm text-neutral-300 sm:grid-cols-2 lg:grid-cols-4">
                      <div>
                        <p className="text-neutral-500">Paiements</p>
                        <p className="mt-1">
                          {client.payments.length}
                        </p>
                      </div>

                      <div>
                        <p className="text-neutral-500">Montant total</p>
                        <p className="mt-1">
                          {(totalPaid / 100).toFixed(2)} {currency}
                        </p>
                      </div>

                      <div>
                        <p className="text-neutral-500">Audits</p>
                        <p className="mt-1">
                          {client.auditRequests.length}
                        </p>
                      </div>

                      <div>
                        <p className="text-neutral-500">Inscrit le</p>
                        <p className="mt-1">
                          {client.createdAt.toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex justify-end border-t border-white/10 pt-5">
                    <ConfirmDeleteForm
                      id={client.id}
                      action={deleteClient}
                      buttonLabel="Supprimer le client"
                      title="Supprimer ce client ?"
                      description={`Le compte ${client.email}, ses audits et ses paiements associés seront définitivement supprimés.`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}