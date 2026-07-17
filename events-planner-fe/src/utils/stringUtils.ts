/**
 * Conditionally joins class names together
 * @param args Any number of arguments which can be a string or object.
 * If the value associated with a given key is falsy, that key won't be included in the output
 * @returns A string of joined class names separated by a space
 */
export const className = (
  ...args: Array<string | Record<string, boolean> | undefined>
) => {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (typeof arg === "string" && arg !== "") {
      classes.push(arg);
    } else if (typeof arg === "object") {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) {
          classes.push(key);
        }
      });
    }
  });

  return classes.join(" ");
};
