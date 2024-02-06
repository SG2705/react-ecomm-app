import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Downloads from './downloads';

describe('Downloads Component', () => {
    test('renders download buttons', () => {
        // Checking if the buttons are there or not
        render(<Downloads />);

        const invoiceButton = screen.getByText("Invoice");
        const trackButton = screen.getByText("Track");

        expect(invoiceButton).toBeInTheDocument();
        expect(trackButton).toBeInTheDocument();
    });

    // Testing that the click on Invoice button should return a blob to download
    test('clicking on Invoice button triggers downloadInvoice function', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                blob: () => Promise.resolve(new Blob([])),
            })
        );
    });
});
