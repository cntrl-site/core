import { Layout } from '../../layout/Layout';

export function getClosestLayoutValue<V>(map: Record<string, V>, layouts: Layout[], layoutId: string): V {
  const index = layouts.findIndex(l => l.id === layoutId);
  if (index === -1) {
    throw new Error(`No layout was found by the given id #${layoutId}`);
  }
  const order = [
    layouts[index],
    ...layouts.slice(index + 1),
    ...layouts.slice(0, index).reverse()
  ];
  const found = order.find(layout => map.hasOwnProperty(layout.id));
  if (!found) {
    throw new Error('No layout data found');
  }
  return map[found.id];
}

export function getLayoutMediaQuery(layoutId: string, layouts: Layout[]): string {
  const sorted = layouts.slice().sort((a, b) => a.startsWith - b.startsWith);
  const layoutIndex = sorted.findIndex(l => l.id === layoutId);
  if (layoutIndex === -1) {
    throw new Error(`No layout was found by the given id #${layoutId}`);
  }
  const current = sorted[layoutIndex];
  const next = sorted[layoutIndex + 1];
  if (!next) {
    return `@media (min-width: ${current.startsWith}px)`;
  }
  return `@media (min-width: ${current.startsWith}px) and (max-width: ${next.startsWith - 1}px)`;
}
