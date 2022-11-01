export const generateKey = (pre: string | number) => {
    return `${ pre }_${ new Date().getTime() }`;
}