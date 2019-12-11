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