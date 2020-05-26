export default function formatUfOptions(options) {
  if (options && Array.isArray(options)) {
    const formatted = options.map((item) => {
      return {
        value: item.sigla,
        label: item.sigla,
      }
    })
    
    return formatted;
  }
}
