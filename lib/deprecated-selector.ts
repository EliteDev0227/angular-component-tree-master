export function deprecatedSelector(deprecatedSelector, newSelector) {
  console.warn(`If you are using the ${deprecatedSelector} selector please move to the 
    kebab-case ${newSelector} selector, as the UpperCase will be soon deprecated`);
}
