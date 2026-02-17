import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { ApiConfig, Widget, WidgetLayout } from '@/types';

interface DashboardState {
  isEditable: boolean;
  globalApiConfig: ApiConfig;
  widgets: Widget[];
  // Actions
  toggleEditable: () => void;
  setGlobalApiConfig: (config: ApiConfig) => void;
  addWidget: (widget?: Partial<Widget>) => void;
  updateWidget: (id: string, updates: Partial<Widget>) => void;
  removeWidget: (id: string) => void;
  updateLayout: (layouts: WidgetLayout[]) => void;
}

const DEFAULT_GLOBAL_API_CONFIG: ApiConfig = {
  endpoint: '',
  type: 'REST',
  method: 'GET',
  headers: {},
  body: '',
  variables: '',
};

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      isEditable: true,
      globalApiConfig: DEFAULT_GLOBAL_API_CONFIG,
      widgets: [],

      toggleEditable: () =>
        set((state) => ({ isEditable: !state.isEditable })),

      setGlobalApiConfig: (config) =>
        set({ globalApiConfig: config }),

      addWidget: (widget) => {
        const id = uuidv4();
        const newWidget: Widget = {
          id,
          title: widget?.title || 'New Widget',
          layout: widget?.layout || {
            i: id,
            x: 0,
            y: Infinity, // Put it at the bottom
            w: 4,
            h: 3,
            minW: 2,
            minH: 2,
          },
          useGlobalEndpoint: widget?.useGlobalEndpoint ?? true,
          localApiConfig: widget?.localApiConfig,
          viewType: widget?.viewType || 'JSON',
          dataKey: widget?.dataKey,
        };
        set((state) => ({
          widgets: [...state.widgets, newWidget],
        }));
      },

      updateWidget: (id, updates) =>
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, ...updates } : w
          ),
        })),

      removeWidget: (id) =>
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
        })),

      updateLayout: (layouts) =>
        set((state) => ({
          widgets: state.widgets.map((widget) => {
            const layout = layouts.find((l) => l.i === widget.id);
            if (layout) {
              return { ...widget, layout };
            }
            return widget;
          }),
        })),
    }),
    {
      name: 'dashboard-storage',
    }
  )
);
