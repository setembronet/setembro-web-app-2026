import { Command, Calendar, Check, ChevronRight, Layout, Mail, MessageSquare, Search, User, X, LucideIcon } from 'lucide-react';

const createIcon = (Icon: LucideIcon) => {
    const WrappedIcon = (props: React.ComponentProps<LucideIcon>) => (
        <Icon {...props} aria-hidden="true" />
    );
    WrappedIcon.displayName = `Icon(${Icon.displayName || Icon.name || 'LucideIcon'})`;
    return WrappedIcon;
};

export const Icons = {
    logo: createIcon(Command),
    spinner: ({ className }: { className?: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    ),
    search: createIcon(Search),
    user: createIcon(User),
    check: createIcon(Check),
    calendar: createIcon(Calendar),
    chevronRight: createIcon(ChevronRight),
    mail: createIcon(Mail),
    message: createIcon(MessageSquare),
    close: createIcon(X),
    layout: createIcon(Layout)
};
