export default function formatProfessionOptions(options) {
  if (options && Array.isArray(options)) {
    const formatted = options.map((item) => {
      return {
        value: item.profissao,
        label: item.profissao,
      }
    })
    
    return formatted;
  }
}
