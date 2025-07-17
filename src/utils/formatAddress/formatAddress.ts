import { Address } from "@/services/copper/types"
import countries from "@/utils/iso-3166.json";


export default function formatAddress(address: Address): string | null {
  const country = countries.find((country) => {
    return country["alpha-2"] === address.country 
  })

  const parts = [
    address.street,
    address.city,
    address.state,
    address.postal_code,
    country?.name ?? address.country,
  ].filter(part => part && part.trim() !== '')

  return parts.length > 0 ? parts.join(', ').trim() : null
}