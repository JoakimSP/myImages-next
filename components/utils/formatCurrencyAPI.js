const CURRENCY_FORMATTER =  new Intl.NumberFormat("en-us", {
    currency: "USD", style: "currency"
})

export default function formatCurrencyAPI(number) {
  return (
        CURRENCY_FORMATTER.format(number)
  )
}