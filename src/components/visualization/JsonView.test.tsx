import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { JsonView } from './JsonView';

describe('JsonView', () => {
  it('should render JSON data as formatted string', () => {
    const data = { name: 'test', value: 123 };
    
    render(<JsonView data={data} />);
    
    expect(screen.getByText(/name/)).toBeInTheDocument();
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText(/123/)).toBeInTheDocument();
  });

  it('should render array data', () => {
    const data = [1, 2, 3];
    
    render(<JsonView data={data} />);
    
    expect(screen.getByText(/1/)).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  it('should render null data', () => {
    render(<JsonView data={null} />);
    
    expect(screen.getByText('null')).toBeInTheDocument();
  });

  it('should render nested objects', () => {
    const data = { outer: { inner: 'value' } };
    
    render(<JsonView data={data} />);
    
    expect(screen.getByText(/outer/)).toBeInTheDocument();
    expect(screen.getByText(/inner/)).toBeInTheDocument();
    expect(screen.getByText(/value/)).toBeInTheDocument();
  });
});
