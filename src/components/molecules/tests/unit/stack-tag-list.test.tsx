import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { StackTagList } from '@/components/molecules/stack-tag-list';

describe('StackTagList', () => {
  it('renders each stack item as a badge', () => {
    render(<StackTagList items={['TypeScript', 'React', 'Next.js']} />);

    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('renders an optional label', () => {
    render(<StackTagList items={['Vitest']} label="Testing" />);

    expect(screen.getByText('Testing')).toBeInTheDocument();
  });

  it('omits the label when not provided', () => {
    const { container } = render(<StackTagList items={['Vitest']} />);

    expect(container.querySelector('.eyebrow')).not.toBeInTheDocument();
  });
});
