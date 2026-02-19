import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function AuthErrorPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center dark:bg-gray-900">
            <AlertTriangle className="h-16 w-16 text-yellow-500 mb-4" />
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
                Erro de Autenticação
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                Não foi possível verificar suas credenciais. Isso pode ocorrer se o link expirou ou se houve um problema temporário.
            </p>
            <div className="mt-8 flex gap-4">
                <Button asChild>
                    <Link href="/login">Tentar Novamente</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/">Voltar ao Início</Link>
                </Button>
            </div>
        </div>
    );
}
