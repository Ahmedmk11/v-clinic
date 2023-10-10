export function findIntersection(array1, array2) {
    const lowercasedArray1 = array1
        .map((item) => item.toLowerCase())
        .filter((item) => item !== '')

    const lowercasedArray2 = array2.map((item) => item.toLowerCase())

    const hasSubstring1 = lowercasedArray1.some((substring) =>
        lowercasedArray2.some((item) => item && item.startsWith(substring))
    )
    const hasSubstring2 = lowercasedArray2.some((substring) =>
        lowercasedArray1.some((item) => item && item.startsWith(substring))
    )

    return hasSubstring1 || hasSubstring2
}
