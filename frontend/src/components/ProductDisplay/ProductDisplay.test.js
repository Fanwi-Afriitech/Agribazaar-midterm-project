import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductDisplay from './ProductDisplay';
import { StoreContext } from '../../context/StoreContext';
import ProductItem from '../ProductItem/ProductItem';

/*Filters items based on category (All): Ensures that all items are rendered when the category is "All".

Filters items based on specific category: Checks that only items matching the specified category are displayed.

Renders no items when category filter matches none: Verifies that no items are rendered when there's no match for the category.

Renders the "Top picks for you" heading: Verifies the presence of the heading element.*/


jest.mock('../../context/StoreContext');
jest.mock('../ProductItem/ProductItem'); // Mock ProductItem for simpler testing

describe('ProductDisplay component', () => {
  const mockItemList = [
    {
      _id: 1,
      name: 'Product A',
      description: 'Product description A',
      price: 100,
      image: 'product_image_a.jpg',
      category: 'Electronics'
    },
    {
      _id: 2,
      name: 'Product B',
      description: 'Product description B',
      price: 200,
      image: 'product_image_b.jpg',
      category: 'Clothing'
    },
  ];

  const renderProductDisplay = (category = 'All', item_list = mockItemList) => {
    return render(
      <StoreContext.Provider value={{ item_list }}>
        <ProductDisplay category={category} />
      </StoreContext.Provider>
    );
  };

  it('renders "Top picks for you" heading', () => {
    renderProductDisplay();

    expect(screen.getByText('Top picks for you')).toBeInTheDocument();
  });

  it('filters items based on category (All)', () => {
    renderProductDisplay();

    expect(screen.getAllByRole('article')).toHaveLength(2); // Expect both items to be rendered

    // You can also test the rendered ProductItem props if needed
    // const productItemA = screen.getByTestId('product-item-1'); // Assuming ProductItem uses data-testid
    // expect(ProductItem).toHaveBeenCalledWith(mockItemList[0]); // Verify props passed to ProductItem
  });

  it('filters items based on specific category', () => {
    renderProductDisplay('Electronics');

    expect(screen.getAllByRole('article')).toHaveLength(1); // Expect only Electronics item to be rendered

    // You can also test the rendered ProductItem props here
  });

  it('renders no items when category filter matches none', () => {
    renderProductDisplay('Nonexistent');

    expect(screen.queryByRole('article')).toBeNull(); // Expect no items to be rendered
  });
});
