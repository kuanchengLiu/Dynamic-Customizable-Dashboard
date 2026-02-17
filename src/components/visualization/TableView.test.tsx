import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import { TableView } from './TableView';

describe('TableView', () => {
  describe('Array of objects', () => {
    it('should render table headers from object keys', () => {
      const data = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
      
      render(<TableView data={data} />);
      
      expect(screen.getByText('id')).toBeInTheDocument();
      expect(screen.getByText('name')).toBeInTheDocument();
    });

    it('should render table rows with data', () => {
      const data = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ];
      
      render(<TableView data={data} />);
      
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });
  });

  describe('Single object', () => {
    it('should render key-value pairs', () => {
      const data = { id: 1, name: 'Test' };
      
      render(<TableView data={data} />);
      
      expect(screen.getByText('Key')).toBeInTheDocument();
      expect(screen.getByText('Value')).toBeInTheDocument();
      expect(screen.getByText('id')).toBeInTheDocument();
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('name')).toBeInTheDocument();
      expect(screen.getByText('Test')).toBeInTheDocument();
    });
  });

  describe('Fallback', () => {
    it('should show fallback message for non-object data', () => {
      render(<TableView data="just a string" />);
      
      expect(screen.getByText(/Unable to render data as table/)).toBeInTheDocument();
    });

    it('should show fallback for empty array', () => {
      render(<TableView data={[]} />);
      
      expect(screen.getByText(/Unable to render data as table/)).toBeInTheDocument();
    });
  });
});
