import { Sun, Moon } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Card, CardHeader, CardBody } from "@/components/ui/Card";
import { Label, Input, Select } from "@/components/ui/Input";
import { Switch } from "@/components/ui/Switch";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/ui/Avatar";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const notificacoesConfig = [
  { titulo: "Atrasos de cronograma", descricao: "Alertas quando uma atividade entra em atraso.", padrao: true },
  { titulo: "Novas não conformidades", descricao: "Notificar ao abrir uma nova NC em qualquer obra.", padrao: true },
  { titulo: "Aprovações pendentes", descricao: "Lembrete diário de medições aguardando aprovação.", padrao: true },
  { titulo: "Documentos vencendo", descricao: "Aviso 30 dias antes do vencimento de ARTs e laudos.", padrao: false },
  { titulo: "Resumo semanal por e-mail", descricao: "Envio de relatório executivo toda segunda-feira.", padrao: true },
];

export function ConfiguracoesPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6">
      <PageHeader eyebrow="Administração" title="Configurações" subtitle="Preferências da conta, organização e notificações." />

      <Card>
        <CardHeader title="Aparência" subtitle="Escolha como a NextLine é exibida no seu dispositivo" />
        <CardBody>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => setTheme("dark")}
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius-md)] border p-4 text-left transition-colors",
                theme === "dark" ? "border-emerald-400/40 bg-gradient-brand-soft" : "border-ink/10 hover:bg-ink/[0.03]"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] bg-navy-950 text-slate-100">
                <Moon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[13.5px] font-medium text-slate-100">Modo Escuro</p>
                <p className="text-[12px] text-slate-500">Navy profundo, ideal para uso prolongado</p>
              </div>
            </button>
            <button
              onClick={() => setTheme("light")}
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius-md)] border p-4 text-left transition-colors",
                theme === "light" ? "border-emerald-400/40 bg-gradient-brand-soft" : "border-ink/10 hover:bg-ink/[0.03]"
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-sm)] border border-ink/10 bg-white text-slate-700">
                <Sun className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[13.5px] font-medium text-slate-100">Modo Claro</p>
                <p className="text-[12px] text-slate-500">Superfícies claras, alto contraste em ambientes iluminados</p>
              </div>
            </button>
          </div>
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Perfil" subtitle="Informações da sua conta NextLine" />
          <CardBody>
            <div className="flex items-center gap-4">
              <Avatar initials="GM" size="lg" />
              <div>
                <p className="text-[15px] font-semibold text-slate-100">Gabriel Morelli</p>
                <p className="text-[12.5px] text-slate-500">Administrador · Kingline Engenharia</p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label>Nome completo</Label>
                <Input defaultValue="Gabriel Morelli" />
              </div>
              <div>
                <Label>E-mail</Label>
                <Input defaultValue="gabriel@newxsolutions.com.br" />
              </div>
              <div>
                <Label>Cargo</Label>
                <Input defaultValue="Administrador" />
              </div>
              <div>
                <Label>Fuso horário</Label>
                <Select defaultValue="America/Sao_Paulo">
                  <option value="America/Sao_Paulo">América/São Paulo (GMT-3)</option>
                  <option value="America/Manaus">América/Manaus (GMT-4)</option>
                </Select>
              </div>
            </div>
            <Button variant="primary" className="mt-5">
              Salvar alterações
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Organização" subtitle="Unidade ativa" />
          <CardBody className="space-y-4">
            <div>
              <Label>Organização</Label>
              <Select defaultValue="Kingline Engenharia">
                <option>Kingline Engenharia</option>
                <option>New X Soluções</option>
                <option>NextLine Holding</option>
              </Select>
            </div>
            <div>
              <Label>Unidade padrão</Label>
              <Select defaultValue="Unidade São Paulo">
                <option>Unidade São Paulo</option>
                <option>Sede RJ</option>
                <option>Unidade Brasília</option>
              </Select>
            </div>
            <div>
              <Label>Idioma</Label>
              <Select defaultValue="pt-BR">
                <option value="pt-BR">Português (Brasil)</option>
              </Select>
            </div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader title="Notificações" subtitle="Escolha quais eventos geram alertas" />
        <CardBody className="space-y-1">
          {notificacoesConfig.map((n) => (
            <div key={n.titulo} className="flex items-center justify-between border-b border-ink/[0.06] py-3.5 last:border-0">
              <div>
                <p className="text-[13.5px] font-medium text-slate-200">{n.titulo}</p>
                <p className="text-[12px] text-slate-500">{n.descricao}</p>
              </div>
              <Switch defaultChecked={n.padrao} />
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
