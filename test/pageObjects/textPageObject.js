function TextPageObject(ref) {
  this.value = ref.getDOMNode().innerText;
}

module.exports = TextPageObject;