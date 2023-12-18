const CURRENCY_FORMATTER =  new Intl.NumberFormat("en-us", {
    currency: "EUR", style: "currency"
})

export default function formatCurrency(number) {
  return (
        CURRENCY_FORMATTER.format(number)
  )
}
