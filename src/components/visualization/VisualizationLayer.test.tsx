import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { VisualizationLayer } from './VisualizationLayer';

describe('VisualizationLayer', () => {
  it('should render JsonView when viewType is JSON', () => {
    const data = { test: 'value' };
    
    render(<VisualizationLayer data={data} viewType="JSON" />);
    
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText(/value/)).toBeInTheDocument();
  });

  it('should render TableView when viewType is Table', () => {
    const data = [{ id: 1, name: 'Test' }];
    
    render(<VisualizationLayer data={data} viewType="Table" />);
    
    expect(screen.getByText('id')).toBeInTheDocument();
    expect(screen.getByText('name')).toBeInTheDocument();
  });

  it('should render ChartView when viewType is Chart', () => {
    // For non-chartable data, ChartView shows a fallback message
    const data = { single: 'value' };
    
    render(<VisualizationLayer data={data} viewType="Chart" />);
    
    // ChartView renders fallback for non-array data without numeric values
    expect(screen.getByText(/cannot visualize|data points/i)).toBeInTheDocument();
  });
});
