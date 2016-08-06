export function deprecated(methodName, alternative) {
  console.warn(`${methodName} is deprected.
    please use ${alternative} instead`);
}
