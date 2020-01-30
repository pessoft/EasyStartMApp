const errMessage = 'Что-то пошло не так'

export const fetchAPI = async (query, body) => {
  const option = getFetchOption(body)
  const response = await fetch(query, option)

  if (response.ok) {
    try {
      let json = await response.json()
      if (json.Success)
        return json.Data
      else
        throw new Error(json.ErrorMessage)
    } catch {
      throw new Error(errMessage)
    }
  }

  const errMessage = await response.text()
  throw new Error(errMessage)
}

const getFetchOption = body => {
  if (body) {
    return {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  } else {
    return undefined
  }
}