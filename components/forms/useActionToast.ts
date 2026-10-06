"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

import type { ActionResponse } from "@/types";

// Každé odeslání vrací nový objekt stavu → efekt se spustí po každé odpovědi akce
export function useActionToast<T>(state: ActionResponse<T>) {
  useEffect(() => {
    if (!state.submitted) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);
}

export const initialActionState = { submitted: false, success: false, message: "" };
