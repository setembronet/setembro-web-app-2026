import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Agent {
    id: string;
    name: string;
    role: string;
    description?: string;
}

interface AgentSelectorProps {
    agents: Agent[];
    selectedId?: string;
    onSelect: (id: string) => void;
    className?: string;
}

export function AgentSelector({ agents, selectedId, onSelect, className }: AgentSelectorProps) {
    return (
        <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
            {agents.map((agent) => (
                <div
                    key={agent.id}
                    onClick={() => onSelect(agent.id)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelect(agent.id);
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selectedId === agent.id}
                    className={cn(
                        "relative cursor-pointer rounded-lg border p-4 transition-all hover:bg-accent/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        selectedId === agent.id
                            ? "border-accent ring-1 ring-accent bg-accent/5"
                            : "bg-card border-border hover:border-accent/50"
                    )}
                >
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-semibold text-foreground">{agent.name}</h4>
                            <p className="text-sm text-muted-foreground capitalize">{agent.role}</p>
                        </div>
                        {selectedId === agent.id && (
                            <div className="rounded-full bg-accent p-1 text-accent-foreground">
                                <Check className="h-3 w-3" />
                            </div>
                        )}
                    </div>
                    {agent.description && (
                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                            {agent.description}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
