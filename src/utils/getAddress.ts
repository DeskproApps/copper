import { get, find, isEmpty } from "lodash";
import countries from "./iso-3166.json";
import type { Maybe } from "../types";
import type { Address } from "../api/types";

const getAddress = (address?: Maybe<Partial<Address>>): string => {

  const country = find(countries, { "alpha-2": get(address, ["country"]) });

  const fullAddress = [
    get(address, ["street"]),
    get(address, ["city"]),
    get(address, ["state"]),
    get(address, ["postal_code"]),
    get(country, ["name"]),
  ].filter(Boolean);

  if (isEmpty(fullAddress)) {
    return "-";
  }

  return fullAddress.join(", ");
};

export { getAddress };
