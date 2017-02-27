export function deprecatedSelector(oldSelector, newSelector, element) {
  if (element.nativeElement.tagName && element.nativeElement.tagName.toLowerCase() === oldSelector.toLowerCase()) {
    console.warn(`If you are using the capitalized \'${oldSelector}\' selector please move to the 
      kebab-case \'${newSelector}\' selector, as the capitalized will be soon deprecated`);
  }
}
