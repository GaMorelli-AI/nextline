import { CronogramaRico } from "@/features/obras/tabs/CronogramaRico";
import type { Obra } from "@/types";

export function CronogramaTab({ obra }: { obra: Obra }) {
  return <CronogramaRico obra={obra} />;
}
