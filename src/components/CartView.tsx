'use client';
import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartView() {
  const { items, updateQty, removeItem, subtotal } = useCart();

  if (!items || items.length === 0) {
    return (
      <div className='p-6'>
        <h2 className='text-lg font-medium'>Your cart is empty</h2>
        <p className='mt-2 text-sm text-gray-600'>Add products to get started.</p>
      </div>
    );
  }

  return (
    <div className='p-6'>
      <h2 className='text-xl font-semibold mb-4'>Cart</h2>
      <ul className='space-y-4'>
        {items.map((it) => (
          <li key={it.id} className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <img
                src={it.image || '/public/cart.png'}
                alt={it.name}
                className='w-16 h-16 object-cover rounded'
              />
              <div>
                <div className='font-medium'>{it.name}</div>
                <div className='text-sm text-gray-600'>${Number(it.price).toFixed(2)}</div>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <input
                aria-label={`Quantity for ${it.name}`}
                type='number'
                min={1}
                value={it.quantity}
                onChange={(e) => updateQty(it.id, Number(e.target.value))}
                className='w-20 border rounded px-2 py-1'
              />
              <div className='w-24 text-right font-medium'>${(Number(it.price) * it.quantity).toFixed(2)}</div>
              <button className='text-red-600 text-sm' onClick={() => removeItem(it.id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className='mt-6 flex items-center justify-between'>
        <div className='text-lg font-semibold'>Subtotal</div>
        <div className='text-lg font-semibold'>${Number(subtotal).toFixed(2)}</div>
      </div>

      <div className='mt-6 flex gap-3'>
        <Link href='/products' className='px-4 py-2 border rounded'>
          Continue shopping
        </Link>
        <Link href='/checkout' className='px-4 py-2 bg-blue-600 text-white rounded'>
          Checkout
        </Link>
      </div>
    </div>
  );
}
