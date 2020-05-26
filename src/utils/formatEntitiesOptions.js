export default function formatEntitiesOptions(options) {
  if (options && Array.isArray(options)) {
    const formatted = options.map((item) => {
      return {
        value: item.NomeFantasia,
        label: `${item.NomeFantasia} - ${item.RazaoSocial}`,
      }
    })
    
    return formatted;
  }
}
