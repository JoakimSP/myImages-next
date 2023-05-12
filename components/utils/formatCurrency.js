const CURRENCY_FORMATTER =  new Intl.NumberFormat(undefined, {
    currency: "SEK", style: "currency"
})

export default function formatCurrency(number) {
  return (
        CURRENCY_FORMATTER.format(number)
  )
}
