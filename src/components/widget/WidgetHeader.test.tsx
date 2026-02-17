import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { WidgetHeader } from './WidgetHeader';

describe('WidgetHeader', () => {
  const defaultProps = {
    title: 'Test Widget',
    isEditable: true,
    onEdit: vi.fn(),
    onDelete: vi.fn(),
  };

  it('should render widget title', () => {
    render(<WidgetHeader {...defaultProps} />);
    
    expect(screen.getByText('Test Widget')).toBeInTheDocument();
  });

  it('should show edit and delete buttons when editable', () => {
    render(<WidgetHeader {...defaultProps} />);
    
    expect(screen.getByTitle('Settings')).toBeInTheDocument();
    expect(screen.getByTitle('Delete')).toBeInTheDocument();
  });

  it('should hide edit and delete buttons when not editable', () => {
    render(<WidgetHeader {...defaultProps} isEditable={false} />);
    
    expect(screen.queryByTitle('Settings')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Delete')).not.toBeInTheDocument();
  });

  it('should call onEdit when settings button is clicked', async () => {
    const onEdit = vi.fn();
    render(<WidgetHeader {...defaultProps} onEdit={onEdit} />);
    
    await userEvent.click(screen.getByTitle('Settings'));
    
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('should call onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    render(<WidgetHeader {...defaultProps} onDelete={onDelete} />);
    
    await userEvent.click(screen.getByTitle('Delete'));
    
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('should show drag handle icon when editable', () => {
    render(<WidgetHeader {...defaultProps} />);
    
    // GripVertical icon should be present
    expect(document.querySelector('.widget-drag-handle')).toBeInTheDocument();
  });
});
