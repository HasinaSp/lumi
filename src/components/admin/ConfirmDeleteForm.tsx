"use client";

import { useState } from "react";

type ConfirmDeleteFormProps = {
  id: string;
  action: (formData: FormData) => void | Promise<void>;
  title?: string;
  description?: string;
  buttonLabel?: string;
  className?: string;
};

export default function ConfirmDeleteForm({
  id,
  action,
  title = "Confirmer la suppression",
  description = "Cette action est définitive et ne peut pas être annulée.",
  buttonLabel = "Supprimer",
  className = "",
}: ConfirmDeleteFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          className ||
          "rounded-full bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700"
        }
      >
        {buttonLabel}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => {
            if (!isSubmitting) setIsOpen(false);
          }}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-white p-7 text-neutral-950 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="delete-dialog-title" className="text-2xl font-semibold">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {description}
            </p>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-neutral-300 px-5 py-3 text-sm font-medium disabled:opacity-50"
              >
                Annuler
              </button>

              <form
                action={action}
                onSubmit={() => setIsSubmitting(true)}
              >
                <input type="hidden" name="id" value={id} />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Suppression..." : "Confirmer la suppression"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
