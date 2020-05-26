export default function formatCitiesOptions(options) {
  if (options && Array.isArray(options)) {
    const formatted = options.map((item) => {
      return {
        value: item.nome,
        label: item.nome,
      }
    })
    
    return formatted;
  }
}
