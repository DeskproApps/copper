const formatPrice = (price?: number, currency?: string): string => {
  return (new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })).format(price || 0)
};

export { formatPrice };
