import { describe, it, expect, beforeEach } from 'vitest';
import { useDashboardStore } from './dashboardStore';

describe('dashboardStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useDashboardStore.setState({
      isEditable: true,
      globalApiConfig: {
        endpoint: '',
        type: 'REST',
        method: 'GET',
        headers: {},
        body: '',
        variables: '',
      },
      widgets: [],
    });
  });

  describe('toggleEditable', () => {
    it('should toggle isEditable from true to false', () => {
      const { toggleEditable } = useDashboardStore.getState();
      expect(useDashboardStore.getState().isEditable).toBe(true);
      
      toggleEditable();
      
      expect(useDashboardStore.getState().isEditable).toBe(false);
    });

    it('should toggle isEditable from false to true', () => {
      useDashboardStore.setState({ isEditable: false });
      const { toggleEditable } = useDashboardStore.getState();
      
      toggleEditable();
      
      expect(useDashboardStore.getState().isEditable).toBe(true);
    });
  });

  describe('setGlobalApiConfig', () => {
    it('should update global API config', () => {
      const { setGlobalApiConfig } = useDashboardStore.getState();
      const newConfig = {
        endpoint: 'https://api.example.com',
        type: 'REST' as const,
        method: 'POST' as const,
        headers: { Authorization: 'Bearer token' },
        body: '{"test": true}',
      };

      setGlobalApiConfig(newConfig);

      expect(useDashboardStore.getState().globalApiConfig).toEqual(newConfig);
    });
  });

  describe('addWidget', () => {
    it('should add a new widget with default values', () => {
      const { addWidget } = useDashboardStore.getState();
      
      addWidget();

      const widgets = useDashboardStore.getState().widgets;
      expect(widgets).toHaveLength(1);
      expect(widgets[0].title).toBe('New Widget');
      expect(widgets[0].useGlobalEndpoint).toBe(true);
      expect(widgets[0].viewType).toBe('JSON');
    });

    it('should add a widget with custom values', () => {
      const { addWidget } = useDashboardStore.getState();
      
      addWidget({
        title: 'Custom Widget',
        viewType: 'Table',
        useGlobalEndpoint: false,
      });

      const widgets = useDashboardStore.getState().widgets;
      expect(widgets).toHaveLength(1);
      expect(widgets[0].title).toBe('Custom Widget');
      expect(widgets[0].viewType).toBe('Table');
      expect(widgets[0].useGlobalEndpoint).toBe(false);
    });

    it('should generate unique IDs for widgets', () => {
      const { addWidget } = useDashboardStore.getState();
      
      addWidget();
      addWidget();

      const widgets = useDashboardStore.getState().widgets;
      expect(widgets[0].id).not.toBe(widgets[1].id);
    });
  });

  describe('updateWidget', () => {
    it('should update an existing widget', () => {
      const { addWidget, updateWidget } = useDashboardStore.getState();
      
      addWidget({ title: 'Original Title' });
      const widgetId = useDashboardStore.getState().widgets[0].id;
      
      updateWidget(widgetId, { title: 'Updated Title' });

      expect(useDashboardStore.getState().widgets[0].title).toBe('Updated Title');
    });

    it('should not affect other widgets', () => {
      const { addWidget, updateWidget } = useDashboardStore.getState();
      
      addWidget({ title: 'Widget 1' });
      addWidget({ title: 'Widget 2' });
      const widgetId = useDashboardStore.getState().widgets[0].id;
      
      updateWidget(widgetId, { title: 'Updated Widget 1' });

      const widgets = useDashboardStore.getState().widgets;
      expect(widgets[0].title).toBe('Updated Widget 1');
      expect(widgets[1].title).toBe('Widget 2');
    });
  });

  describe('removeWidget', () => {
    it('should remove a widget by ID', () => {
      const { addWidget, removeWidget } = useDashboardStore.getState();
      
      addWidget({ title: 'Widget 1' });
      addWidget({ title: 'Widget 2' });
      const widgetIdToRemove = useDashboardStore.getState().widgets[0].id;
      
      removeWidget(widgetIdToRemove);

      const widgets = useDashboardStore.getState().widgets;
      expect(widgets).toHaveLength(1);
      expect(widgets[0].title).toBe('Widget 2');
    });
  });

  describe('updateLayout', () => {
    it('should update widget layouts', () => {
      const { addWidget, updateLayout } = useDashboardStore.getState();
      
      addWidget();
      const widgetId = useDashboardStore.getState().widgets[0].id;
      
      updateLayout([
        { i: widgetId, x: 5, y: 10, w: 6, h: 4 },
      ]);

      const widget = useDashboardStore.getState().widgets[0];
      expect(widget.layout.x).toBe(5);
      expect(widget.layout.y).toBe(10);
      expect(widget.layout.w).toBe(6);
      expect(widget.layout.h).toBe(4);
    });
  });
});
