export type ServiceCategory = 
  | 'development'
  | 'systems'
  | 'automation'
  | 'marketing'
  | 'seo'
  | 'design'
  | 'hosting';

export class Service {
  constructor(
    public readonly id: string,
    public readonly slug: string,
    public readonly name: string,
    public readonly description: string,
    public readonly category: ServiceCategory,
    public readonly features: string[],
    public readonly priceRange?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date
  ) {}

  // Domain logic can go here (e.g., validation, formatting)
}
