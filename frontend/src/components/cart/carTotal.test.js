import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import CartTotal from './cartTotal';

describe('Testing CartTotal Component', () => {
    test('renders cart total correctly', () => {
        // Sample Data
        const cart = [
            { id: 1, name: 'Product 1', quantity: 2, price: 10 },
            { id: 2, name: 'Product 2', quantity: 1, price: 15 },
        ];

        const { getByText } = render(<CartTotal cart={cart} />);

        // Test Cart Total
        const cartTotalElement = getByText("Cart Total:");
        expect(cartTotalElement).toBeInTheDocument();

        // Test Tax
        const taxElement = getByText("Tax:");
        expect(taxElement).toBeInTheDocument();

        // Test Sub Total
        const subTotalElement = getByText("Sub Total:");
        expect(subTotalElement).toBeInTheDocument();

        // Check if the cart total is displayed correctly based on the provided data
        const expectedCartTotal = Math.ceil((2 * 10 + 1 * 15) * 1.18);
        expect(getByText(new RegExp(expectedCartTotal))).toBeInTheDocument();

        // Check if the tax is displayed correctly based on the provided data
        const expectedTax = Math.ceil((2 * 10 + 1 * 15) * 0.18);
        expect(getByText(new RegExp(expectedTax))).toBeInTheDocument();

        // Check if the sub total is displayed correctly based on the provided data
        const expectedSubTotal = 2 * 10 + 1 * 15;
        expect(getByText(new RegExp(expectedSubTotal))).toBeInTheDocument();
    });
});
