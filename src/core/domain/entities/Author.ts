export class Author {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly bio?: string,
        public readonly avatarUrl?: string,
        public readonly socialLinks: Record<string, string> = {},
        public readonly createdAt?: Date,
        public readonly updatedAt?: Date
    ) { }
}
