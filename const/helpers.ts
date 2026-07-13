export function getCategoryColour(category: string): string {
    const categoryColours: { [key: string]: string } = {
        'Fungi': '#add3ad',
        'Fruit': '#a3b6a3',
        'Flowers': '#6fbb6f',
        'Leaves': '#C8DFC8',
        'Nuts': '#6fbb6f',
    };
    return categoryColours[category] || '#C8DFC8';
}