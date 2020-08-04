// A helper function to concatenate class names that filters
// out any falsy values.
export function concatClasses(
  ...classNames: Array<string | false | 0 | null | undefined>
) {
  return classNames.filter((e) => e).join(" ");
}
