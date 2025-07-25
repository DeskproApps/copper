import formatAddress from './formatAddress'
import { Address } from '@/services/copper/types'

describe('formatAddress', () => {
  const mockUSAddress: Address = {
    street: '42 Jest Road',
    city: 'Springfield',
    state: 'TX', 
    postal_code: 'WOO WAH',
    country: 'US'
  }

  it('should format a complete US address correctly', () => {
    const result = formatAddress(mockUSAddress)
    expect(result).toBe('42 Jest Road, Springfield, TX, WOO WAH, USA')
  })

  it('should handle missing street', () => {
    const address = { ...mockUSAddress, street: null }
    const result = formatAddress(address)
    expect(result).toBe('Springfield, TX, WOO WAH, USA')
  })

  it('should handle missing postal code', () => {
    const address = { ...mockUSAddress, postal_code: null }
    const result = formatAddress(address)
    expect(result).toBe('42 Jest Road, Springfield, TX, USA')
  })

  it('should handle address with just city and state', () => {
    const address = { 
      ...mockUSAddress, 
      street: null,
      postal_code: null
    }
    const result = formatAddress(address)
    expect(result).toBe('Springfield, TX, USA')
  })

  it('should handle an address with unknown country code', () => {
    const address = { ...mockUSAddress, country: 'Deskpro Land' }
    const result = formatAddress(address)
    expect(result).toBe('42 Jest Road, Springfield, TX, WOO WAH, Deskpro Land')
  })

  it('should handle empty address', () => {
    const address: Address = {
      street: null,
      city: null,
      state: null,
      postal_code: null,
      country: null
    }
    const result = formatAddress(address)
    expect(result).toBeNull()
  })

  it('should handle an address without a country', () => {
    const address: Address = {
      street: null,
      city: null,
      state: null,
      postal_code: "WOO WAH",
      country: null
    }
    const result = formatAddress(address)
    expect(result).toBe("WOO WAH")
  })

  it('should handle an address with just zip code and country', () => {
    const address: Address = {
      street: null,
      city: null,
      state: null,
      postal_code: '90210',
      country: 'US'
    }
    const result = formatAddress(address)
    expect(result).toBe('90210, USA')
  })

  it('should handle an address with just state and country', () => {
    const address: Address = {
      street: null,
      city: null,
      state: 'CA',
      postal_code: null,
      country: 'US'
    }
    const result = formatAddress(address)
    expect(result).toBe('CA, USA')
  })

  it('should handle an address with street and country only', () => {
    const address: Address = {
      street: '1600 Pennsylvania Ave',
      city: null,
      state: null,
      postal_code: null,
      country: 'US'
    }
    const result = formatAddress(address)
    expect(result).toBe('1600 Pennsylvania Ave, USA')
  })
})