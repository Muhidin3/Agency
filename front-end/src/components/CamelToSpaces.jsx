function CamelToSpaces(props) {
    const text = props.text
    return text.replace(/([a-z])([A-Z])/g, '$1 $2');
  }
export default CamelToSpaces  