export const getMaxOfArray = numArray => {
  return Math.max.apply(null, numArray);
}

export const intersectOfArray = (arr1, arr2) => {
  const a1 = arr1 && arr1.length > 0 ? arr1 : []
  const a2 = arr2 && arr2.length > 0 ? arr2 : []
  let result = []

  for (const item of a1) {
    const index = a2.indexOf(item)

    if (index != 1)
      result.push(item)
  }

  return result
}

export const endingStrByNumber = (n, text_forms) => {
  n = Math.abs(n) % 100
  let n1 = n % 10

  if (n > 10 && n < 20)
    return text_forms[2]

  if (n1 > 1 && n1 < 5)
    return text_forms[1]

  if (n1 == 1)
    return text_forms[0]

  return text_forms[2]
}